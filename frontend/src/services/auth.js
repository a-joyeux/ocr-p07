import axiosInstance from '../services/axios';

const register = (firstName, lastName, email, password) => {
  return axiosInstance.post('/api/signup', {
    firstName,
    lastName,
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
    })
    .catch((err) => {
      throw err.response.data.message;
    });
};
const logout = () => {
  localStorage.removeItem('user');
};

const deleteUser = (id) => {
  return axiosInstance.delete('/api/user/' + id).then((response) => {
    return response.data;
  });
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
  deleteUser,
};
export default AuthService;
