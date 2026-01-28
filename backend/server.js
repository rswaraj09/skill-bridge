import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resumes.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import templateRoutes from './routes/templates.js';
import chatRoutes from './routes/chat.js';
import interviewRoutes from './routes/interview.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

import passport from './config/passport.js'; // Import passport config

import protect from './middleware/auth.js';

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(passport.initialize()); // Initialize Passport

// Increase body parser limits to handle large resumes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes); // Public routes (Login, Signup)
app.use('/api/resumes', protect, resumeRoutes); // Protected routes
app.use('/api/jobs', protect, jobRoutes); // Protected routes
app.use('/api/applications', protect, applicationRoutes); // Protected routes
app.use('/api/templates', protect, templateRoutes); // Protected routes
app.use('/api/chat', chatRoutes); // Temporary: Public chat route for verification
app.use('/api/interview', interviewRoutes); // Protected routes

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Skill Bridge API',
    version: '1.0.0',
    database: 'MongoDB (Local)'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5001;

// Only listen if the file is run directly (not imported)
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📁 Database: MongoDB (Local - make sure MongoDB is running)`);
    console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });
}

export default app;
