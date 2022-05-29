const { User } = require('../models');

const userData = [
  {
    username: 'user1',
    password: 'password12345',
  },
  {
    username: 'user2',
    password: 'password23456',
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
