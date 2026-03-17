import express from 'express';
const router = express.Router();

// Import the middleware
import authenticate from '../middleware/authenticate.js';

import Song from '../models/song.js';
import Playlist from '../models/playlist.js';

import topArtistsPipeline from '../aggregations/top-artists.js';
import userActivityPipeline from '../aggregations/user-activity.js';

// Apply 'authenticate' middleware before the controller logic
router.get('/top-artists', authenticate, async (req, res) => {
  try {
    const results = await Song.aggregate(topArtistsPipeline);
    res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/most-active-users', authenticate, async (req, res) => {
  try {
    const results = await Playlist.aggregate(userActivityPipeline);
    res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;