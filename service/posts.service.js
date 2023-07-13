const PostRepository = require('../repository/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allpost = await this.postRepository.findAllPost();

    allpost.sort((a, b) => b.createdAt - a.createdAt);

    return allpost.map((post) => {
      return {
        postId: post.postId,
        userId: post.userId,
        title: post.title,
        nickname: post.nickname,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
      };
    });
  };

  findOnePost = async (postId) => {
    const onepost = await this.postRepository.findOnePost(postId);
    return onepost;
  };

  createPost = async ({ userId, title, content, nickname }) => {
    const createpost = await this.postRepository.createPost({ userId, title, content, nickname });
    return createpost;
  };

  updatePost = async ({ postId, userId, title, content }) => {
    const updatepost = await this.postRepository.updatePost({ title, content }, [{ postId }, { userId }]);
    return updatepost;
  };

  deletePost = async ({ postId, userId }) => {
    const deletepost = await this.postRepository.deletePost([{ postId }, { userId }]);
    return deletepost;
  };
}

module.exports = PostService;
