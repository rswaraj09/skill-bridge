import app from '../server.js';
import connectDB from '../config/db.js';

export default async function handler(req, res) {
    await connectDB();
    return app(req, res);
}
