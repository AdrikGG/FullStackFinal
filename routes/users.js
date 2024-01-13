const express = require('express');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const {
  loginValidator,
  registerValidator
} = require('../validators/validators');

require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
          success: false
        });
      } else {
        // check if passwords match
        bcrypt.compare(req.body.password, user.password).then((success) => {
          if (!success) {
            res.json({
              message: `Incorrect password`,
              success: false
            });
          } else {
            // store data and token in jwt (stored in browser cache)
            // jwt is used for authentication and staying logged in
            const payload = {
              id: user._id,
              username: user.username
            };
            jwt.sign(
              payload,
              process.env.APP_SECRET || 'secret',
              { expiresIn: 2160000 },
              (err, token) => {
                res.json({
                  user,
                  token: 'Bearer token: ' + token,
                  success: true
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
      createdOn: new Date()
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
          .catch((err) => {
            if (err.code === 11000 || err.name === 'MongoError') {
              // MongoDB duplicate key error, indicating username is already taken
              res.json({ message: 'Username already taken', success: false });
            } else {
              res.json({ message: err.message, success: false });
            }
          });
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
      res.status(404).json({ success: false, message: err.message });
    });
});

router.post('/upload-image', checkAuth, async (req, res) => {
  try {
    const uploaded = await cloudinary.uploader.upload(req.body.image, {
      folder: 'avatars',
      resource_type: 'auto'
    });

    const user = await Users.findOne({ _id: req.body.userID });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    user.avatar = {
      url: uploaded.url,
      publicID: uploaded.public_id
    };

    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

router.patch('/:id', checkAuth, (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  Users.findOne({ _id: req.params.id })
    .then((user) => {
      if (req.body.oldPassword) {
        bcrypt.compare(req.body.oldPassword, user.password).then((success) => {
          if (!success) {
            res.json({
              message: `Incorrect password`,
              success: false
            });
          } else {
            if (req.body.username) {
              updateOps.username = req.body.username;
            }
            if (req.body.password) {
              let updatedPassword = req.body.password;
              bcrypt.genSalt(10, (genErr, salt) => {
                bcrypt.hash(updatedPassword, salt, (hashErr, hash) => {
                  if (genErr || hashErr) {
                    res.json({
                      message: 'Error occured while hashing',
                      success: false
                    });
                    return;
                  }
                  // store hashed password
                  updatedPassword = hash;
                  updateOps.password = updatedPassword;

                  User.updateOne({ _id: id }, { $set: updateOps })
                    .exec()
                    .then((result) => {
                      res.status(200).json(result);
                    })
                    .catch((err) => {
                      console.log('err', err);
                      res
                        .status(500)
                        .json({ success: false, message: err.message });
                    });
                });
              });
            } else {
              User.updateOne({ _id: id }, { $set: updateOps })
                .exec()
                .then((result) => {
                  res.status(200).json(result);
                })
                .catch((err) => {
                  console.log('err', err);
                  res
                    .status(500)
                    .json({ success: false, message: err.message });
                });
            }
          }
        });
      } else {
        if (req.body.highscores) {
          updateOps.highscores = req.body.highscores;
        } else {
          updateOps.highscores = user.highscores;
        }

        User.updateOne({ _id: id }, { $set: updateOps })
          .exec()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            console.log('err', err);
            res.status(500).json({ success: false, message: err.message });
          });
      }
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
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
