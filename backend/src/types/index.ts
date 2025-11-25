import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IMessage extends Document {
  user: IUser['_id'];
  username: string;
  message: string;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username?: string;
    email?: string;
  };
}

export interface SocketUser {
  userId: string;
  username: string;
  socketId: string;
}