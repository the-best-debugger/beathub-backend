import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Password is hidden by default
  },
  // --- NEW FIELD START ---
  role: {
    type: String,
    enum: ['user', 'admin'], // We restrict values to only these two
    default: 'user'          // Everyone starts as a regular user
  },
  // --- NEW FIELD END ---
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// (Keep your existing pre-save hook and comparePassword methods here)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const rounds = parseInt(process.env.SALT_ROUNDS, 10) || 12;
  this.password = await bcrypt.hash(this.password, rounds);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);