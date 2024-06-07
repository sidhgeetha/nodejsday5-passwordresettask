import express from "express";
import {
  loginUser,
  registerUser,
  getUser,
  resetPassword,
  setNewPassword,
} from "../Controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.get("/getuser", authMiddleware, getUser);
router.post("/setnew-password", setNewPassword);

export default router;
