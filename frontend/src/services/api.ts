import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('📤 Request:', config.method, config.url, config.headers); // DEBUG
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
