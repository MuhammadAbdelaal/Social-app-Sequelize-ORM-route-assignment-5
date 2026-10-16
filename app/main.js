const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./common/db/connection");
require("./common/db/associations");
const userRouter = require("./users/user.route");

app.use(express.json()); // parse JSON request body

// users routes
app.use("/users", userRouter);
// post routes

async function startServer() {
  await sequelize.sync(); // sync the database first, then start the server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
