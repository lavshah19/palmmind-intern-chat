
import { Routes, Route } from "react-router-dom"
import './App.css'
import Navbar from "./components/home/Navbar"
import Auth from "./pages/auth/Auth"
import { Toaster } from "sonner"
import RouteGard from "./components/route-gard"
import { useAuth } from "./components/hooks/useAuth"
import ChatPage from "./pages/chat/ChatPage"

function App() {
  const {authUser} = useAuth();


  return (
   <>
   <Navbar />
    <Routes>
      
      <Route path="/" element={
       <h1>Home</h1>
      } />
      <Route path="/auth" element={
        <RouteGard authenticated={authUser.authenticate} children={<Auth/>}/>
      } />
   
      <Route path="/chat" element={
        <RouteGard authenticated={authUser.authenticate} children={<ChatPage/>}/>
      } />
    </Routes>

      <Toaster />
   </>
  )
}

export default App
