import React, { useState } from 'react'
import { MessageCircle, Menu, X, User } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-linear-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-white text-xl font-bold">Palmmind Chat</span>
          </div>

          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-400 transition-colors">
              <User className="w-5 h-5 text-purple-800" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-md hover:bg-purple-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 bg-purple-700">
          <div className="px-3 py-2 flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-800" />
            </div>
            <span className="text-white">Profile</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar