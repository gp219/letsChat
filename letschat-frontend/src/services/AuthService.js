// letschat-frontend/src/services/AuthService.js

import axios from 'axios'; // HTTP client for API calls
import axiosInstance from '../axiosInstance';

const baseEndpoint = 'http://localhost:3001'; // Replace with your backend API URL

const AuthService = {
  login: async (username, password) => {
    const response = await axios.post(`${baseEndpoint}/auth/login`, { username, password });
    console.log(response);
    localStorage.setItem('Authorization', response.data.access_token)
    return response.data;
  },
  register: async (username, password) => {
    const response = await axios.post(`${baseEndpoint}/auth/register`, { username, password });
    return response.data;
  },
  profile: async () => {
    const response = await axiosInstance.get(`${baseEndpoint}/auth/profile`);
    return response.data;
  },

  isLoggedIn: () => {
    return localStorage.getItem('Authorization') && localStorage.getItem('Authorization').length > 0 ? true : false;
  },
};

export default AuthService;
