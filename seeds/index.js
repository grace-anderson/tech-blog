const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    // Load user data for testing
    await seedUsers();

    // Load blog post data for testing
    await seedPosts();

    // Load blog past data for testing
    await seedComments();

    process.exit(0);
};

seedAll();