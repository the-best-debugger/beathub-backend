import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0  // Fixed validator
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  genre: {
    type: String,
    enum: ['Pop', 'Rock', 'Jazz', 'Hip-Hop'],
    default: 'Pop',
    required: true  // Added
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  }
}, { timestamps: true });

songSchema.index({ title: 1, genre: 1, artist: 1 });  // For searches
const Song = mongoose.model("Song", songSchema);
export default Song;