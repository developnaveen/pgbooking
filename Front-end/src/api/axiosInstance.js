// src/api/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // base URL for all requests
  headers: {
    'Content-Type': 'application/json', // default headers
  },
  timeout: 5000, // optional: timeout for requests
});

// Optional: intercept requests and responses for logging or error handling
axiosInstance.interceptors.request.use(
  config => {
    console.log('Starting Request', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
