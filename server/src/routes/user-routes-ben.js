import express from "express";
import {
  register_controller,
  login_controller,
} from "../controllers/user-controllers-ben.js";

const router = express.Router();

// route register
router.post("/register", register_controller);

// route login
router.post("/login", login_controller);

export default router;
