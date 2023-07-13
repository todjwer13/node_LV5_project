const LikeRepository = require('../repository/likes.repository');
const PostRepository = require('../repository/posts.repository');

class LikeService {
  likeRepository = new LikeRepository();
  postRepository = new PostRepository();

  toggleLike = async (postId, userId) => {
    const like = await this.likeRepository.findOne(userId, postId);
    const post = await this.postRepository.findOnePost(postId);

    if (like) {
      await this.likeRepository.delete(userId, postId);
      await this.postRepository.updateLikes(postId, post.likes - 1);
    } else {
      await this.likeRepository.create(userId, postId);
      await this.postRepository.updateLikes(postId, post.likes + 1);
    }
  };

  getLikedPosts = async (userId) => {
    return await this.likeRepository.findAllLikedPosts(userId);
  };
}

module.exports = LikeService;
