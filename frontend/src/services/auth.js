import axiosInstance from '../services/axios';

const register = (email, password) => {
  return axiosInstance.post('/api/signup', {
    email,
    password,
  });
};
const login = (email, password) => {
  return axiosInstance
    .post('/api/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem('user');
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
