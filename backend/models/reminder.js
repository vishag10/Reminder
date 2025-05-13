const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reminder_method: {
    type: String,
    enum: ['email', 'sms'],
    required: true
  },
  email: { 
    type: String,
    required: function() { 
      return this.reminder_method === 'email'; 
    },
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  sent: { type: Boolean, default: false },
  scheduledAt: { type: Date }
});

// Calculate the scheduled DateTime from date and time strings
reminderSchema.pre('save', function(next) {
  if (this.date && this.time) {
    this.scheduledAt = new Date(`${this.date}T${this.time}`);
  }
  next();
});

module.exports = mongoose.model('Reminder', reminderSchema);