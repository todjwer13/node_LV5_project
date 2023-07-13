const { Comments } = require('../models');
const { Op } = require('sequelize');

class CommentRepository {
  createComment = async (data) => {
    return await Comments.create(data);
  };

  findAllComment = async (postId) => {
    return await Comments.findAll({ where: { postId } });
  };

  findOneComment = async (commentId) => {
    return await Comments.findByPk(commentId);
  };

  updateComment = async (data, target) => {
    return await Comments.update(data, { where: { [Op.and]: target } });
  };

  deleteComment = async (target) => {
    return await Comments.destroy({ where: { [Op.and]: target } });
  };
}

module.exports = CommentRepository;
