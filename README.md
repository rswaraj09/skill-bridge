# Skill Bridge - MERN + AI Resume Builder

## 🚀 Overview
Skill Bridge is a modern **MERN + AI** powered platform designed to optimize the job application process. By leveraging artificial intelligence, it helps users build, analyze, and refine their resumes to match industry standards and specific job descriptions.

## ✨ Features

- **AI-Powered Analysis**: Get intelligent feedback on your resume content and formatting.
- **Smart Resume Builder**: Intuitive interface to create professional, ATS-friendly resumes.
- **Skill Gap Analysis**: Identify missing skills required for your target roles.
- **Secure Authentication**: Robust user management with secure login and registration.
- **Interactive Dashboard**: Visualize your application progress and resume scores.
- **Modern UI/UX**: Responsive design with Dark Mode support, built with Tailwind CSS and Radix UI.
- **File Management**: Seamlessly upload and manage resume documents.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (v18)
- **Styling**: Tailwind CSS, PostCSS
- **Components**: Radix UI, Lucide React
- **Animations**: Framer Motion
- **State/Forms**: React Hook Form, Zod
- **Visualization**: Recharts
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), Bcryptjs
- **File Handling**: Multer
- **Validation**: Validator.js

### AI & Core
- **Integration**: Custom AI Logic for validation and scoring
- **Architecture**: RESTful API Design

## 📦 Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed or Atlas URI

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd skill-bridge
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file and add your credentials (MONGO_URI, JWT_SECRET, etc.)
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```



