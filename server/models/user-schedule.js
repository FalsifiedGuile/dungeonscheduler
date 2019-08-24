import eventCalendar from './event-schedule';

const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userScheduleSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  timesAvalible: { type: [eventCalendar] },
  public: { type: Boolean, default: false }
});

userScheduleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserSchedule', userScheduleSchema);
