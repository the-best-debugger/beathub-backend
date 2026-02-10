import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6  // Hash in pre-save middleware (not shown)
  },
  likedSongs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song"
  }]
}, { timestamps: true });

userSchema.index({ username: 1 });
const User = mongoose.model("User", userSchema);
export default User;