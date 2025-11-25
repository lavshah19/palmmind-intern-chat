
import { Routes, Route } from "react-router-dom"
import './App.css'
import Navbar from "./components/home/Navbar"
import Auth from "./pages/auth/Auth"
import { Toaster } from "sonner"
import RouteGard from "./components/route-gard"
import { useAuth } from "./components/hooks/useAuth"

function App() {
  const {authUser} = useAuth();


  return (
   <>
   <Navbar />
    <Routes>
      
      <Route path="/" element={
        <RouteGard authenticated={authUser.authenticate} children={<h1>Home</h1>}/>
      } />
      <Route path="/auth" element={
        <RouteGard authenticated={authUser.authenticate} children={<Auth/>}/>
      } />
    </Routes>
      <Toaster />
   </>
  )
}

export default App
