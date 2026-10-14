const { DataTypes, Model } = require("sequelize");
const sequelize = require("../common/db/connection");

// defining the post model with "init" method
class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "post",
    tableName: "posts",
    timestamps: true,
    paranoid: true,
  },
);

module.exports = Post;
