const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogPost/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,

            }
          ]
        }
      ],
    });
    

    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost);


    res.render('blogPost', {
      blogPost: blogPost, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});


router.get('/blogs/:blog_id/comments/delete/:comment_id', withAuth, async (req, res) => {

  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.comment_id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      // TODO: flash a message to the user
      res.redirect(`/blogPost/${req.params.blog_id}`)
      return;
    }

    res.redirect(`/blogPost/${req.params.blog_id}`)

  } catch (err) {
      // TODO: flash an error message to the user
    res.redirect(`/blogPost/${req.params.blog_id}`)

  }

});

//edit blog post 
router.get('/blogs/:id/edit', withAuth, async (req, res)=> {
  const blogPost = await (await BlogPost.findByPk(req.params.id)).get({plain:true})
  res.render('blogPostEdit', {
    blogPost,
    logged_in:  req.session.logged_in
  })
});

router.post('/blogs/:id/edit', withAuth, async (req, res) => {

  console.log("HEEEREEE is edited blog post", req.body);

  try {
    await BlogPost.update(req.body,
      {
      where: {
        id: req.params.id, 
      },
    });
    res.redirect('/blogPost/' + req.params.id)
  } catch (err) {
    res.status(400).json(err);
  }
})


module.exports = router;
