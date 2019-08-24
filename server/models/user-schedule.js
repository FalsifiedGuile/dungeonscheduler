const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const EventSchedule = require('./event-schedule');

const userScheduleSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  timesAvalible: { type: [EventSchedule.schema] },
  public: { type: Boolean, default: false }
});

userScheduleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserSchedule', userScheduleSchema);
