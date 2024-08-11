import express from "express";
import { createComment, getAllComments, getComment } from "../controller/commentController.js";

const router = express.Router();

router.post("/createComment", createComment);
router.get("/getAllComments", getAllComments);
router.get("/getComment/:id", getComment);


export default router;