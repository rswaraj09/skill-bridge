import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    console.log("Testing with tngtech/deepseek-r1t2-chimera:free...");
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'tngtech/deepseek-r1t2-chimera:free',
                messages: [{ role: 'user', content: 'hello' }]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Success:', response.data.choices[0].message.content);
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
    }

    console.log("\\nTesting with google/gemini-2.0-flash-lite-preview-02-05:free...");
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
                messages: [{ role: 'user', content: 'hello' }]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Success:', response.data.choices[0].message.content);
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
    }
}
test();
