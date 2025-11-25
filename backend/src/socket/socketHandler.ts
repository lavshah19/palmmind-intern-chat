import { Server, Socket } from 'socket.io';
import Message from '../models/Message';
import { verifyToken } from '../utils/jwt';
import User from '../models/User';
import { SocketUser } from '../types';

const connectedUsers: Map<string, SocketUser> = new Map();

export const initializeSocket = (io: Server) => {
  io.use(async (socket: Socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.data.user = {
        id: user._id.toString(),
        username: user.username,
        email: user.email
      };

      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket: Socket) => {
    const user = socket.data.user;
    console.log(`User connected: ${user.username}`);

    // Add user to connected users
    connectedUsers.set(socket.id, {
      userId: user.id,
      username: user.username,
      socketId: socket.id
    });

    // Get stats
    const totalMessages = await Message.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeUsers = connectedUsers.size;

    // Send stats to all users
    io.emit('stats', {
      totalMessages,
      totalUsers,
      activeUsers
    });

    // Notify user joined
    socket.broadcast.emit('userJoined', {
      username: user.username,
      timestamp: new Date()
    });

    // Load recent messages
    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    socket.emit('loadMessages', recentMessages.reverse());

    // Handle new message
    socket.on('sendMessage', async (data: { message: string }) => {
      try {
        const newMessage = await Message.create({
          user: user.id,
          username: user.username,
          message: data.message
        });

        // Emit to all users
        io.emit('message', {
          _id: newMessage._id,
          user: newMessage.user,
          username: newMessage.username,
          message: newMessage.message,
          createdAt: newMessage.createdAt
        });

        // Update stats
        const totalMessages = await Message.countDocuments();
        io.emit('stats', {
          totalMessages,
          totalUsers,
          activeUsers: connectedUsers.size
        });
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing
    socket.on('typing', () => {
      socket.broadcast.emit('userTyping', { username: user.username });
    });

    socket.on('stopTyping', () => {
      socket.broadcast.emit('userStopTyping', { username: user.username });
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${user.username}`);
      connectedUsers.delete(socket.id);

      socket.broadcast.emit('userLeft', {
        username: user.username,
        timestamp: new Date()
      });

      // Update stats
      io.emit('stats', {
        totalMessages,
        totalUsers,
        activeUsers: connectedUsers.size
      });
    });
  });
};