import React from "react";
import { Users, MessageSquare, Wifi, WifiOff, UserCheck } from "lucide-react";
import { useSocket } from "../hooks/useSocket";

const ChatStats: React.FC = () => {
  const { stats, isConnected } = useSocket();

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-3 border flex items-center justify-center ">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          {stats && (
            <>
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">
                  {stats.activeUsers} active
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">
                  {stats.totalMessages} messages
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />{" "}
                <span className="text-sm text-gray-600">
                  {stats.totalUsers} total users
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatStats;
