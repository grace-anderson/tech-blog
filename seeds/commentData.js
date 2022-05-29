const { Comment } = require('../models');

const commentData = [
    {
        comment: "Nice Description",
        creator_id: 2,
        blog_post_id: 1
    },
    {
        comment: "Thanks for the information",
        creator_id: 1,
        blog_post_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
