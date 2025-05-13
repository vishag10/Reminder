const express = require('express');
const router = express.Router();
const Reminder = require('./models/reminder');
const { sendReminderEmail } = require('./services/emailService');


router.post('/create', async (req, res) => {
  try {
    const { message, date, time, reminder_method, email } = req.body;
    

    if (!message || !date || !time || !reminder_method) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    
    if (reminder_method === 'email' && !email) {
      return res.status(400).json({ error: 'Email is required for email reminders' });
    }
    
    const reminderData = { message, date, time, reminder_method };
    if (email) reminderData.email = email;
    
    const newReminder = new Reminder(reminderData);
    await newReminder.save();
    
   
    scheduleReminder(newReminder);
    
    res.status(201).json({ 
      message: 'Reminder created successfully!',
      reminder: newReminder
    });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({ error: 'Failed to create reminder' });
  }
});


router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
});


function scheduleReminder(reminder) {
  const now = new Date();
  const scheduledTime = new Date(`${reminder.date}T${reminder.time}`);
  const timeUntilReminder = scheduledTime - now;
  

  if (timeUntilReminder > 0) {
    console.log(`Scheduling reminder for ${scheduledTime.toLocaleString()}`);
    
    setTimeout(async () => {
      try {
       
        if (reminder.reminder_method === 'email') {
          await sendReminderEmail(reminder.email, reminder.message);
        } else if (reminder.reminder_method === 'sms') {
         
          console.log(`SMS reminder would be sent for reminder ID: ${reminder._id}`);
        }
        
        
        await Reminder.findByIdAndUpdate(reminder._id, { sent: true });
        console.log(`Reminder ${reminder._id} sent successfully`);
      } catch (error) {
        console.error(`Failed to send reminder ${reminder._id}:`, error);
      }
    }, timeUntilReminder);
  } else {
    console.log(`Reminder scheduled time is in the past: ${scheduledTime.toLocaleString()}`);
  }
}

module.exports = router;