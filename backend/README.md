# Skill Bridge Backend

Node.js + Express + MongoDB backend for the Skill Bridge resume optimization application.

## Features

- User authentication (Signup & Login)
- MongoDB database for storing user data
- JWT token-based authentication
- Password hashing with bcryptjs
- CORS enabled for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend folder:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill-bridge?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
JWT_EXPIRE=7d
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**To get MongoDB URI:**
1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string from the "Connect" button
4. Replace `username` and `password` with your credentials

### 3. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### Signup
- **POST** `/api/auth/signup`
- **Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456",
    "full_name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Project Structure

```
backend/
├── models/          # MongoDB models
│   └── User.js
├── routes/          # API routes
│   └── auth.js
├── middleware/      # Custom middleware
│   └── auth.js
├── config/          # Configuration files
│   └── db.js
├── server.js        # Main server file
├── package.json
├── .env.example
└── README.md
```

## Integration with Frontend

Update your frontend API calls to point to the backend:

```javascript
const API_URL = 'http://localhost:5000/api';

// Signup
const response = await fetch(`${API_URL}/auth/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ full_name, email, password })
});

// Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

Store the token in localStorage and include it in authenticated requests:

```javascript
const token = localStorage.getItem('token');
const response = await fetch(`${API_URL}/protected-route`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variables
- **validator**: Input validation
