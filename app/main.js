const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./common/db/connection");
const userRouter = require("./users/user.route");
const postRouter = require("./posts/post.route");

require("./common/db/associations"); // link models and their associations

app.use(express.json()); // parse JSON request body

// users routes
app.use("/users", userRouter);

// posts routes
app.use("/posts", postRouter);

async function startServer() {
  await sequelize.sync(); // sync the database first, then start the server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
