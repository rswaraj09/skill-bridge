import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action_type: {
        type: String,
        required: true,
        enum: ['RESUME_UPLOAD', 'ATS_ANALYSIS', 'JOB_MATCH', 'RESUME_REWRITE', 'KEYWORD_EXTRACTION']
    },
    title: {
        type: String,
        required: true
    },
    details: {
        type: Object,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('History', historySchema);
