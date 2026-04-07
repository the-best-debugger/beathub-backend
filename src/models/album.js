import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  releaseYear: { type: Number, required: true, min: 1900, max: new Date().getFullYear() + 1 },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
}, { timestamps: true });

albumSchema.virtual('totalDuration', {
  ref: 'Song',
  localField: 'songs',
  foreignField: '_id',
  justOne: false
});
albumSchema.set('toJSON', { virtuals: true });
albumSchema.set('toObject', { virtuals: true });

albumSchema.index({ artist: 1, releaseYear: 1 });
const Album = mongoose.models.Album || mongoose.model("Album", albumSchema);
export default Album;
