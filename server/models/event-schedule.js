const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  start: Date,
  end: Date,
  title: 'A 3 day event',
  color: String,
  actions: this.actions,
  allDay: true,
  resizable: {
    beforeStart: true,
    afterEnd: true
  },
  draggable: true,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Event-date', userSchema);
