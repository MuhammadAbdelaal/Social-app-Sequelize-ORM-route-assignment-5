const commentRepository = require("./comment.repository");

// create bulk comments
async function createBulkComments(comments) {
  return await commentRepository.createBulkComments(comments);
}

module.exports = {
  createBulkComments,
};
