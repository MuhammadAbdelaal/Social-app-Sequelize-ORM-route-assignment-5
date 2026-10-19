const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./common/db/connection");
const userRouter = require("./users/user.route");
const postRouter = require("./posts/post.route");
const commentRouter = require("./comments/comment.route");

require("./common/db/associations"); // link models and their associations

app.use(express.json()); // parse JSON request body

// users routes
app.use("/users", userRouter);

// posts routes
app.use("/posts", postRouter);

// comments routes
app.use("/comments", commentRouter);

// global error handler for all routes
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

async function startServer() {
  await sequelize.sync(); // sync the database first, then start the server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
