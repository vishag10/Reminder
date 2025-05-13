const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes and models
const reminderRoutes = require('./router');
const Reminder = require('./models/reminder');
const { sendReminderEmail } = require('./services/emailService');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/reminders', reminderRoutes);


const mongoUri = `${process.env.DB_URL}${process.env.DB_NAME}`;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
    
  
    setupReminderCron();
  })
  .catch(err => console.error(' MongoDB connection failed:', err));


function setupReminderCron() {
  cron.schedule('* * * * *', async () => {
    try {
      console.log('Checking for pending reminders...');
      const now = new Date();
      
      const pendingReminders = await Reminder.find({
        sent: false,
        scheduledAt: { $lte: now }
      });
      
      console.log(`Found ${pendingReminders.length} pending reminders`);
      
     
      for (const reminder of pendingReminders) {
        try {
          if (reminder.reminder_method === 'email') {
            await sendReminderEmail(reminder.email, reminder.message);
          } else if (reminder.reminder_method === 'sms') {
           
            console.log(`Would send SMS to user for reminder: ${reminder._id}`);
          }
          
          
          reminder.sent = true;
          await reminder.save();
          console.log(`Reminder ${reminder._id} processed successfully`);
        } catch (error) {
          console.error(`Error processing reminder ${reminder._id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error in reminder cron job:', error);
    }
  });
  
  console.log('📅 Reminder cron job scheduled');
}


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = app;