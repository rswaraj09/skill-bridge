import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Send a notification email when a user logs in
 * @param {string} to - Recipient email
 * @param {string} name - User's name
 */
export const sendLoginEmail = async (to, name) => {
    try {
        const mailOptions = {
            from: `"Skill Bridge" <${process.env.SMTP_USER}>`,
            to,
            subject: 'New Login Detected - Skill Bridge',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4a90e2;">New Login Alert</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>We detected a new login to your Skill Bridge account.</p>
          <p>If this was you, you can safely ignore this email.</p>
          <p>If you did not log in, please secure your account immediately.</p>
          <br>
          <p>Best regards,</p>
          <p>The Skill Bridge Team</p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 Login notification sent to ${to}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending login email:', error);
        return false;
    }
};
