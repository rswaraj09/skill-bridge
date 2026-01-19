import express from 'express';
import { generateQuestions, evaluateAnswer } from '../controllers/interviewController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Protected route to generate interview questions
router.post('/questions', protect, generateQuestions);
router.post('/evaluate', protect, evaluateAnswer);

export default router;
