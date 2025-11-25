import mongoose, { Schema } from 'mongoose';
import { IMessage } from '../types';

const MessageSchema = new Schema<IMessage>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
MessageSchema.index({ createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);