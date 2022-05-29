const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const isPostCreator = require('../utils/isPostCreator');

// GET the homepage
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

// Route for the user's dashboard
router.get('/dashboard', async (req, res) => {
    // Redirect to login if the user is not logged in
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

        // Convert the date to a string to display in the template
        for (var idx = 0; idx < posts.length; idx++) {
            posts[idx].dateStringForPost = posts[idx].createdAt.toLocaleDateString();
        }

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            pageDescription: 'Your Dashboard'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route for the form to create a new blog post
router.get('/new-blog-post', withAuth, async (req, res) => {
    res.render('newBlogPost', {
        pageDescription: 'Your Dashboard',
        loggedIn: req.session.loggedIn
    });
});

// Route for the form to create a new blog post
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

        // Convert each comment created date to a date string
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

// Route for editing an existing blog post
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
            pageDescription: 'Your Dashboard'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;