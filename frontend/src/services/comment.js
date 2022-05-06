import axiosInstance from '../services/axios';

const deleteComment = (id) => {
  return axiosInstance.delete('/api/comment/' + id);
};

const addComment = (content, postId) => {
  return axiosInstance.post('/api/comment/', { content: content, postId: postId });
};

const getComment = (postId) => {
  return axiosInstance.get('/api/comment?postId=' + postId);
};

const CommentService = {
  deleteComment,
  addComment,
  getComment,
};
export default CommentService;
