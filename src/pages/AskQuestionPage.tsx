import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockTags } from '../data/mockData';
import { Tag } from '../types';

const AskQuestionPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [suggestions, setSuggestions] = useState<Tag[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    
    if (value.trim()) {
      // Filter tags that match the input
      const matches = mockTags.filter(tag => 
        tag.name.toLowerCase().includes(value.toLowerCase()) && 
        !selectedTags.some(selectedTag => selectedTag.id === tag.id)
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const addTag = (tag: Tag) => {
    if (selectedTags.length < 5 && !selectedTags.some(t => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagInput('');
    setSuggestions([]);
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally post the question to your API
    console.log({ title, content, tags: selectedTags });
    alert('Your question has been submitted!');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Ask a public question</h1>
        <p className="text-gray-600">
          Get help from thousands of developers ready to help.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h2 className="font-bold text-blue-800 mb-2">Writing a good question</h2>
        <ul className="list-disc list-inside text-sm text-blue-800">
          <li>Summarize your problem in a one-line title</li>
          <li>Describe your problem in more detail</li>
          <li>Describe what you've tried</li>
          <li>Add "tags" which help surface your question to members of the community</li>
          <li>Review your question and post it</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <label htmlFor="title" className="block font-medium text-gray-700 mb-2">
            Title
          </label>
          <p className="text-sm text-gray-600 mb-2">
            Be specific and imagine you're asking a question to another person.
          </p>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="e.g. How to handle async/await in React useEffect?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="border-b border-gray-200 p-6">
          <label htmlFor="content" className="block font-medium text-gray-700 mb-2">
            Body
          </label>
          <p className="text-sm text-gray-600 mb-2">
            Include all the information someone would need to answer your question. Markdown is supported.
          </p>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Explain your question in detail..."
            required
          ></textarea>
        </div>

        <div className="p-6">
          <label htmlFor="tags" className="block font-medium text-gray-700 mb-2">
            Tags
          </label>
          <p className="text-sm text-gray-600 mb-2">
            Add up to 5 tags to describe what your question is about.
          </p>
          <div className="relative">
            <div className="flex flex-wrap items-center p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              {selectedTags.map(tag => (
                <div 
                  key={tag.id} 
                  className="flex items-center bg-blue-100 text-blue-800 rounded-md px-2 py-1 m-1"
                >
                  {tag.name}
                  <button 
                    type="button" 
                    className="ml-1 text-blue-500 hover:text-blue-700"
                    onClick={() => removeTag(tag.id)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                className={`flex-grow min-w-[100px] p-1 focus:outline-none ${selectedTags.length > 0 ? 'ml-1' : ''}`}
                placeholder={selectedTags.length > 0 ? '' : 'e.g. javascript, react, node.js'}
                disabled={selectedTags.length >= 5}
              />
            </div>
            
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {suggestions.map(tag => (
                  <div 
                    key={tag.id} 
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => addTag(tag)}
                  >
                    <div className="font-medium">{tag.name}</div>
                    <div className="text-xs text-gray-500">{tag.count.toLocaleString()} questions</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Discard
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            disabled={!title || !content || selectedTags.length === 0}
          >
            Post your question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestionPage;