import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import roadmapRoutes from './routes/roadmap.routes.js'
import chatRoutes from './routes/chat.routes.js'
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      /\.vercel\.app$/,
    ],
    credentials: true,
  })
)
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/roadmap', roadmapRoutes)
app.use('/api/chat', chatRoutes) 
// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Adulting OS Backend Running 🚀",
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Adulting OS API 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});