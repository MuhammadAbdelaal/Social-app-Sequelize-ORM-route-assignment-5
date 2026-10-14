const userRepository = require("./user.repository");

async function createUser({ name, email, password, role }) {
  // check if user already exists -> by email
  const existingUser = await userRepository.getUserByEmail(email);
  // if exists, throw new error
  if (existingUser) {
    const error = new Error("Email already exists.");
    error.statusCode = 409;
    throw error;
  }
  // if not, create user and return its data
  return await userRepository.createUser({ name, email, password, role });
}

module.exports = {
  createUser,
};
