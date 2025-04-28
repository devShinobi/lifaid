import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Tag, Users, Award, HelpCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: <Home size={18} />, text: 'Home' },
    { path: '/tags', icon: <Tag size={18} />, text: 'Tags' },
    { path: '/users/1', icon: <Users size={18} />, text: 'Users' },
    { path: '/questions/ask', icon: <HelpCircle size={18} />, text: 'Ask Question' },
  ];

  return (
    <aside className="hidden md:block fixed w-48 h-full bg-white border-r border-gray-200 py-6 overflow-y-auto">
      <nav className="px-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded-md text-sm ${
              isActive(item.path)
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } transition-colors`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.text}
          </Link>
        ))}
      </nav>

      <div className="mt-8 px-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
          Popular Tags
        </h3>
        <div className="space-y-1">
          <Link
            to="/tags/javascript"
            className="block text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md transition-colors"
          >
            javascript
          </Link>
          <Link
            to="/tags/python"
            className="block text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md transition-colors"
          >
            python
          </Link>
          <Link
            to="/tags/react"
            className="block text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md transition-colors"
          >
            react
          </Link>
          <Link
            to="/tags"
            className="block text-sm text-blue-500 hover:text-blue-600 px-4 py-2 transition-colors"
          >
            View all tags →
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;