const router = require('express').Router();
const { User } = require('../../models');

// Create a user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      // user_id saved in session, so app knows who is logged in user
      req.session.loggedInId = dbUserData.dataValues.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User log in
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect user credentials. Please try again' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect user credentials. Please try again' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.loggedInId = dbUserData.dataValues.id;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You\'re now logged in' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User log out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;