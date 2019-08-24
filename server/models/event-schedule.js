const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  start: Date,
  end: Date,
  title: String,
  color: String,
  allDay: Boolean,
  resizable: {
    beforeStart: Boolean,
    afterEnd: Boolean
  },
  draggable: Boolean,
  email: { type: String, required: Boolean, unique: Boolean }
});

module.exports = mongoose.model('EventSchedule', eventSchema);
