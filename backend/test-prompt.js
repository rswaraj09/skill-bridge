import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function test() {
    console.log("Testing generateQuestions prompt with arcee-ai/trinity-large-preview:free...");
    const domain = "AIML";
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

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'arcee-ai/trinity-large-preview:free',
                messages: messages,
                temperature: 0.7,
                max_tokens: 4000
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        let content = response.data.choices[0].message.content;
        fs.writeFileSync('raw-output.json', JSON.stringify({ raw: content }, null, 2), 'utf8');
        console.log("Saved output to raw-output.json");
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
    }
}
test();
