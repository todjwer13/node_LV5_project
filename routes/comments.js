const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware.js');

const CommentController = require('../controller/comments.controller');
const commentController = new CommentController();

// 댓글 작성
router.post('/posts/:postId/comments', authMiddleware, commentController.createComment);

// 댓글 조회
router.get('/posts/:postId/comments', commentController.getComments);

// // 댓글 수정
router.put('/posts/:postId/comments/:commentId', authMiddleware, commentController.updateComment);

// // 댓글 삭제
router.delete('/posts/:postId/comments/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
