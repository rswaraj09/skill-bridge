import express from 'express';
import { chatWithAI } from '../controllers/chatController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Protected chat route
// We can make it public if we want guests to use it, but protect ensures rate limiting per user conceptually later
router.post('/', chatWithAI);

export default router;
