const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

const LikeController = require('../controller/likes.controller');
const likeController = new LikeController();

// 게시글 좋아요 생성, 삭제
router.put('/posts/:postId/like', authMiddleware, likeController.postLike);

// 게시글 좋아요 확인
// router.get('/posts/:postId/like', authMiddleware, async (req, res) => {
//   const { postId } = req.params;
//   const likes = await Posts.findAll({ where: { postId } });
//   console.log(likes.length);
//   return res.status(200).json({ message: `좋아요 ${likes.length}` });
// });

// 좋아요 게시글 조회
router.get('/like/posts', authMiddleware, likeController.findLikePosts);

module.exports = router;
