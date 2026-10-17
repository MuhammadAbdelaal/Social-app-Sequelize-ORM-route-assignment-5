const Comment = require("./comment.model");

// create bulk comments
async function createBulkComments(comments) {
  return await Comment.bulkCreate(comments, { validate: true });
}

module.exports = {
  createBulkComments,
};
