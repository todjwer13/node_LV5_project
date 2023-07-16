const { Posts, Likes, Users } = require('../models');
const { Op, Sequelize } = require('sequelize');

class LikeRepository {
  findOne = async (target) => {
    return await Likes.findOne({ where: { [Op.and]: target } });
  };
  createOne = async (data) => {
    return await Likes.create(data);
  };
  delete = async (userId, postId) => {
    return await this.Likes.destroy({ where: { postId, userId } });
  };
  findAllLikedPosts = async (target) => {
    return await Likes.findAll({
      where: { [Op.and]: target },
      attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE PostId = Post.postId)`), 'likes']] },
      include: [{ model: Posts }, { model: Users }],
      raw: true,
      nest: true,
    });
  };
}

module.exports = LikeRepository;
