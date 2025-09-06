import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect, restrictTo } from "./middleware/authMiddleware.js";

const app = express();
connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/api/admin/dashboard", protect, restrictTo("admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
});

app.get("/api/user/dashboard", protect, restrictTo("user"), (req, res) => {
  res.json({ message: `Welcome User ${req.user.name}` });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
