import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointment.js";
import Register from "../models/registermodel.js";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// 🛡️ Helper function to verify JWT
const verifyToken = (req) => {
  const auth = req.headers["authorization"];
  if (!auth) throw new Error("No authorization header provided.");
  
  const token = auth.split(" ")[1];
  return jwt.verify(token, SECRET_KEY);
};

// 📌 REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { username, password, admin } = req.body;

    // Ensure username is unique
    const existingUser = await Register.findOne({ username: username.trim().toLowerCase() });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const register = await new Register({
      username: username.trim().toLowerCase(),
      password: hashedPassword,
      admin: admin || false, // Default admin to false if not provided
    }).save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// 📌 LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await Register.findOne({ username: username.trim().toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ error: "Invalid username or password" });

    // Create JWT with expiration time
    const payload = { name: user.username, admin: user.admin };
    const token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn: "1h" });

    res.json({ token, admin: user.admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// 📌 CREATE APPOINTMENT (Admin Only)
router.post("/", async (req, res) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded.admin) return res.status(403).json({ error: "Access denied" });

    const appointment = await new Appointment(req.body).save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// 📌 GET APPOINTMENTS (Admin & Doctors)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching appointments" });
  }
});

// 📌 UPDATE APPOINTMENT (Admin Only)
router.put("/:id", async (req, res) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded.admin) return res.status(403).json({ error: "Access denied" });

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// 📌 DELETE APPOINTMENT (Admin Only)
router.delete("/:id", async (req, res) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded.admin) return res.status(403).json({ error: "Access denied" });

    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// module.exports = router;
export default router;