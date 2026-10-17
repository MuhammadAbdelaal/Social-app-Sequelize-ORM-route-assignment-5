const User = require("./user.model");

// create a new user object from User model using "build" and "save" methods
async function createUser({ name, email, password, role }) {
  const user = User.build({ name, email, password, role });
  await user.save();
  return user;
}

// get user by email excluding the password attribute
async function getUserByEmail(email) {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });
}

// create or update a user using skip validation option
async function createOrUpdateUser(userData) {
  return await User.upsert(userData, { validate: false });
}

// get user by PK (id) excluding the password and role
async function getUserByPk(id) {
  return await User.findByPk(id, {
    attributes: { exclude: ["role", "password"] },
  });
}

// get user by id -> nothing excluded from the returned user data
async function getUserById(id) {
  return await User.findByPk(id);
}

module.exports = {
  createUser,
  getUserByEmail,
  createOrUpdateUser,
  getUserByPk,
  getUserById,
};
