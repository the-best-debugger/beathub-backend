import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'You are not logged in. Please log in to get access.' });
    }

    let decoded;
    try { decoded = jwt.verify(token, process.env.JWT_SECRET); } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
    }

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ success: false, message: 'The user belonging to this token no longer exists.' });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Authentication failed', error: error.message });
  }
};

export default authenticate;
