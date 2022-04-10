import axiosInstance from '../services/axios';

const deleteComment = (id) => {
  return axiosInstance.delete('/api/comment/' + id);
};

const CommentService = {
  deleteComment,
};
export default CommentService;
