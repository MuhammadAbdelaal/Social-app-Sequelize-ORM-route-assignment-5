const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./common/db/connection");

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    res.send("Hello World!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
