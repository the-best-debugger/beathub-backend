import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();

import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/song.js";
import analyticsRouter from "./routes/analytics.js";

const app = express();
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ success: false, message: 'Too many requests, please try again later.' });
  }
});

app.use(limiter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req, res) => res.send('BeatHub API Running 🚀'));

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/analytics', analyticsRouter);

mongoose.connect(MONGO_URI, { connectTimeoutMS: 10000 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
