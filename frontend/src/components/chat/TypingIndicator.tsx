import React from "react";

interface TypingIndicatorProps {
  typingUsers: string[];
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ typingUsers }) => {
  if (typingUsers.length === 0) return null;

  const displayText =
    typingUsers.length === 1
      ? `${typingUsers[0]} is typing...`
      : typingUsers.length === 2
      ? `${typingUsers[0]} and ${typingUsers[1]} are typing...`
      : `${typingUsers.length} people are typing...`;

  return (
    <div className="px-4 py-3 mb-2">
      <div className="items-center space-x-2 text-sm text-gray-500 italic bg-white rounded-lg px-3 py-2 inline-flex shadow-sm">
        <span>{displayText}</span>
        <span className="typing-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;