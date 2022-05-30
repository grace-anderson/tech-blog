const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const creator = require('../../utils/creator');

// Create a blog post
router.post('/new', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      creator_id: req.session.loggedInId,
    });

    if (!postData.content) {
      alert('Failed to add post. Remember to enter your comment.');
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a comment
router.post('/new-comment', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      blog_post_id: req.body.blog_post_id,
      comment: req.body.comment,
      creator_id: req.session.loggedInId,
    });

    if (!commentData.comment) {
      alert('Failed to add comment. Remember to enter your comment.');
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update post
router.put('/:id', withAuth, creator, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, creator, async (req, res) => {
  try {
    const postData = await Post.destroy({
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
