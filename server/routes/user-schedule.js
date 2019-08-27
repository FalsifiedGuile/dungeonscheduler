const express = require('express');

const UserSchedule = require('../models/user-schedule');

const router = express.Router();

router.get('/user/:email', (req, res) => {
  let fetchedUser;
  console.log(req.params);
  UserSchedule.findOne({ email: req.params.email })
    .then(schedule => {
      if (!schedule) {
        return res.status(404).json({
          message: 'No schedules for user'
        });
      }
      fetchedUser = schedule;
      return res.status(200).json(fetchedUser.timesAvalible);
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Get schedule failed',
        error: err
      });
    });
});

router.post('/add-event', (req, res) => {
  let fetchedUser;
  console.log(req.body);
  console.log(req.body.myEvent);

  UserSchedule.findOneAndUpdate(
    { email: req.body.email },
    { $push: { timesAvalible: req.body.myEvent } }
  )
    .then(schedule => {
      fetchedUser = schedule;
      return res.status(201).json({ previousSchedule: fetchedUser.timesAvalible });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({ message: 'Bad syntax on update', error: err });
    });
});

module.exports = router;
