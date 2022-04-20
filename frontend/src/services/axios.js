const axios = require('axios');
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

module.exports = axiosInstance;
