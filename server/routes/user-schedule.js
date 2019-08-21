const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.get("", (req, res, next) => {
  let fetchedUser;
  User-schedule.findOne({ email: req.body.email })
    .then(schedule => {
      if (!user) {
        return res.status(404).json({
          message: "No schedules for user"
        });
      }
      fetchedUser = user;
      res.status(200).json(fetchedUser.timesAvalible);
    }).catch(err => {
      return res.status(401).json({
        message: "Get schedule failed"
      });
    });
});

module.exports = router;
