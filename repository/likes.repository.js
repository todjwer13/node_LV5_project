const { Posts, Likes } = require('../models');
const { Op } = require('sequelize');

class LikeRepository {
  findOne = async (userId, postId) => {
    return await this.Likes.findOne({ where: { postId, userId } });
  };
  create = async (userId, postId) => {
    return await this.Likes.create({ userId, postId });
  };
  delete = async (userId, postId) => {
    return await this.Likes.destroy({ where: { postId, userId } });
  };
  findAllLikedPosts = async (userId) => {
    return await this.Likes.findAll({
      where: { userId },
      attributes: [],
      include: [
        {
          model: Posts,
          order: [['likes', 'DESC']],
          attributes: ['title', 'nickname', 'content', 'likes', 'createdAt', 'updatedAt'],
        },
      ],
    });
  };
}

module.exports = LikeRepository;
