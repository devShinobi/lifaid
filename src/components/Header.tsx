import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { currentUser } from '../data/mockData';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results page (not implemented in this demo)
    console.log('Search for:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-t-4 border-t-orange-500 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center h-14">
        {/* Mobile menu button */}
        <button 
          className="md:hidden mr-2 text-gray-600"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-gray-800">
            stack<span className="text-orange-500">overflow</span>
          </span>
        </Link>

        {/* Nav links - hidden on mobile */}
        <nav className="hidden md:flex ml-6 space-x-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1">
            Questions
          </Link>
          <Link to="/tags" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1">
            Tags
          </Link>
          <Link to="/users/1" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1">
            Users
          </Link>
        </nav>

        {/* Search */}
        <form 
          onSubmit={handleSearch} 
          className="flex-grow mx-4 relative hidden md:block"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-1.5 pl-9 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-gray-400" />
          </div>
        </form>

        {/* User profile or login */}
        <div className="flex items-center">
          <Link to={`/users/${currentUser.id}`} className="flex items-center">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-md"
            />
          </Link>
        </div>

        {/* Ask Question button */}
        <Link
          to="/questions/ask"
          className="ml-4 hidden md:block px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors"
        >
          Ask Question
        </Link>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <form 
            onSubmit={handleSearch} 
            className="mb-4"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-9 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
            </div>
          </form>

          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Questions
            </Link>
            <Link 
              to="/tags" 
              className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tags
            </Link>
            <Link 
              to="/users/1" 
              className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Users
            </Link>
            <Link
              to="/questions/ask"
              className="bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ask Question
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;