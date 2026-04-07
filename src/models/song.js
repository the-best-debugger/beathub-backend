import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  genre: { type: String, enum: ['Pop', 'Rock', 'Jazz', 'Hip-Hop'], default: 'Pop', required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true }
}, { timestamps: true });

songSchema.index({ title: 1, genre: 1, artist: 1 });
const Song = mongoose.models.Song || mongoose.model("Song", songSchema);
export default Song;
