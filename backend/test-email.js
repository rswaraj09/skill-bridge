import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('--- Email Test Script ---');
console.log('Testing credentials for:', process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function test() {
    try {
        console.log('Attempting to login to SMTP...');
        await transporter.verify();
        console.log('✅ SUCCESS! Credentials are valid.');
    } catch (error) {
        console.error('❌ FAILED:');
        if (error.code === 'EAUTH') {
            console.error('The username or password was rejected.');
            console.error('Did you generate the App Password for *this specific email address*?');
        }
        console.error(error.message);
    }
}

test();
