import express from "express";
import { createPost, deletePost, getAllPosts, getPost } from "../controller/postController.js";

const router = express.Router();


router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPost/:id", getPost);
router.delete("/deletePost", deletePost)

export default router;