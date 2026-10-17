const postRepository = require("./post.repository");
const userRepository = require("../users/user.repository");

// create post based on user id
async function createPost({ title, content, userId }) {
  // check if user already exists -> by their id
  const existingUser = await userRepository.getUserById(userId);
  if (!existingUser) {
    // if not, throw error
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  const post = await postRepository.createPost({ title, content, userId });
  return post;
}

// delete post by its id (only by its owner)
async function deletePostById(id, userId) {
  // check if the post exists
  const post = await postRepository.getPostById(id);
  if (!post) {
    const error = new Error("Post not found.");
    error.statusCode = 404;
    throw error;
  }
  // check if the user is the owner of the post
  if (post.userId !== userId) {
    const error = new Error("You are not authorized to delete this post.");
    error.statusCode = 403;
    throw error;
  }
  // delete the post
  await postRepository.deletePostById(id);
}

module.exports = {
  createPost,
  deletePostById,
};
