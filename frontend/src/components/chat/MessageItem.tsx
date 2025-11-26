import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../hooks/useAuth";
import type { Message } from "@/types/chat";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { authUser } = useAuth();
  const isOwnMessage = authUser.user?.username === message.username;

  const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${message.username}`;

  return (
    <div
      className={`flex mb-4 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex gap-3 max-w-[70%] ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div className="shrink-0">
          <img
            src={avatarUrl}
            alt={message.username}
            className="w-10 h-10 rounded-full bg-white border-2 border-gray-200"
          />
        </div>

        {/* Message Content */}
        <div className="flex-1">
          {/* Username */}
          <p
            className={`text-xs mb-1 px-1 font-medium ${
              isOwnMessage ? "text-right text-purple-600" : "text-left text-gray-600"
            }`}
          >
            {isOwnMessage ? "You" : message.username}
          </p>

          {/* Message Bubble */}
          <div
            className={`rounded-lg px-4 py-2 ${
              isOwnMessage
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <p className="wrap-break-word">{message.message}</p>
            <p
              className={`text-xs mt-1 ${
                isOwnMessage ? "text-purple-200" : "text-gray-500"
              }`}
            >
              {formatDistanceToNow(new Date(message.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;