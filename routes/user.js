import express from "express";
import { login, signup, userProfile } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/user/:user", userProfile);

export default router;
