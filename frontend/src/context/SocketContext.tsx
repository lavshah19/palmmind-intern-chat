import { createContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { io, Socket } from "socket.io-client";


import { toast } from "sonner";
import type { Message, Stats, SocketContextType } from "@/types/chat";
import { useAuth } from "@/components/hooks/useAuth";
import { getOlderMessages } from "@/service/api/chat";

export const SocketContext = createContext<SocketContextType | null>(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; 

export default function SocketProvider({ children }: { children: ReactNode }) {
  const { authUser } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  

  // Initialize socket connection
  useEffect(() => {
    if (!authUser.authenticate) return;

    const token =  JSON.parse(sessionStorage.getItem("token") as string);

    const newSocket = io(SOCKET_URL, {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    // Load initial messages
    newSocket.on("loadMessages", (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
    });

    // New message
    newSocket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Stats update
    newSocket.on("stats", (newStats: Stats) => {
      setStats(newStats);
    });

    // User joined
    newSocket.on("userJoined", (data: { username: string }) => {
      toast.success(`${data.username} joined the chat`);
    });

    // User left
    newSocket.on("userLeft", (data: { username: string }) => {
      toast.info(`${data.username} left the chat`);
    });

    // Typing indicators
    newSocket.on("userTyping", (data: { username: string }) => {
      setTypingUsers((prev) => 
        prev.includes(data.username) ? prev : [...prev, data.username]
      );
    });

    newSocket.on("userStopTyping", (data: { username: string }) => {
      setTypingUsers((prev) => prev.filter((user) => user !== data.username));
    });

    // Error handling
    newSocket.on("error", (data: { message: string }) => {
      toast.error(data.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [authUser.authenticate]);

  // Send message
  const sendMessage = useCallback(
    (message: string) => {
      if (socket && message.trim()) {
        socket.emit("sendMessage", { message: message.trim() });
      }
    },
    [socket]
  );

  // Typing indicators
  const startTyping = useCallback(() => {
    if (socket) {
      socket.emit("typing");
    }
  }, [socket]);

  const stopTyping = useCallback(() => {
    if (socket) {
      socket.emit("stopTyping");
    }
  }, [socket]);

  // Load older messages
  const loadOlderMessages = useCallback(async () => {
    if (isLoadingOlder || !hasMoreMessages || messages.length === 0) return;

    setIsLoadingOlder(true);
    try {
      const oldestMessageId = messages[0]._id;
      const data = await getOlderMessages(oldestMessageId);

      if (data.success && data.messages.length > 0) {
        setMessages((prev) => [...data.messages, ...prev]);
        if (data.messages.length < 30) {
          setHasMoreMessages(false);
        }
      } else {
        setHasMoreMessages(false);
      }
    } catch (error) {
      toast.error("Failed to load older messages");
    } finally {
      setIsLoadingOlder(false);
    }
  }, [messages, isLoadingOlder, hasMoreMessages]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        messages,
        stats,
        typingUsers,
        sendMessage,
        startTyping,
        stopTyping,
        loadOlderMessages,
        hasMoreMessages,
        isLoadingOlder,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}