import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    console.log("Testing with arcee-ai/trinity-large-preview:free...");
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'arcee-ai/trinity-large-preview:free',
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
