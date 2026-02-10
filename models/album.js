import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  releaseYear: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true
  },
  songs: [{  // Added for bidirectional access
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song"
  }]
}, { timestamps: true });

// Virtual for total duration (computed on populate)
albumSchema.virtual('totalDuration', {
  ref: 'Song',
  localField: 'songs',
  foreignField: '_id',
  justOne: false
});
albumSchema.set('toJSON', { virtuals: true });
albumSchema.set('toObject', { virtuals: true });

albumSchema.index({ artist: 1, releaseYear: 1 });
const Album = mongoose.model("Album", albumSchema);
export default Album;