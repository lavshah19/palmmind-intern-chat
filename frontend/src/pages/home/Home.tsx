import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useAuth } from "@/components/hooks/useAuth";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const handleGetStarted = () => {
    if (authUser.authenticate) {
      navigate("/chat");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-linear-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <div className="flex justify-center mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-2xl">
            <MessageCircle className="w-20 h-20 text-purple-600" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Palmmind Chat
        </h1>

        <p className="text-xl md:text-2xl text-purple-100 mb-12">
          Connect and chat with people in real-time
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-white text-purple-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-200 shadow-xl hover:shadow-2xl"
        >
          {authUser.authenticate ? "Go to Chat" : "Get Started"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;