import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include admin key if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add x-admin-key header if it exists in localStorage or env
    const adminKey = localStorage.getItem('adminKey') || 'your-secret-admin-key';
    if (config.url.includes('/projects') || config.url.includes('/skills') || config.url.includes('/upload')) {
      config.headers['x-admin-key'] = adminKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Invalid admin key');
    }
    if (error.response?.status === 400) {
      console.error('Bad request - Invalid data');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
