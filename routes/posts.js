import express from "express";
import {
  getPostsHandler,
  createPostHandler,
  deletePostHandler,
  commentPostHandler,
} from "../controllers/posts.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPostsHandler);
router.post("/create-post", auth, createPostHandler);
router.post("/post/:id/commentPost", auth, commentPostHandler);
router.delete("/:id", auth, deletePostHandler);

export default router;
