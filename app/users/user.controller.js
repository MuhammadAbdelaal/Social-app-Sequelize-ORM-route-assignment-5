const userService = require("./user.service");

async function createUser(req, res, next) {
  try {
    // get user data from body, make sure it has all the required fields
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    // call the service to create user
    const createdUser = await userService.createUser({
      name,
      email,
      password,
      role,
    });
    // convert userData to JSON to delete password
    const userData = createdUser.toJSON();
    delete userData.password;
    res
      .status(201)
      .json({ message: "User added successfully.", user: userData });
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

module.exports = {
  createUser,
  createOrUpdateUser,
};
