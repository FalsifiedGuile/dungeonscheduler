const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailCheck = require('email-check');
const User = require('../models/user');
const UserSchedule = require('../models/user-schedule');

const router = express.Router();

router.post('/signup', (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  bcrypt.hash(req.body.password, 10).then(hash => {
    const userEmail = req.body.email;
    const user = new User({
      email: userEmail,
      password: hash
    });
    const userSchedule = new UserSchedule({
      email: userEmail
    });

    user
      .save()
      .then(result => {
        userSchedule.save();
        const token = jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { email: result.email, userEmail, userId: result._id },
          'secret_this_should_be_longer',
          {
            expiresIn: '1h'
          }
        );
        console.log(result);
        return res.status(200).json({
          email: result.email,
          token,
          expiresIn: 3600
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post('/login', (req, res) => {
  console.log('login is called');
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser.id },
        'secret_this_should_be_longer',
        {
          expiresIn: '1h'
        }
      );
      return res.status(200).json({
        email: fetchedUser.email,
        token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
