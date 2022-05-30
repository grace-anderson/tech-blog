const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const isPostCreator = require('../utils/isPostCreator');

// Display the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        }]
    });
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    for (var idx = 0; idx < posts.length; idx++) {
      posts[idx].dateStringForPost = posts[idx].createdAt.toLocaleDateString();
    }
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      pageDescription: 'The Tech Blog'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    pageDescription: 'The Tech Blog'
  });
});

// Route for signing up
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup', {
    pageDescription: 'The Tech Blog'
  });
});

// Display user's dashboard
router.get('/dashboard', async (req, res) => {
  // If user not logged in, redirect to login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  try {
    posts = [];
    if (req.session.loggedIn) {
      const postData = await Post.findAll({
        where: {
          creator_id: req.session.loggedInId
        }
      });
      posts = postData.map((post) =>
        post.get({ plain: true })
      );
    }

    // format date
    for (var idx = 0; idx < posts.length; idx++) {
      posts[idx].dateStringForPost = posts[idx].createdAt.toLocaleDateString();
    }

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      pageDescription: 'Your Tech Blog Dashboard'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to create a new blog post
router.get('/new-blog-post', withAuth, async (req, res) => {
  res.render('newBlogPost', {
    pageDescription: 'Your Tech Blog Dashboard',
    loggedIn: req.session.loggedIn
  });
});

router.get('/blog-comments/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      include: [
        {
          model: Comment,
          include: {
            model: User
          }
        },
        { model: User }
      ],
      where: {
        id: req.params.id
      }
    });
    const post = postData.get({ plain: true });
    post.dateStringForPost = post.createdAt.toLocaleDateString();

    // format date
    for (var idx = 0; idx < post.comments.length; idx++) {
      post.comments[idx].dateStringForComment = post.comments[idx].createdAt.toLocaleDateString();
    }

    res.render('blogComments', {
      post,
      loggedIn: req.session.loggedIn,
      pageDescription: 'The Tech Blog'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit post
router.get('/blog-update/:id', withAuth, isPostCreator, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      }
    });
    const post = postData.get({ plain: true });

    res.render('blogUpdate', {
      post,
      loggedIn: req.session.loggedIn,
      pageDescription: 'Your Tech Blog Dashboard'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;