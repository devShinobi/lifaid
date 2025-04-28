import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockQuestions } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';
import QuestionCard from '../components/QuestionCard';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'active', label: 'Active' },
  { value: 'votes', label: 'Votes' },
];

const HomePage: React.FC = () => {
  const [activeSort, setActiveSort] = useState('newest');
  const [questions, setQuestions] = useState(mockQuestions);

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    let sortedQuestions = [...mockQuestions];

    switch (value) {
      case 'newest':
        sortedQuestions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'active':
        // Sort by the most recent answer or comment
        sortedQuestions.sort((a, b) => {
          const aLastActivity = a.answers.length > 0 
            ? Math.max(...a.answers.map(ans => ans.createdAt.getTime()))
            : a.createdAt.getTime();
          const bLastActivity = b.answers.length > 0
            ? Math.max(...b.answers.map(ans => ans.createdAt.getTime()))
            : b.createdAt.getTime();
          return bLastActivity - aLastActivity;
        });
        break;
      case 'votes':
        sortedQuestions.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      default:
        break;
    }

    setQuestions(sortedQuestions);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">All Questions</h1>
        <Link
          to="/questions/ask"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Ask Question
        </Link>
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="text-lg text-gray-700">{questions.length} questions</div>
        <div className="flex space-x-1 bg-gray-100 rounded-md">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`px-3 py-1.5 text-sm rounded-md ${
                activeSort === option.value
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              } transition-colors`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;