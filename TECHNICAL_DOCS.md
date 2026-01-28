# Skill Bridge Technical Documentation

## 1. Project Overview
**Project Name:** Skill Bridge  
**Project Type:** Web Application (AI-Powered Career Platform)  
**Primary Use Case:** Intelligent resume optimization, job matching, and interview preparation.  
**Target Users:** Job Seekers, Professionals, and Developers.

Skill Bridge is an AI-driven platform designed to streamline the job application process. It provides users with tools to analyze their resumes against Applicant Tracking Systems (ATS), rewrite content for better impact, match their profile with job descriptions, and practice interviews with an AI coach.

---

## 2. System Architecture
The system follows a modern **Client-Server Architecture** with a decoupled frontend and backend.

```
+----------------+      +------------------+      +-------------------+
|   Frontend     |      |     Backend      |      |   External APIs   |
| (React/Vite)   +<---->+ (Node.js/Express)+<---->+ (OpenRouter/LLM)  |
+----------------+  HTTP|                  |      +-------------------+
        ^               |                  |
        |               +--------+---------+
        |                        |
        v                        v
+----------------+      +-------------------+
|  User (Browser)|      |     Database      |
+----------------+      |     (MongoDB)     |
                        +-------------------+
```

- **Client:** React.js Single Page Application (SPA).
- **Server:** RESTful API built with Node.js and Express.js.
- **Microservices:** Not applicable (Monolithic API structure).
- **Communication:** JSON over HTTP/HTTPS.

---

## 3. Tech Stack Explanation

### Frontend
- **React.js:** Chosen for component-based architecture and reactive state management.
- **TailwindCSS:** Utility-first CSS framework for rapid, responsive styling.
- **Shadcn UI / Radix UI:** Accessible, unstyled component primitives for a premium look.
- **Framer Motion:** For smooth animations and enhanced UX.
- **Axios:** For handling HTTP requests to the backend.

### Backend
- **Node.js & Express.js:** Lightweight, scalable runtime for handling API requests.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB, enforcing schema validation.
- **Passport.js:** Authentication middleware for handling Local and Google OAuth strategies.
- **Multer:** Middleware for handling `multipart/form-data` (resume file uploads).
- **Nodemailer:** For sending email notifications (e.g., login alerts).

### Database
- **MongoDB:** NoSQL database chosen for its flexibility with JSON-like documents (Resumes, User Profiles) and scalability.

### AI / LLM
- **OpenRouter API:** Unified interface to access various LLMs.
- **Model:** `xiaomi/mimo-v2-flash:free` (Chosen for speed and cost-effectiveness).

---

## 4. Application Flow

### Example: Resume Analysis Lifecycle
1. **User Action:** User navigates to the Resume Analysis page and uploads a PDF resume.
2. **Frontend:** Checks file type/size, wraps file in `FormData`, and sends `POST /api/resumes/analyze-file`.
3. **Backend (Upload):** `Multer` intercepts the request and stores the file in memory buffer.
4. **Backend (Processing):** 
   - Converts buffer to text.
   - Calculates heuristic ATS score (keywords, formatting).
   - Constructs a prompt for the LLM.
5. **LLM Interaction:** Backend sends prompt to OpenRouter; LLM returns analysis (strengths, weaknesses, score suggestions).
6. **Response:** Backend combines heuristic score and LLM insights, returning JSON to frontend.
7. **UI Update:** Frontend renders a dashboard showing the ATS score gauge and actionable feedback list.

---

## 5. Data Flow

```
Frontend Request (JSON/FormData)
       |
       v
Express Middleware (CORS, JSON Parser, Auth Check)
       |
       v
Route Handler (e.g., resumeRoutes.js)
       |
       v
Controller / Logic (Text Extraction, Validations)
       |           \
       |            -> External LLM API (OpenRouter)
       v           /
Database (MongoDB) <-> Mongoose Models
       |
       v
HTTP Response (JSON)
```

**Validation:** 
- Mongoose schemas enforce data types (e.g., required emails).
- Controller logic validates input existence (e.g., checking if `resume_content` exists).

---

## 6. Database Design

### Database: MongoDB
**Reason:** Flexible schema allows for evolving data structures (e.g., varied resume formats, dynamic interview questions).

