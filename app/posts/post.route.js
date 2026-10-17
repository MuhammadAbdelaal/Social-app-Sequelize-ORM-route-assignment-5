const { Router } = require("express");
const postRouter = Router();

const postController = require("./post.controller");

// create post "/posts"
postRouter.post("/", postController.createPost);

// delete post by id
postRouter.delete("/:postId", postController.deletePost);

// get all posts, including their owner (user) and their comments
postRouter.get("/details", postController.getAllPostsWithDetails);

// get all posts, and count the number of comments for each post
postRouter.get("/comments-count", postController.getAllPostsWithCommentsCount);

module.exports = postRouter;
