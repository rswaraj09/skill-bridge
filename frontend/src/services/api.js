import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production' || window.location.hostname.includes('vercel.app');
const BACKEND_URL = isProduction ? '' : (process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001');
export const API_URL = `${BACKEND_URL}/api`;
export const API = API_URL;

export const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated: () => !!localStorage.getItem('token'),
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
};

export const resumeService = {
  analyze: (content) => {
    return api.post('/resumes/analyze', { resume_content: content });
  },
  analyzeFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/resumes/analyze-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  matchJob: (resumeContent, jobDescription) => {
    return api.post('/resumes/match-job', {
      resume_content: resumeContent,
      job_description: jobDescription
    });
  },
  matchJobFile: (file, jobDescription) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);
    return api.post('/resumes/match-job-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  rewrite: (content, tone = 'professional', jobDescription = '') =>
    api.post('/resumes/rewrite', { resume_content: content, tone, job_description: jobDescription }),
  create: (data) => api.post('/resumes', data),
  getAll: () => api.get('/resumes'),
  getOne: (id) => api.get(`/resumes/${id}`),
  delete: (id) => api.delete(`/resumes/${id}`),
  extractKeywords: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/resumes/extract-keywords', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  extractKeywordsText: (content) => {
    return api.post('/resumes/extract-keywords-text', { resume_content: content });
  },
  getMyResume: () => api.get('/resumes/me'),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};

export const jobService = {
  getAll: (category = null) => api.get('/jobs', { params: { category } }),
  getOne: (id) => api.get(`/jobs/${id}`),
};

export const applicationService = {
  create: (data) => api.post('/applications', data),
  getAll: () => api.get('/applications'),
};

// History Service
export const historyService = {
  getAll: () => api.get('/history'),
};

export const templateService = {
  getAll: () => api.get('/templates'),
};

export const interviewService = {
  generateQuestions: (domain) => api.post('/interview/questions', { domain }),
  evaluateAnswer: (data) => api.post('/interview/evaluate', data),
};