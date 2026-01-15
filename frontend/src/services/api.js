import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

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
    const formData = new FormData();
    formData.append('resume_content', content);
    return api.post('/resumes/analyze', formData);
  },
  matchJob: (resumeContent, jobDescription) => {
    const formData = new FormData();
    formData.append('resume_content', resumeContent);
    formData.append('job_description', jobDescription);
    return api.post('/resumes/match-job', formData);
  },
  rewrite: (content, tone = 'professional') =>
    api.post('/resumes/rewrite', { resume_content: content, tone }),
  create: (data) => api.post('/resumes', data),
  getAll: () => api.get('/resumes'),
  getOne: (id) => api.get(`/resumes/${id}`),
  delete: (id) => api.delete(`/resumes/${id}`),
};

export const jobService = {
  getAll: (category = null) => api.get('/jobs', { params: { category } }),
  getOne: (id) => api.get(`/jobs/${id}`),
};

export const applicationService = {
  create: (data) => api.post('/applications', data),
  getAll: () => api.get('/applications'),
};

export const templateService = {
  getAll: () => api.get('/templates'),
};