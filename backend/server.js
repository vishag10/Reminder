const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const reminderRoutes = require('./router.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/reminders', reminderRoutes);


const mongoUri = `${process.env.DB_URL}${process.env.DB_NAME}`;


mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
