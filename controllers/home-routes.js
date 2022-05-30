const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const creator = require('../utils/creator');

// Display homepage
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

    for (let i = 0; i < posts.length; i++) {
      posts[i].postDate = posts[i].createdAt.toLocaleDateString();
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
    for (let i = 0; i < posts.length; i++) {
      posts[i].postDate = posts[i].createdAt.toLocaleDateString();
    }

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      pageDescription: 'Tech Blog Dashboard'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to create a new blog post
router.get('/new-blog-post', withAuth, async (req, res) => {
  res.render('createPost', {
    pageDescription: 'Tech Blog Dashboard',
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
    post.postDate = post.createdAt.toLocaleDateString();

    // format date
    for (let i = 0; i < post.comments.length; i++) {
      post.comments[i].commentDate = post.comments[i].createdAt.toLocaleDateString();
    }

    res.render('commentPost', {
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
router.get('/blog-update/:id', withAuth, creator, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      }
    });
    const post = postData.get({ plain: true });

    res.render('updatePost', {
      post,
      loggedIn: req.session.loggedIn,
      pageDescription: 'Tech Blog Dashboard'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;