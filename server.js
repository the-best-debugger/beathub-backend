import express from "express";
import dotenv from "dotenv";
import songRoutes from "./routes/song.js";
import mongoose from "mongoose";
dotenv.config();

import analyticsRouter from './routes/analytics.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send('BeatHub API Running 🚀');
});

app.use("/api/songs", songRoutes);

app.use('/api/analytics', analyticsRouter);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});