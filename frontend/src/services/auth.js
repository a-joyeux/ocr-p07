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

const isAdmin = () => {
  return getCurrentUser().role == 'ADMIN' ? true : false;
};

const isOwner = (author) => {
  return author == getCurrentUser().id ? true : false;
};

const AuthService = {
  register,
  login,
  logout,
  isAdmin,
  getCurrentUser,
  isOwner,
};
export default AuthService;
