import axios from 'axios';

const API_URL = 'http://192.168.0.240:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    console.log("Token enviado:", token); 
    if (token && !config.url.includes('register')) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

