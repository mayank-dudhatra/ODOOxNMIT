import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  userId: { type: String, required: true },
  user: {
    id: String,
    name: String,
    avatar: String,
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  replyTo: { type: String, default: null },
});

export default mongoose.model("Message", messageSchema);
