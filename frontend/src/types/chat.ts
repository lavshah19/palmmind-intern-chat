import type { Socket } from "socket.io-client";

export interface Message {
  _id: string;
  user: string;
  username: string;
  message: string;
  createdAt: Date;
}

export interface Stats {
  totalMessages: number;
  totalUsers: number;
  activeUsers: number;
}

export interface UserEvent {
  username: string;
  timestamp: Date;
}

export interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  messages: Message[];
  stats: Stats | null;
  typingUsers: string[];
  sendMessage: (message: string) => void;
  startTyping: () => void;
  stopTyping: () => void;
  loadOlderMessages: () => Promise<void>;
  hasMoreMessages: boolean;
  isLoadingOlder: boolean;
}