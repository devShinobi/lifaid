import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { mockUsers, mockQuestions } from '../data/mockData';
import { User, Question } from '../types';

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userQuestions, setUserQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'activity'>('profile');
  
  useEffect(() => {
    // Simulate API call to fetch user
    const foundUser = mockUsers.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      
      // Get questions by this user
      const questions = mockQuestions.filter(q => q.userId === userId);
      setUserQuestions(questions);
    }
  }, [userId]);
  
  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">User Not Found</h1>
        <p className="text-gray-600 mb-6">The user you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
          Back to Questions
        </Link>
      </div>
    );
  }
  
  // Calculate stats
  const questionCount = userQuestions.length;
  const answerCount = mockQuestions.reduce((count, question) => {
    return count + question.answers.filter(answer => answer.userId === userId).length;
  }, 0);
  
  // Calculate total votes received
  const totalVotes = userQuestions.reduce((total, question) => {
    return total + (question.upvotes - question.downvotes);
  }, 0);
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* User profile header */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-md mb-4 md:mb-0 md:mr-6"
          />
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
            <p className="text-gray-600 mb-4">Member since {format(user.joinedDate, 'MMMM d, yyyy')}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-2xl font-bold text-gray-900">{user.reputation.toLocaleString()}</div>
                <div className="text-xs text-gray-600">reputation</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-2xl font-bold text-gray-900">{questionCount}</div>
                <div className="text-xs text-gray-600">questions</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-2xl font-bold text-gray-900">{answerCount}</div>
                <div className="text-xs text-gray-600">answers</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-2xl font-bold text-gray-900">{totalVotes}</div>
                <div className="text-xs text-gray-600">votes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'profile'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'activity'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </nav>
      </div>
      
      {/* Profile content */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 mb-6">
            This is where the user's bio would go. For this demo, we haven't included detailed user bios.
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="flex items-center mb-2">
            <span className="text-gray-600 w-24">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Badges</h3>
          <p className="text-gray-600 italic">No badges yet.</p>
        </div>
      )}
      
      {/* Activity content */}
      {activeTab === 'activity' && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {userQuestions.length} {userQuestions.length === 1 ? 'Question' : 'Questions'}
          </h2>
          
          {userQuestions.length > 0 ? (
            <div className="space-y-4">
              {userQuestions.map(question => (
                <div key={question.id} className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:border-gray-300 transition-colors">
                  <Link to={`/questions/${question.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    {question.title}
                  </Link>
                  <div className="flex flex-wrap mt-2">
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
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <div className="text-gray-600">
                      {format(question.createdAt, 'MMM d, yyyy')}
                    </div>
                    <div className="space-x-4">
                      <span className="text-gray-600">{question.viewCount} views</span>
                      <span className="text-gray-600">{question.answerCount} answers</span>
                      <span className="text-gray-600">{question.upvotes - question.downvotes} votes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border border-gray-200 rounded-md">
              <p className="text-gray-600">This user hasn't asked any questions yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;