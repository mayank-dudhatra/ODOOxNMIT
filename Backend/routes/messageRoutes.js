import express from "express";
import { getMessages, addMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:projectId", getMessages);
router.post("/", addMessage);

export default router;
