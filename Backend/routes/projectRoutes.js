import express from "express";
import { createProject, searchUserByEmail } from "../controllers/projectController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only admin can create project
// Create new project (only admin can create)
router.post("/", protect, restrictTo("admin"), createProject);

// Search user by email (admin can search team members)
router.get("/search", protect, restrictTo("admin"), searchUserByEmail);

export default router;
