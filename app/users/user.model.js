const { DataTypes } = require("sequelize");
const sequelize = require("../common/db/connection");

// custom hook to check name length
function checkNameLength(user) {
  if (user.name.length <= 2) {
    throw new Error("Name must be at least 3 characters.");
  }
}

// defining the user model with "define" method
const User = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // built-in email validation
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // custom validation function for password
        checkPasswordLength: (password) => {
          if (password.length <= 6) {
            throw new Error("Password must be more than 6 characters.");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: checkNameLength,
    },
  },
);

module.exports = User;
