import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Question, User } from '../types';
import { mockUsers } from '../data/mockData';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  // Find the user who asked the question
  const user = mockUsers.find(u => u.id === question.userId) as User;

  return (
    <div className="border-b border-gray-200 pb-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row">
        {/* Stats */}
        <div className="flex md:flex-col md:w-24 md:mr-4 mb-2 md:mb-0 space-x-4 md:space-x-0 md:space-y-2 text-center text-sm text-gray-600">
          <div className="flex-1">
            <div className="font-medium">{question.upvotes - question.downvotes}</div>
            <div className="text-xs">votes</div>
          </div>
          <div className={`flex-1 ${question.answerCount > 0 ? 'text-green-700 border border-green-700 rounded-md' : ''}`}>
            <div className="font-medium">{question.answerCount}</div>
            <div className="text-xs">answers</div>
          </div>
          <div className="flex-1">
            <div className="font-medium">{question.viewCount}</div>
            <div className="text-xs">views</div>
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1">
          <Link to={`/questions/${question.id}`} className="text-blue-600 hover:text-blue-800 text-lg font-medium">
            {question.title}
          </Link>
          <div className="my-1 text-sm text-gray-600 line-clamp-2">
            {question.content.replace(/```[^`]*```/g, '').substring(0, 200)}
            {question.content.length > 200 && '...'}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap mt-2 mb-2">
            {question.tags.map(tag => (
              <Link 
                key={tag.id} 
                to={`/tags/${tag.name}`}
                className="mr-2 mb-2 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs rounded-md transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          {/* User info */}
          <div className="flex justify-end items-center mt-2 text-sm">
            <div className="text-gray-600">
              asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}
            </div>
            <Link to={`/users/${user.id}`} className="flex items-center ml-2">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-8 h-8 rounded-md mr-1" 
              />
              <span className="text-blue-600 hover:text-blue-800">{user.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;