const { Posts } = require('../models');
const { Op } = require('sequelize');

class PostRepository {
  findAllPost = async () => {
    return await Posts.findAll();
  };

  findOnePost = async (postId) => {
    return await Posts.findByPk(postId);
  };

  createPost = async (data) => {
    return await Posts.create(data);
  };

  updatePost = async (data, target) => {
    return await Posts.update(data, { where: { [Op.and]: target } });
  };

  deletePost = async (target) => {
    return await Posts.destroy({ where: { [Op.and]: target } });
  };

  updateLikes = async (postId, likes) => {
    return await this.Posts.update({ likes }, { where: { postId } });
  };
}
module.exports = PostRepository;
