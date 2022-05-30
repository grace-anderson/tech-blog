const { User } = require('../models');

const userData = [
  {
    username: 'user1',
    email: 'user1@gmail.com',
    password: 'password12345',
  },
  {
    username: 'user2',
    email: 'user2@gmail.com',
    password: 'password23456',
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
