import User from "../Models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import resetpassword from "../Services/resetpassword.js";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    console.log("test");
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashpassword", hashPassword);

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(200).json({ message: "Register Successful", data: newUser });
    console.log("User saved successfully:", newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Register Failed , Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    resetpassword(email);

    res.status(200).json({ message: "Reset Password sent Successful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Reset Password sent Failed , Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    res.status(200).json({ message: "Login Successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "login Failed , Internal server error" });
  }
};
export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json({ message: "Authorized user", data: [user] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: " internal server server" });
  }
};
export const setNewPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
