import Project from "../models/Project.js";
import User from "../models/User.js";
import crypto from "crypto";

// Generate unique passkey
const generatePasskey = () => crypto.randomBytes(8).toString("hex");

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, teamMemberEmails } = req.body;

    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find team members by email
    let teamMembers = [];
    if (teamMemberEmails && teamMemberEmails.length > 0) {
      teamMembers = await User.find({ email: { $in: teamMemberEmails } }).select("_id");
    }

    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      teamMembers: teamMembers.map((user) => user._id),
      passkey: generatePasskey(),
      createdBy: req.user._id,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Search team member by email
export const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email }).select("name email role");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
