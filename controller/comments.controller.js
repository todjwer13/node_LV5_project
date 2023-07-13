const CommentService = require('../service/comments.service');

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      console.log(userId);
      const { postId } = req.params;
      console.log(postId);
      const { comment } = req.body;

      await this.commentService.createComment(userId, postId, comment);

      res.status(201).json({ message: '댓글이 작성되었습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '댓글 작성에 실패하였습니다.' });
    }
  };

  getComments = async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentService.findAllComment(postId);

      res.status(200).json({ comments });
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: '댓글 조회에 실패하였습니다.' });
    }
  };

  updateComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { commentId, postId } = req.params;
      const { comment } = req.body;
      const Comment = await this.commentService.findOneComment(commentId);
      if (!Comment) return res.status(404).json({ message: '댓글이 존재하지 않습니다.' });

      if (userId !== Comment.userId) return res.status(412).send({ message: '댓글 수정 권한이 없습니다.' });
      await this.commentService.updateComment({ postId, userId, commentId, comment });

      res.status(200).json({ message: '댓글이 수정되었습니다.' });
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: '댓글 수정을 실패하였습니다.' });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { userId } = res.locals.user;
      const Comment = await this.commentService.findOneComment(commentId);
      if (!Comment) return res.status(404).json({ message: '댓글이 존재하지 않습니다.' });

      if (userId !== Comment.userId) return res.status(412).send({ message: '댓글 삭제 권한이 없습니다.' });

      await this.commentService.deleteComment(userId, commentId);

      res.status(200).json({ message: '댓글이 삭제되었습니다.' });
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: '댓글 삭제를 실패하였습니다.' });
    }
  };
}

module.exports = CommentController;
