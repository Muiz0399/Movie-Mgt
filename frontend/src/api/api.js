import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message.includes('Token expired')) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
