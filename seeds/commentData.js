const { Comment } = require('../models');

const commentData = [
  {
    comment: 'Thanks for sharing. Really interesting insights!',
    creator_id: 2,
    blog_post_id: 1
  },
  {
    comment: 'Maintenance is difficult during the coding phase when the project size is large.',
    creator_id: 1,
    blog_post_id: 2
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
