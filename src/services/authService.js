import api from '../api/axiosConfig';
import axios from 'axios';

// Temporary hardcoded URL for testing
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

console.log('Environment:', {
  nodeEnv: process.env.NODE_ENV,
  apiUrl: process.env.REACT_APP_API_BASE_URL,
  finalUrl: API_URL
});

export const authService = {
  login: async (credentials) => {
    try {
      console.log('Attempting login with:', {
        ...credentials,
        password: '[REDACTED]'
      });
      console.log('Login API URL:', `${API_URL}/api/auth/login`);

      const response = await axios.post(`${API_URL}/api/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('Attempting registration with:', userData);
      const registerUrl = `${API_URL}/api/auth/register`;
      console.log('API URL:', registerUrl);
      
      const response = await axios.post(registerUrl, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error details:', {
        message: error.message,
        response: error.response,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  }
};

export default authService;