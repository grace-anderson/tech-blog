const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all comment data and join with user name
    const commentData = await commentPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize comment so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newBlogPost = await BlogPost.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newBlogPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const blogPostData = await BlogPost.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!blogPostData) {
//       res.status(404).json({ message: 'No blog post found with this id!' });
//       return;
//     }

//     res.status(200).json(blogPostData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
