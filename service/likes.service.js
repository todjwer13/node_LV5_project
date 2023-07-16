const LikeRepository = require('../repository/likes.repository');
const PostRepository = require('../repository/posts.repository');

class LikeService {
  likeRepository = new LikeRepository();
  postRepository = new PostRepository();

  putLike = async ({ userId, postId }) => {
    const findPost = await this.postRepository.findOnePost(postId);
    if (!findPost) throw { code: 404, message: '게시글을 찾을 수 없습니다.' };

    const findLike = await this.likeRepository.findOne({ userId, postId });
    if (!findLike) {
      await this.likeRepository.createOne({ userId, postId });
      return { code: 200, message: '좋아요를 추가하였습니다.' };
    } else {
      await this.likeRepository.deleteOne({ userId, postId });
      return { code: 200, message: '좋아요를 삭제하였습니다.' };
    }
  };

  getLikePost = async ({ userId, postId }) => {
    const findLike = await this.likeRepository.findAllLikedPosts({ userId });
    if (!findLike) throw { code: 404, message: '좋아요한 게시글이 없습니다.' };
    return {
      code: 201,
      result: findLike
        .sort((a, b) => b.likes - a.likes)
        .map((post) => {
          return {
            postId: post.Post.postId,
            nickname: post.User.nickname,
            title: post.Post.title,
            content: post.Post.content,
            likes: post.Post.likes,
            createAt: post.Post.createAt,
            updatedAt: post.Post.updatedAt,
          };
        }),
    };
  };
}

module.exports = LikeService;
