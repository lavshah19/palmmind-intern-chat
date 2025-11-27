import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const Navbar: React.FC = () => {
  const { authUser, logOut } = useAuth()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logOut()
    setIsDropdownOpen(false)
    navigate('/auth')
  }

  const avatarUrl = authUser.user?.username 
    ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${authUser.user.username}`
    : '';

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-purple-100 p-2 rounded-lg">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-gray-900 text-xl font-bold">Palmmind Chat</span>
          </div>

          {/* User Profile or Auth Button */}
          {authUser.authenticate && authUser.user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-gray-700 font-medium hidden sm:block">
                  {authUser.user.username}
                </span>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <img
                    src={avatarUrl}
                    alt={authUser.user.username}
                    className="w-full h-full object-cover bg-purple-100"
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200 shrink-0">
                      <img
                        src={avatarUrl}
                        alt={authUser.user.username}
                        className="w-full h-full object-cover bg-purple-100"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{authUser.user.username}</p>
                      <p className="text-xs text-gray-500 truncate">{authUser.user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigate('/auth')}
              className="text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer hover:bg-blue-600 hover:text-white"
              variant="outline"
            >
              Chat with us
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar