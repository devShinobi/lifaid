import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Stack Overflow</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Questions
                </Link>
              </li>
              <li>
                <Link to="/tags" className="hover:text-white transition-colors">
                  Tags
                </Link>
              </li>
              <li>
                <Link to="/users/1" className="hover:text-white transition-colors">
                  Users
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Teams
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Advertising
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Collectives
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Talent
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Work Here
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm mb-4 md:mb-0">
            Site design / logo © 2025 Stack Exchange Inc; user contributions licensed under CC BY-SA.
          </p>
          <p className="text-sm">
            Built with React, TypeScript, and TailwindCSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;