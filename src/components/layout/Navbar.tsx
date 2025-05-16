import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Menu, X, User, LogOut, Trophy, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { AuthModal } from '../AuthModal';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  const navLinks = [
    { title: 'Duels', path: '/duels' },
    { title: 'Challenges', path: '/tasks' },
    { title: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <>
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and main navigation */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <Code size={28} className="text-indigo-400" />
                  <span className="text-xl font-bold">CodeBattle</span>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* User actions */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleProfileMenu}
                      className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold overflow-hidden">
                        {user?.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.username}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span>{user?.username.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <span className="ml-2 hidden lg:block">{user?.username}</span>
                    </button>
                  </div>
                  
                  {/* Profile dropdown */}
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <Link
                        to={`/profile/${user?.username}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/stats"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Trophy size={16} className="mr-2" />
                        <span>My Stats</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings size={16} className="mr-2" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In
                </Button>
              )}
              
              {/* Mobile menu button */}
              <div className="flex md:hidden ml-4">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  {isMenuOpen ? (
                    <X size={24} />
                  ) : (
                    <Menu size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};