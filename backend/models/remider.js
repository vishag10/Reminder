const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reminder_method: {
    type: String,
    enum: ['email', 'sms'],
    required: true
  }
});

module.exports = mongoose.model('Reminder', reminderSchema);
