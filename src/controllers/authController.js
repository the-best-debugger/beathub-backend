import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: { message: 'Please provide username, email and password' } });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'Email already registered' } });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Registration failed' } });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: { message: 'Please provide email and password' } });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: { message: 'Invalid email or password' } });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: { message: 'Invalid email or password' } });
    }

    const payload = { id: user._id, username: user.username, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Login failed' } });
  }
};
