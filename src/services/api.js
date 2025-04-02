import axios from 'axios';

// Base API URL - would normally be set via environment variables
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Unauthorized - clear token and redirect to login
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      // Server error
      if (error.response.status >= 500) {
        console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;