const { User, Post } = require('../models');

// Check that the user is the creator of the post
const isPostCreator = async (req, res, next) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        { model: User }
      ],
    });
    const post = postData.get({ plain: true });

    // Make sure the logged in user was the creator of the blog post
    if (req.session.loggedInId !== post.user.id) {
      res.redirect('/');
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = isPostCreator;