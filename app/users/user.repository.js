const User = require("./user.model");

// create a new user object from User model using "build" and "save" methods
async function createUser({ name, email, password, role }) {
  const user = User.build({ name, email, password, role });
  await user.save();
  return user;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

// create or update a user using skip validation option
async function createOrUpdateUser(userData) {
  return await User.upsert(userData, { validate: false });
}

module.exports = {
  createUser,
  getUserByEmail,
  createOrUpdateUser,
};
