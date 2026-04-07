import express from 'express';
const router = express.Router();

import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

import Song from '../models/song.js';
import Playlist from '../models/playlist.js';

import topArtistsPipeline from '../aggregations/top-artists.js';
import userActivityPipeline from '../aggregations/user-activity.js';

router.get('/top-artists', authenticate, async (req, res) => {
  const results = await Song.aggregate(topArtistsPipeline);
  res.status(200).json({ success: true, data: results });
});

router.get('/most-active-users', 
  authenticate,
  authorize('admin'),
  async (req, res) => {
    const results = await Playlist.aggregate(userActivityPipeline);
    res.status(200).json({ success: true, data: results });
  }
);

export default router;
