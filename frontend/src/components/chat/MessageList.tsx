import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";
import { Loader2 } from "lucide-react";
import { useSocket } from "../hooks/useSocket";

const MessageList: React.FC = () => {
  const { messages, typingUsers, loadOlderMessages, hasMoreMessages, isLoadingOlder } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [previousScrollHeight, setPreviousScrollHeight] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Scroll to bottom on initial load and new messages
  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setIsInitialLoad(false);
    }
  }, [messages, isInitialLoad]);

  // Auto-scroll only for new messages (not when loading older also scrolls to bottom when it reach certain points)
  useEffect(() => {
    if (!isLoadingOlder && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isScrolledToBottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 100;  

      if (isScrolledToBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages.length, isLoadingOlder]);

  // Maintain scroll position when loading older messages
  useEffect(() => {
    if (isLoadingOlder && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const newScrollHeight = container.scrollHeight;
      const scrollDifference = newScrollHeight - previousScrollHeight;
      container.scrollTop += scrollDifference;
    }
  }, [messages, isLoadingOlder, previousScrollHeight]);

  // Handle scroll to load older messages
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      
      // Load older messages when scrolled to top
      if (container.scrollTop === 0 && hasMoreMessages && !isLoadingOlder) {
        setPreviousScrollHeight(container.scrollHeight);
        loadOlderMessages();
      }
    }
  };

  return (
    <div
      ref={messagesContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 bg-gray-50 "
    >
      {/* Loading indicator for older messages */}
      {isLoadingOlder && (
        <div className="flex justify-center py-4">
          <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
        </div>
      )}

      {/* No more messages indicator */}
      {!hasMoreMessages && messages.length > 0 && (
        <div className="text-center text-sm text-gray-500 py-2">
          No more messages
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} />
      ))}

      {/* Typing indicator */}
      <TypingIndicator typingUsers={typingUsers} />

      {/* Scroll to bottom ref */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;