import mongoose from "mongoose";
import Song from "../models/Song.js";

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
    const songs = await Song.find();
    res.status(200).json(songs);
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