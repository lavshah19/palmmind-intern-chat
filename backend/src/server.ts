import express, { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import statsRoutes from "./routes/statsRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { initializeSocket } from "./socket/socketHandler";
import messageRoutes from "./routes/messageRoutes";

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Stats endpoint
app.use("/api", statsRoutes);
app.use("/api/messages", messageRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Error handler
app.use(errorHandler);

// Initialize Socket.IO
initializeSocket(io);



// Connect to database and start server
const PORT = process.env.PORT || 5000;


connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
});
