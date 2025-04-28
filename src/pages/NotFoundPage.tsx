import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been removed, renamed, 
          or it never existed in the first place.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Go to Home Page
          </Link>
          <Link
            to="/questions/ask"
            className="block w-full px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition-colors"
          >
            Ask a Question
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;