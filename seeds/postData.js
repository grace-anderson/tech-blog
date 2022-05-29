const { Post } = require('../models');

const postData = [
    {
        title: "Javascript",
        contents: "A programming language for dynamic web content and back end servers",
        creator_id: 1
    },
    {
        title: "Express",
        contents: "A package for a node JS server",
        creator_id: 2
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
