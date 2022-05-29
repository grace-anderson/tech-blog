const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const isPostCreator = require('../../utils/isPostCreator');

// CREATE new blog post
router.post('/new', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            contents: req.body.contents,
            creator_id: req.session.loggedInId
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// CREATE new blog comment
router.post('/new-comment', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            blog_post_id: req.body.blog_post_id,
            comment: req.body.comment,
            creator_id: req.session.loggedInId
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update existing blog post
router.put('/:id', withAuth, isPostCreator, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                contents: req.body.contents,
            },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete an existing blog post
router.delete('/:id', withAuth, isPostCreator, async (req, res) => {
    try {
        const postData = await Post.destroy(
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;