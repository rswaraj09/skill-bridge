import axios from 'axios';

export const generateQuestions = async (req, res) => {
    try {
        const { domain } = req.body;

        if (!domain) {
            return res.status(400).json({ success: false, message: 'Domain is required' });
        }

        const messages = [
            {
                role: 'system',
                content: `You are an expert technical interviewer.
                
                Instructions:
                1. Generate exactly 30 interview questions for the provided domain (reduced count for better quality/complete response).
                2. Structure the output as a STRICT JSON array of objects.
                3. Each object MUST have exactly these two fields: "question" and "answer".
                4. The "answer" should be a concise, correct explanation (2-3 sentences).
                5. Do NOT include any markdown formatting (like \`\`\`json) outside the array, but if you must, wrap it in a code block.
                6. Example format: [{"question": "What is X?", "answer": "X is..."}]
                `
            },
            {
                role: 'user',
                content: `Generate 30 interview questions and answers for a ${domain}.`
            }
        ];

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'xiaomi/mimo-v2-flash:free',
                messages: messages,
                temperature: 0.7,
                max_tokens: 4000
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

        let content = response.data.choices[0].message.content;

        // Clean up markdown code blocks if present
        const codeBlockMatch = content.match(/```(?:json)?([\s\S]*?)```/);
        if (codeBlockMatch) {
            content = codeBlockMatch[1];
        }

        let questions = [];
        try {
            questions = JSON.parse(content);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.log('Raw Content:', content);
            throw new Error('Failed to parse questions from AI response');
        }

        // Validate structure
        if (!Array.isArray(questions)) {
            throw new Error('AI response is not an array');
        }

        res.status(200).json({
            success: true,
            data: questions
        });

    } catch (error) {
        console.error('Interview API Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to generate interview questions',
            error: error.message
        });
    }
};
export const evaluateAnswer = async (req, res) => {
    try {
        const { question, userAnswer, idealAnswer } = req.body;

        if (!question || !userAnswer) {
            return res.status(400).json({ success: false, message: 'Question and answer are required' });
        }

        const messages = [
            {
                role: 'system',
                content: `You are a strict technical interviewer.
                
                Instructions:
                1. Compare the User's Answer to the Ideal Answer (if provided) and the Question.
                2. Rate the User's Answer on a scale of 0-100%.
                3. Provide brief, constructive feedback on what was good and what was missing.
                4. Output STRICT JSON only.
                5. Format: { "score": number, "feedback": "string" }
                `
            },
            {
                role: 'user',
                content: `Question: ${question}
                Ideal Answer (Context): ${idealAnswer || 'N/A'}
                User Answer: ${userAnswer}
                
                Evaluate.`
            }
        ];

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'xiaomi/mimo-v2-flash:free',
                messages: messages,
                temperature: 0.3,
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

        let content = response.data.choices[0].message.content;
        // Clean up markdown code blocks if present
        const codeBlockMatch = content.match(/```(?:json)?([\s\S]*?)```/);
        if (codeBlockMatch) {
            content = codeBlockMatch[1];
        }

        const evaluation = JSON.parse(content);

        res.status(200).json({
            success: true,
            data: evaluation
        });

    } catch (error) {
        console.error('Evaluation API Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to evaluate answer',
            error: error.message
        });
    }
};
