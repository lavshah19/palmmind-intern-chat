import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatStats from "./ChatStats";

const ChatContainer: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ChatStats />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;