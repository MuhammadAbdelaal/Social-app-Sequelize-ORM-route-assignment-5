const { DataTypes, Model } = require("sequelize");
const sequelize = require("../common/db/connection");

// defining the comment model with "init" method
class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "comment",
    tableName: "comments",
    timestamps: true,
  },
);

module.exports = Comment;
