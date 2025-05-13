const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send a reminder email
 * 
 * @param {string} to - Recipient email address
 * @param {string} message - Reminder message
 * @returns {Promise} - Email send result
 */
async function sendReminderEmail(to, message) {
  try {
   
    await transporter.verify();
    
   
    const result = await transporter.sendMail({
      from: `"Magical Reminder App" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "✨ Your Magical Reminder ✨",
      text: `Hello! Here's your reminder: ${message}`,
      html: `
        <div style="font-family: 'Comic Sans MS', cursive; max-width: 600px; margin: 0 auto; padding: 20px; border: 4px solid #9333ea; border-radius: 20px; background: linear-gradient(to bottom, #e6f7ff, #cce6ff);">
          <h1 style="color: #9333ea; text-align: center;">✨ Your Magical Reminder ✨</h1>
          <div style="background-color: white; border-radius: 15px; padding: 20px; margin: 20px 0; border: 2px dashed #9333ea;">
            <p style="font-size: 18px; color: #333;">${message}</p>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #666;">From your Magical Reminder App! 🦄</p>
          </div>
        </div>
      `
    });
    
    console.log(`Email sent successfully to ${to}`);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = {
  sendReminderEmail
};