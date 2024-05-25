import axios from 'axios';

const baseEndpoint = 'http://localhost:3001'; // Replace with your backend API URL

const axiosInstance = axios.create({
  baseURL: baseEndpoint,
});

// Add JWT access token interceptor (replace with your token storage mechanism)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
