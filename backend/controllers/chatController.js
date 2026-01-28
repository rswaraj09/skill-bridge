import axios from 'axios';

export const chatWithAI = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message is required' });
        }

        // Construct messages array from history + current message
        // History should be in format: [{ role: 'user'|'assistant', content: '...' }]
        const messages = [
            {
                role: 'system',
                content: `You are SkillBridge AI, a helpful, professional, and knowledgeable career assistant. 
        Your goal is to help users with their resume building, job search, and career development.
        
        Key traits:
        - Professional but friendly tone
        - Concise and actionable advice
        - Encouraging and supportive
        
        Context:
        The user is using SkillBridge, a platform for AI-powered resume building and job matching.
        If they ask about specific features (Resume Analysis, Job Matching, Templates), guide them to those sections.
        `
            },
            ...(history || []),
            { role: 'user', content: message }
        ];

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'tngtech/deepseek-r1t2-chimera:free',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3000',
                    'X-Title': 'Skill Bridge'
                }
            }
        );

        if (!response.data || !response.data.choices || response.data.choices.length === 0) {
            throw new Error('Invalid response from LLM API');
        }

        const reply = response.data.choices[0].message.content;

        res.status(200).json({
            success: true,
            message: reply
        });

    } catch (error) {
        console.error('Chat API Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to get response from AI',
            error: error.message
        });
    }
};
