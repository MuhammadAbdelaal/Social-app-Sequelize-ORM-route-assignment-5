const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./common/db/connection");
require("./common/db/associations");

// app.get("/", async (req, res) => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//     res.send("Hello World!");
//   } catch (err) {
//     console.error("Unable to connect to the database:", err);
//   }
// });

async function startServer() {
  await sequelize.sync(); // sync the database first, then start the server
  // sequelize.sync({ alter: true });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
