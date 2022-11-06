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
  const { errors, isValid } = loginValidator(req.body);
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        res.json({
          message: 'No account found with that email',
          success: false,
        });
      } else {
        bcrypt.compare(req.body.password, user.password).then((success) => {
          if (!success) {
            res.json({ message: 'Incorrect password', success: false });
          } else {
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
  const { errors, isValid } = registerValidator(req.body);
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    const { username, email, password } = req.body;
    const registerUser = new Users({
      username,
      email,
      password,
      createdOn: new Date(),
    });
    bcrypt.genSalt(10, (genErr, salt) => {
      bcrypt.hash(registerUser.password, salt, (hashErr, hash) => {
        if (genErr || hashErr) {
          res.json({ message: 'Error occured while hashing', success: false });
          return;
        }
        registerUser.password = hash;
        registerUser
          .save()
          .then(() => {
            res.json({ message: 'User created succefully', success: true });
          })
          .catch((err) => res.json({ message: err.message, success: false }));
      });
    });
  }
});

router.get('/:id', checkAuth, (req, res) => {
  Users.findOne({ _id: req.params.id })
    .then((user) => {
      res.json({ user, success: true });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
});

module.exports = router;
