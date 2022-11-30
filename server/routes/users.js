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
    // search database for user with entered username
    Users.findOne({ username: req.body.username }).then((user) => {
      // if no found user, throw error
      if (!user) {
        res.json({
          message: 'No account found with the username ' + req.body.username,
          success: false,
        });
      } else {
        // check if passwords match
        bcrypt.compare(req.body.password, user.password).then((success) => {
          if (!success) {
            res.json({
              message: `Incorrect password`,
              success: false,
            });
          } else {
            // store data and token in jwt (stored in browser cache)
            // jwt is used for authentication and staying logged in
            const payload = {
              id: user._id,
              username: user.username,
            };
            jwt.sign(
              payload,
              process.env.APP_SECRET || 'secret',
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
    const { username, password } = req.body;
    // create new user object with register data
    const registerUser = new Users({
      username,
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
          // catches errors with storing new user, such as username already taked
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

router.post('/upload-image', checkAuth, async (req, res) => {
  try {
    const fileStr = req.body.data;
    // const uploaded = await cloudinary.uploader.upload(fileStr);
    Users.findOne({ _id: req.body._id }).then((user) => {
      user.avatar = {
        url: uploaded.url,
        publicId: uploaded.public_id,
      };
      user.save();
      if (user.images) {
        user.images.push({
          url: uploaded.url,
          publicId: uploaded.public_id,
        });
      } else {
        user.images = [];
        user.images.push({
          url: uploaded.url,
          publicId: uploaded.public_id,
        });
      }
      res.json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: 'Something went wrong, please try again.',
    });
  }
});

router.patch('/:id', checkAuth, (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  console.log(req.body);
  if (req.body.hsq1) {
    if (!updateOps.highscores) updateOps.highscores = {};
    updateOps.highscores.quiz1 = req.body.hsq1;
  }
  if (req.body.hsq2) {
    if (!updateOps.highscores) updateOps.highscores = {};
    updateOps.highscores.quiz2 = req.body.hsq2;
  }
  if (req.body.username) {
    updateOps.username = req.body.username;
  }
  if (req.body.password) {
    let updatedPassword = req.body.password;
    console.log('about to hash');
    bcrypt.genSalt(10, (genErr, salt) => {
      bcrypt.hash(updatedPassword, salt, (hashErr, hash) => {
        if (genErr || hashErr) {
          res.json({ message: 'Error occured while hashing', success: false });
          return;
        }
        // store hashed password
        updatedPassword = hash;
        console.log('updated password: ', updatedPassword);
        updateOps.password = updatedPassword;

        console.log('updating params', updateOps);
        User.updateOne({ _id: id }, { $set: updateOps })
          .exec()
          .then((result) => {
            console.log('res', result);
            res.status(200).json(result);
          })
          .catch((err) => {
            console.log('err', err);
            res.status(500).json({ success: false, message: err.message });
          });
      });
    });
  } else {
    console.log('updating params', updateOps);
    User.updateOne({ _id: id }, { $set: updateOps })
      .exec()
      .then((result) => {
        console.log('res', result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log('err', err);
        res.status(500).json({ success: false, message: err.message });
      });
  }
});

router.delete('/:id', checkAuth, (req, res) => {
  const id = req.params.id;
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    });
});

module.exports = router;
