const postService = require("./post.service");

// create post by user id
async function createPost(req, res, next) {
  const { title, content, userId } = req.body || {};

  // check if any of the required fields are missing
  if (!title || !content || !userId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // call the service to create post
    await postService.createPost({ title, content, userId });
    return res.status(201).json({ message: "Post created successfully." });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = {
  createPost,
};
