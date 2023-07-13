const CommentRepository = require('../repository/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  createComment = async (userId, postId, comment) => {
    const createdcomment = await this.commentRepository.createComment({ userId, postId, comment });
    return createdcomment;
  };

  findAllComment = async (postId) => {
    const allcomment = await this.commentRepository.findAllComment(postId);

    allcomment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allcomment.map((comment) => {
      return {
        commentId: comment.commentId,
        userId: comment.userId,
        postId: comment.postId,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  findOneComment = async (commentId) => {
    const findCommentData = await this.commentRepository.findOneComment(commentId);
    return findCommentData;
  };

  updateComment = async ({ postId, userId, comment, commentId }) => {
    const updateComment = await this.commentRepository.updateComment({ comment }, [{ postId }, { userId }, { commentId }]);
    return updateComment;
  };

  deleteComment = async (userId, commentId) => {
    const deletecomment = await this.commentRepository.deleteComment([{ userId }, { commentId }]);
    return deletecomment;
  };
}

module.exports = CommentService;
