const User = require("../../users/user.model");
const Post = require("../../posts/post.model");
const Comment = require("../../comments/comment.model");

// user => posts (one-to-many)
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

// post => comments (one-to-many)
Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId", onDelete: "CASCADE" });

// user => comments (one-to-many)
User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
