import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockTags } from '../data/mockData';
import { Tag } from '../types';

const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'new'>('popular');

  useEffect(() => {
    let filtered = [...mockTags];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tag => 
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tag.description && tag.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Sort tags
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.count - a.count);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'new':
        // Since we don't have a 'created' date for tags, we'll just randomize for this demo
        filtered.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    
    setTags(filtered);
  }, [searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
        <Link
          to="/questions/ask"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Ask Question
        </Link>
      </div>
      
      <p className="text-gray-600">
        A tag is a keyword or label that categorizes your question with other, similar questions.
        Using the right tags makes it easier for others to find and answer your question.
      </p>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Filter by tag name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              sortBy === 'popular'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('popular')}
          >
            Popular
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              sortBy === 'name'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('name')}
          >
            Name
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              sortBy === 'new'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('new')}
          >
            New
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map(tag => (
          <div key={tag.id} className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
            <Link 
              to={`/tags/${tag.name}`}
              className="inline-block mb-2 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm rounded-md transition-colors"
            >
              {tag.name}
            </Link>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {tag.description || `Questions related to ${tag.name}`}
            </p>
            <div className="text-xs text-gray-500">
              {tag.count.toLocaleString()} {tag.count === 1 ? 'question' : 'questions'}
            </div>
          </div>
        ))}
      </div>
      
      {tags.length === 0 && (
        <div className="text-center p-8 border border-gray-200 rounded-md">
          <p className="text-gray-600">No tags found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TagsPage;