import { Router } from 'express';
import { protect } from '../middleware/auth';
import Message from '../models/Message';
import User from '../models/User';

const router = Router();
router.get("/stats", protect, async (req, res) => {
  try {
    const totalMessages = await Message.countDocuments();
    const totalUsers = await User.countDocuments();
    res.json({ success: true, stats: { totalMessages, totalUsers } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
})

export default router;