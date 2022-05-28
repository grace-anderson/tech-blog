const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    // console.log('req.body', req.body)
    const {post_id, comment_text} = req.body
    const user_id = req.session.user_id
    console.log('user_id, post_id, comment_text', user_id, post_id, comment_text)
    const newComment = await Comment.create({
      // ...req.body,
      user_id,
      post_id,
      comment_text,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

///edit comment
router.get('./comments/edit/:id.', withAuth, async (req, res)=> {
  const comment = await (await Comment.findByPk(req.params.id)).get({plain:true})
  res.render('commentEdit', {
    comment,
    logged_in: req.session.logged_in
  })
});

router.post('/blogs/blogPost:id/comments/:id', withAuth, async (req, res) => {

  console.log("Edited comment is HEREEEE", req.body);

  try {
    await Comment.update(req.body,
      {
      where: {
        id: req.params.id, 
      },
    });
    res.redirect('/blogPost/comments/' + req.params.id)
  } catch (err) {
    res.status(400).json(err);
  }
})
//end edit comment

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
