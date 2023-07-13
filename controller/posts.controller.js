const PostService = require('../service/posts.service');

class PostController {
  postService = new PostService();

  findAllPost = async (req, res) => {
    try {
      const posts = await this.postService.findAllPost();
      return res.status(200).json({ posts });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '게시글 조회에 실패하였습니다.' });
    }
  };

  findOnePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findOnePost(postId);

      if (!post) return res.status(404).send({ message: '게시글이 존재하지 않습니다.' });

      return res.status(200).json({ post });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '게시글 조회에 실패하였습니다.' });
    }
  };

  createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const { userId, nickname } = res.locals.user;
      const createPost = await this.postService.createPost({ userId, title, content, nickname });
      return res.status(200).json({ createPost });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '게시글 작성에 실패하였습니다.' });
    }
  };

  updatePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;

      const post = await this.postService.findOnePost(postId);
      if (!post) return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
      if (userId !== post.userId) return res.status(412).json({ message: '게시글 수정 권한이 없습니다.' });

      await this.postService.updatePost({ userId, postId, title, content });
      return res.status(200).json({ message: '게시글이 수정되었습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '게시글 수정에 실패하였습니다.' });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const post = await this.postService.findOnePost(postId);

      if (!post) return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
      if (userId !== post.userId) return res.status(412).json({ message: '게시글 삭제 권한이 없습니다.' });

      await this.postService.deletePost({ postId, userId });
      return res.status(200).json({ message: '게시글이 삭제되었습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '게시글 수정에 실패하였습니다.' });
    }
  };
}

module.exports = PostController;
