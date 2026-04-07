import express from "express";
import {AddSong, GetAllSongs, GetSongById} from "../controllers/song.js";
import { getSongsCursor } from '../controllers/songController.js';

const router = express.Router();

router.get("/", GetAllSongs);
router.get('/songs', getSongsCursor);
router.get("/:id", GetSongById);

export default router;
