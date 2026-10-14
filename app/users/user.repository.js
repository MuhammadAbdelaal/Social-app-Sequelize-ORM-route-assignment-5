const User = require("./user.model");

// create a new user object from User model using "build" and "save" methods
async function createUser({ name, email, password, role }) {
  const user = User.build({ name, email, password, role });
  await user.save();
  return user;
}

async function getUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

module.exports = {
  createUser,
  getUserByEmail,
};
