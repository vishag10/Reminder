const express = require('express');
const router = express.Router();
const Reminder = require('./models/remider');

router.post('/create', async (req, res) => {
  try {
    const { message, date, time, reminder_method } = req.body;
    const newReminder = new Reminder({ message, date, time, reminder_method });
    await newReminder.save();
    res.status(201).json({ message: 'Reminder created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reminder' });
  }
});

module.exports = router;
