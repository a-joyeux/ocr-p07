import axiosInstance from '../services/axios';

const getAllPost = () => {
  return axiosInstance.get('/api/post');
};

const PostService = {
  getAllPost,
};
export default PostService;
