import express from "express";
import {AddSong, GetAllSongs, GetSongById} from "../controllers/song.js";

const router = express.Router();

// Get all songs
router.get("/", GetAllSongs);
// Get a song by ID
router.get("/:id", GetSongById);

export default router;