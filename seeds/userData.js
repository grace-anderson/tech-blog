const { User } = require('../models');

const userData = [
  {
    username: 'Rae',
    email: 'rae@gmail.com',
    password: 'password12345',
  },
  {
    username: 'Chin',
    email: 'chin@gmail.com',
    password: 'password9876',
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
