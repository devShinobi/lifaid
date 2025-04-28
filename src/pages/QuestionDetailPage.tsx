import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDistanceToNow } from 'date-fns';
import { mockQuestions, mockUsers } from '../data/mockData';
import { Question, User, Answer } from '../types';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';

const QuestionDetailPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundQuestion = mockQuestions.find(q => q.id === questionId);
      if (foundQuestion) {
        setQuestion(foundQuestion);
      }
      setLoading(false);
    }, 300);
  }, [questionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Question Not Found</h1>
        <p className="text-gray-600 mb-6">The question you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
          Back to Questions
        </Link>
      </div>
    );
  }

  // Find the user who asked the question
  const asker = mockUsers.find(u => u.id === question.userId) as User;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div className="space-x-4 mb-2 sm:mb-0">
            <span>Asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
            <span>Viewed {question.viewCount} times</span>
          </div>
          <Link
            to="/questions/ask"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors"
          >
            Ask Question
          </Link>
        </div>
      </div>

      {/* Question and answers container */}
      <div className="space-y-6">
        {/* Question content */}
        <div className="flex">
          {/* Voting */}
          <div className="flex flex-col items-center mr-6">
            <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
              <ChevronUp size={30} />
            </button>
            <div className="text-xl font-bold my-2">{question.upvotes - question.downvotes}</div>
            <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
              <ChevronDown size={30} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {question.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap mt-6">
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

            {/* Question metadata */}
            <div className="flex justify-end mt-6">
              <div className="bg-blue-50 rounded-md p-3 max-w-xs">
                <div className="text-xs text-gray-500">
                  asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}
                </div>
                <div className="flex items-center mt-2">
                  <Link to={`/users/${asker.id}`}>
                    <img 
                      src={asker.avatarUrl} 
                      alt={asker.name} 
                      className="w-10 h-10 rounded-md mr-2" 
                    />
                  </Link>
                  <div>
                    <Link to={`/users/${asker.id}`} className="text-blue-600 hover:text-blue-800">
                      {asker.name}
                    </Link>
                    <div className="text-xs text-gray-500">
                      {asker.reputation.toLocaleString()} reputation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            {question.comments.length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                <div className="space-y-3">
                  {question.comments.map(comment => {
                    const commentUser = mockUsers.find(u => u.id === comment.userId) as User;
                    return (
                      <div key={comment.id} className="text-sm text-gray-700 flex">
                        <div className="flex-1">{comment.content}</div>
                        <div className="text-gray-500 whitespace-nowrap ml-2">
                          – <Link to={`/users/${commentUser.id}`} className="text-blue-600 hover:text-blue-800">
                            {commentUser.name}
                          </Link> {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Answers header */}
        <div className="border-t border-b border-gray-200 py-4 mt-8">
          <h2 className="text-xl font-bold">{question.answers.length} Answers</h2>
        </div>

        {/* Answers */}
        <div className="space-y-8">
          {question.answers.map(answer => (
            <AnswerComponent key={answer.id} answer={answer} />
          ))}
        </div>

        {/* Your Answer form */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-xl font-bold mb-4">Your Answer</h2>
          <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Write your answer here. Support for Markdown is available."
          ></textarea>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
              Post Your Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AnswerComponentProps {
  answer: Answer;
}

const AnswerComponent: React.FC<AnswerComponentProps> = ({ answer }) => {
  // Find the user who posted the answer
  const answerer = mockUsers.find(u => u.id === answer.userId) as User;

  return (
    <div className={`flex pt-4 ${answer.isAccepted ? 'bg-green-50 border-l-4 border-green-600 pl-2' : ''}`}>
      {/* Voting */}
      <div className="flex flex-col items-center mr-6">
        <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
          <ChevronUp size={30} />
        </button>
        <div className="text-xl font-bold my-2">{answer.upvotes - answer.downvotes}</div>
        <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
          <ChevronDown size={30} />
        </button>
        {answer.isAccepted && (
          <div className="p-2 text-green-600" title="Accepted answer">
            <Check size={24} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {answer.content}
          </ReactMarkdown>
        </div>

        {/* Answer metadata */}
        <div className="flex justify-end mt-6">
          <div className="bg-blue-50 rounded-md p-3 max-w-xs">
            <div className="text-xs text-gray-500">
              answered {formatDistanceToNow(answer.createdAt, { addSuffix: true })}
            </div>
            <div className="flex items-center mt-2">
              <Link to={`/users/${answerer.id}`}>
                <img 
                  src={answerer.avatarUrl} 
                  alt={answerer.name} 
                  className="w-10 h-10 rounded-md mr-2" 
                />
              </Link>
              <div>
                <Link to={`/users/${answerer.id}`} className="text-blue-600 hover:text-blue-800">
                  {answerer.name}
                </Link>
                <div className="text-xs text-gray-500">
                  {answerer.reputation.toLocaleString()} reputation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        {answer.comments.length > 0 && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <div className="space-y-3">
              {answer.comments.map(comment => {
                const commentUser = mockUsers.find(u => u.id === comment.userId) as User;
                return (
                  <div key={comment.id} className="text-sm text-gray-700 flex">
                    <div className="flex-1">{comment.content}</div>
                    <div className="text-gray-500 whitespace-nowrap ml-2">
                      – <Link to={`/users/${commentUser.id}`} className="text-blue-600 hover:text-blue-800">
                        {commentUser.name}
                      </Link> {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailPage;