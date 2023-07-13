const LikeService = require('../service/likes.service');

class LikeController {
  likeService = new LikeService();

  postLike = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      await this.likeService.toggleLike(userId, postId);

      res.status(200).json({ message: '좋아요 처리가 완료되었습니다.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };

  findLikePosts = async (req, res) => {
    try {
      const { userId } = res.locals.user;

      const likePosts = await this.likeService.getLikedPosts(userId);

      res.status(200).json({ likePosts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  };
}

module.exports = LikeController;
