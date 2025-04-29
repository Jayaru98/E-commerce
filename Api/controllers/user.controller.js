const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../utlis/hash.util");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    //password hashing
    if (!req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    //here
    req.body.password = await hashPassword(req.body.password);

    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      message: "user created successfully",
      savedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
