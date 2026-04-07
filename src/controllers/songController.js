import mongoose from 'mongoose';
import Song from '../models/song.js';
import { encodeCursor, decodeCursor } from '../utils/cursor.js';

export async function getSongsCursor(req, res) {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const encodedCursor = req.query.cursor;

    let cursor = null;

    if (encodedCursor) {
      try {
        const decoded = decodeCursor(encodedCursor);
        cursor = mongoose.Types.ObjectId(decoded);
      } catch (e) {
        cursor = null;
      }
    }

    const query = cursor ? { _id: { $lt: cursor } } : {};

    const songs = await Song.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = songs.length > limit;

    if (hasMore) songs.pop();

    const nextCursor = hasMore && songs.length > 0
      ? encodeCursor(songs[songs.length - 1]._id.toString())
      : null;

    res.status(200).json({
      success: true,
      data: songs,
      pagination: {
        nextCursor,
        hasMore,
        limit,
        count: songs.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
}
