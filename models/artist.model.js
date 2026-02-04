import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  genre: {
    type: String,
    enum: ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Electronic'],
    required: true
  },
  bio: {
    type: String,
    maxlength: 500
  }
}, { timestamps: true });

artistSchema.index({ name: 1, genre: 1 });
const Artist = mongoose.model('Artist', artistSchema);
export default Artist;