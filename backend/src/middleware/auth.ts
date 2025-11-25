import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../models/User';
import { AuthRequest } from '../types';

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
};