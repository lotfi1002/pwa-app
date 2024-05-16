import axios from 'axios';
import { BASE_URL } from './Params';

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  export default api ;
