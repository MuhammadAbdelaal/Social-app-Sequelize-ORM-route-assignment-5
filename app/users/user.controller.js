const userService = require("./user.service");

async function createUser(req, res, next) {
  try {
    // get user data from body, make sure it has all the required fields
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    // call the service to create user
    await userService.createUser({
      name,
      email,
      password,
      role,
    });
    return res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    // if error because of internal validations
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// create or update user by id, skip validation
async function createOrUpdateUser(req, res, next) {
  try {
    const id = req.params.id;
    const { name, email, password, role } = req.body;
    // call the service to create or update user
    const [, created] = await userService.createOrUpdateUser({
      id,
      name,
      email,
      password,
      role,
    });
    if (created) {
      return res.status(201).json({ message: "User created successfully." });
    }
    return res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// get user by email (password excluded)
async function getUserByEmail(req, res, next) {
  const { email } = req.query;
  if (!email) {
    // check if email is exist in query params first
    return res
      .status(400)
      .json({ message: "Email query parameter is required." });
  }
  try {
    const user = await userService.getUserByEmail(email);
    res.status(200).json({ user: user });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// get user by PK (id) (role and password excluded)
async function getUserById(req, res, next) {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  createOrUpdateUser,
  getUserByEmail,
  getUserById,
};
