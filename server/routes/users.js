const express = require('express');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const {
  loginValidator,
  registerValidator,
} = require('../validators/validators');

const router = express.Router();

router.post('/login', (req, res) => {
  // feeds login data from req.body to the loginValidator
  const { errors, isValid } = loginValidator(req.body);
  // check loginValidator isValid variable
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    // search database for user with entered email
    Users.findOne({ email: req.body.email }).then((user) => {
      // if no found user, throw error
      if (!user) {
        res.json({
          message: 'No account found with that email',
          success: false,
        });
      } else {
        // check if passwords match
        bcrypt.compare(req.body.password, user.password).then((success) => {
          if (!success) {
            res.json({ message: 'Incorrect password', success: false });
          } else {
            // store data and token in jwt (stored in browser cache)
            // jwt is used for authentication and staying logged in
            const payload = {
              id: user._id,
              username: user.username,
            };
            jwt.sign(
              payload,
              process.env.APP_SECRET,
              { expiresIn: 2160000 },
              (err, token) => {
                res.json({
                  user,
                  token: 'Bearer token: ' + token,
                  success: true,
                });
              }
            );
          }
        });
      }
    });
  }
});

router.post('/register', (req, res) => {
  // feeds register data from req.body to the registerValidator
  const { errors, isValid } = registerValidator(req.body);
  // check registerValidator isValid variable
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    // destructure req.body
    const { username, email, password } = req.body;
    // create new user object with register data
    const registerUser = new Users({
      username,
      email,
      password,
      createdOn: new Date(),
    });
    // hash password
    bcrypt.genSalt(10, (genErr, salt) => {
      bcrypt.hash(registerUser.password, salt, (hashErr, hash) => {
        if (genErr || hashErr) {
          res.json({ message: 'Error occured while hashing', success: false });
          return;
        }
        // store hashed password
        registerUser.password = hash;
        // save new user object to database
        registerUser
          .save()
          .then(() => {
            res.json({ message: 'User created succefully', success: true });
          })
          // catches errors with storing new user, such as email or username already taked
          .catch((err) => res.json({ message: err.message, success: false }));
      });
    });
  }
});

router.get('/:id', checkAuth, (req, res) => {
  // if authorized, search database for user with given id
  Users.findOne({ _id: req.params.id })
    .then((user) => {
      res.json({ user, success: true });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
});

module.exports = router;
