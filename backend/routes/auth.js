

import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register", async (req, res, next) => {
  try {
    console.log("===== REGISTER API CALLED =====");
    console.log("Incoming Register Request:", req.body);

    const { name, email, password } = req.body;

    // Step 1: check fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Step 2: check existing user
    const existingUser = await User.findOne({ email });
    console.log("Existing User result:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Step 3: create user
    console.log("STEP 3: Creating new user...");
    const user = new User({
      name,
      email,
      password,  // will be hashed by model
      role: "admin"
    });

    console.log("User before save:", user);

    await user.save(); // 🔥 Now this will not break
    console.log("User saved successfully!");

    res.status(201).json({
      message: "Admin registered successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    next(error); // ✔ now next() works
  }
});




// ADMIN LOGIN
router.post("/login", async (req, res) => {
  try {
    
    const { email, password } = req.body;
console.log("LOGIN BODY:", req.body);

    const admin = await User.findOne({ email, role: "admin" }).select("+password");
    console.log("FOUND USER:", User);


    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
