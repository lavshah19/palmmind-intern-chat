import ChatContainer from "@/components/chat/ChatContainer";
import SocketProvider from "@/context/SocketContext";

const ChatPage = () => {
  return (
    <SocketProvider>
      <ChatContainer />
    </SocketProvider>
  );
};

export default ChatPage;
