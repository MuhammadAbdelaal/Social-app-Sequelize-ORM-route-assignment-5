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

module.exports = {
  createPost,
};
