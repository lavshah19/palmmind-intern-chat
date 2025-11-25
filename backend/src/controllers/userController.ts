import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../types';


// this is for admin only if admin feature add in future
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};