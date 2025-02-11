

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",  
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allow specific methods
  credentials: true,  // Allow credentials (cookies, Authorization headers)
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/auth/admin", adminRoutes);


const MONGO_URI = process.env.MONGO_URI!;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(process.env.PORT, () => console.log("Server running on port 3000"));
