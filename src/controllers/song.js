import mongoose from "mongoose";
import Song from "../models/song.js";
import { encodeCursor, decodeCursor } from '../utils/cursor.js';

const AddSong = async (req, res) => {
  try {
    const { title, artist, album, genre, releaseDate } = req.body;
    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      releaseDate,
    });
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(500).json({ message: "Error adding song", error });
  }
};

const GetAllSongs = async (req, res) => {
  try {
    const limitParam = req.query.limit;

    if (!limitParam) {
      const songs = await Song.find().lean();
      return res.status(200).json({ success: true, data: songs, pagination: null });
    }

    const limit = Math.min(parseInt(limitParam) || 10, 100);
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
    res.status(500).json({ message: "Error fetching songs", error });
  }
};

const GetSongById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid song ID" });
    } 
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: "Error fetching song", error });
  }
};

export { AddSong, GetAllSongs, GetSongById };
