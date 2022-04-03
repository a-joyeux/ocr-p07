import axiosInstance from '../services/axios';

const getAllPost = () => {
  return axiosInstance.get('/api/post');
};

const createPost = (title, content) => {
  return axiosInstance.post('/api/post', { title, content });
};

const PostService = {
  getAllPost,
  createPost,
};
export default PostService;
