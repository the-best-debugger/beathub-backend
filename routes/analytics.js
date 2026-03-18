import express from 'express';
const router = express.Router();

// Import both middlewares
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

import Song from '../models/song.js';
import Playlist from '../models/playlist.js';

import topArtistsPipeline from '../aggregations/top-artists.js';
import userActivityPipeline from '../aggregations/user-activity.js';

// Route 1: Available to ANY logged-in user (Role: user or admin)
router.get('/top-artists', authenticate, async (req, res) => {
  // ... existing code ...
  const results = await Song.aggregate(topArtistsPipeline);
  res.status(200).json({ success: true, data: results });
});

// Route 2: PROTECTED - Only 'admin' role can access this
router.get('/most-active-users', 
  authenticate,          // 1. Check if logged in
  authorize('admin'),    // 2. Check if Admin
  async (req, res) => {
    // ... existing code ...
    const results = await Playlist.aggregate(userActivityPipeline);
    res.status(200).json({ success: true, data: results });
  }
);

export default router;