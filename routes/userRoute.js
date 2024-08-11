import express from "express";
import { createUser, getAllUsers, updateUser, getUser, deleteUser } from "../controller/userController.js";

const router = express.Router();
router.post("/user", createUser);
router.get("/user/:id", getUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);
router.get("/getAllUsers", getAllUsers)

export default router;