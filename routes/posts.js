const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');

const PostController = require('../controller/posts.controller');
const postController = new PostController();
// 게시글 작성
router.post('/posts', authMiddleware, postController.createPost);

// 전체 게시글 조회
router.get('/posts', postController.findAllPost);

// 게시글 상세 조회
router.get('/posts/:postId', postController.findOnePost);

// // 게시글 수정
router.put('/posts/:postId', authMiddleware, postController.updatePost);

// // 게시글 삭제
router.delete('/posts/:postId', authMiddleware, postController.deletePost);

module.exports = router;
