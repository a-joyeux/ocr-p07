import axiosInstance from '../services/axios';

const getAllPost = () => {
  return axiosInstance.get('/api/post');
};

const createPost = (title, content) => {
  return axiosInstance.post('/api/post', { title, content });
};

const deletePost = (id) => {
  return axiosInstance.delete('/api/post/' + id);
};

const PostService = {
  getAllPost,
  createPost,
  deletePost,
};
export default PostService;
