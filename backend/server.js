import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import propertyRoutes from "./routes/property.js"
import authRoutes from "./routes/auth.js"

dotenv.config()

const app = express()

// Middleware
const allowedOrigins = [
  "https://investoxpert.netlify.app/", 
  "https://investoxpertadmin.netlify.app/"   
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ limit: "50mb", extended: true }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/investoxpert")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/properties", propertyRoutes)
app.use("/api/auth", authRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
