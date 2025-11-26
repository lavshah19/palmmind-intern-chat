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

  return (
    <div
      className={`flex mb-4 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] ${
          isOwnMessage ? "order-2" : "order-1"
        }`}
      >
        {!isOwnMessage && (
          <p className="text-xs text-gray-600 mb-1 px-1">{message.username}</p>
        )}
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
  );
};

export default MessageItem;