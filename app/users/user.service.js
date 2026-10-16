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
// create or update based on PK (id) - skip validation
async function createOrUpdateUser({ id, name, email, password, role }) {
  return await userRepository.createOrUpdateUser({
    id,
    name,
    email,
    password,
    role,
  });
}

// get user by email (password excluded)
async function getUserByEmail(email) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    const error = new Error("no user found.");
    error.statusCode = 404;
    throw error;
  }
  return user;
}

// get user by PK (id) (role and password excluded)
async function getUserById(id) {
  const user = await userRepository.getUserByPk(id);
  if (!user) {
    const error = new Error("no user found.");
    error.statusCode = 404;
    throw error;
  }
  return user;
}

module.exports = {
  createUser,
  createOrUpdateUser,
  getUserByEmail,
  getUserById,
};
