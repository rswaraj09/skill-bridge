import express from 'express';
const router = express.Router();
import History from '../models/History.js';
import protect from '../middleware/auth.js';

// GET history for current user
router.get('/', protect, async (req, res) => {
    try {
        const history = await History.find({ user_id: req.userId })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50 actions

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
