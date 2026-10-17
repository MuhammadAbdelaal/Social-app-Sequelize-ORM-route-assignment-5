const Comment = require("./comment.model");

// create bulk comments
async function createBulkComments(comments) {
  return await Comment.bulkCreate(comments, { validate: true });
}

// update a comment by its id (only by its owner)
async function updateCommentById(id, content, userId) {
  return await Comment.update({ content }, { where: { id, userId } });
}

// get comment by its id
async function getCommentById(id) {
  return await Comment.findByPk(id);
}

module.exports = {
  createBulkComments,
  updateCommentById,
  getCommentById,
};