### Core Collections (Schemas)

#### **Users** (`User.js`)
- `full_name` (String)
- `email` (String, Unique)
- `password` (String, Hashed)
- `googleId` (String, Sparse)
- `avatar` (String)

#### **Resumes** (`Resume.js`)
- `user_id` (ObjectId -> User)
- `title` (String)
- `content` (String, Text body)
- `ats_score` (Number)
- `timestamps` (createdAt, updatedAt)

#### **Jobs** (`Job.js`)
- `title`, `company`, `description`, `category`
- `requirements` (Array), `salary`

#### **Applications** (`Application.js`)
- `user_id` (ObjectId -> User)
- `job_id` (ObjectId -> Job)
- `status` (String: 'applied', 'interviewing', etc.)
- `appliedAt` (Date)

---

## 7. Backend Logic

### API Structure
- **/api/auth**: Login, Signup, Google OAuth.
- **/api/resumes**: Upload, Analyze, Rewrite, Match.
- **/api/jobs**: List, Create, Update Jobs.
- **/api/chat**: General AI Assistant interaction.
- **/api/interview**: Generate questions, Evaluate answers.

### Logic Highlights
- **Resume Extraction:** Custom logic handles PDF/DOCX to text conversion using buffers.
- **ATS Calculation:** Hybrid approach using algorithmic rules (keyword density, section headers) AND LLM evaluation for semantic analysis.

---

## 8. LLM Integration

**Provider:** OpenRouter  
**Model:** `xiaomi/mimo-v2-flash:free`

### Usage Scenarios
1. **Resume Analysis:** Analyzes text for formatting, keywords, and structure.
2. **Resume Rewriting:** Rewrites content to sound more professional and ATS-friendly using aggressive prompting techniques.
3. **Job Matching:** Compares resume vector/text against job description to generate a "Match Percentage".
4. **Interview Prep:** Generates role-specific questions and evaluates user answers in real-time.

### Fallbacks
- `try-catch` blocks wrap all LLM calls.
- If LLM fails/timeouts, the system returns substantial default data or heuristic-based results to prevent UI crash.
- Prompt injection protection via guided system prompts.

---

## 9. Security

- **Authentication:** 
  - **JWT (JSON Web Tokens):** Used for session management.
  - **Bcrypt:** Hashes passwords with salt before storage.
  - **Passport Google Strategy:** Secure OAuth2 flow.
- **Data Protection:**
  - Environment variables (`.env`) store API keys and DB URI.
  - CORS configured to allow only specific frontend origins.
- **API Security:**
  - Input validation (checking required fields).
  - File upload limits (size restricted to 5MB, specific MIME types).

---

## 10. Scalability & Performance

- **Stateless Backend:** The Node.js API is stateless, suitable for horizontal scaling (serverless functions or multiple containers).
- **Asynchronous Operations:** Heavy tasks (LLM calls) use `async/await` to prevent blocking the event loop.
- **Database:** MongoDB handles large volumes of unstructured text data efficiently.
- **Potential Bottleneck:** External LLM latency; mitigated by frontend loading states.

---

## 11. Deployment

- **Hosting:** Vercel (Optimized for Next.js/React frontend and Node.js serverless functions).
- **CI/CD:** Vercel automatically deploys from the Git repository main branch.
- **Environment config:** managed via Vercel Project Settings.

---

## 12. Error Handling & Logging

- **Strategy:** Centralized error handling in `try-catch` blocks within controllers.
- **Responses:** Standardized JSON error and success responses (`{ success: boolean, message: string, data: any }`).
- **Logging:** Console logging (stdout/stderr) for runtime debugging. Recommended to upgrade to a logger (Winston/Morgan) for production.

---

## 13. Future Improvements

- **Switch to Vector DB:** Implement RAG (Retrieval-Augmented Generation) for more accurate job matching using embeddings instead of string matching.
- **Production PDF Parser:** Replace basic text extraction with `pdf-parse` or similar library for better layout preservation.
- **User Tiers:** Add subscription limits for AI usage (Token bucket algorithm).
- **Advanced Analytics:** Dashboard for tracking analysis history and improvement over time.
