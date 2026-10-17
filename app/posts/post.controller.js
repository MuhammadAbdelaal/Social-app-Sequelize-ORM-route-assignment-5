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

// delete post by id (only by its owner)
async function deletePost(req, res, next) {
  const { postId } = req.params;
  const { userId } = req.body || {};

  // if userId is not provided, return error
  if (!userId) {
    return res.status(400).json({ message: "userId is required." });
  }

  try {
    // call the service to delete the post
    await postService.deletePostById(Number(postId), Number(userId));
    return res.status(200).json({ message: "Post deleted." });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = {
  createPost,
  deletePost,
};
