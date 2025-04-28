import { Question, User, Tag, Answer, Comment } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    reputation: 1542,
    joinedDate: new Date('2022-01-15'),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    reputation: 3215,
    joinedDate: new Date('2021-05-22'),
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatarUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    reputation: 9876,
    joinedDate: new Date('2020-11-03'),
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    reputation: 5432,
    joinedDate: new Date('2021-02-14'),
  },
];

// Mock Tags
export const mockTags: Tag[] = [
  { id: '1', name: 'javascript', description: 'For questions about JavaScript, a programming language commonly used for web development.', count: 2187356 },
  { id: '2', name: 'python', description: 'Python is a multi-paradigm, dynamically typed, multi-purpose programming language.', count: 1852431 },
  { id: '3', name: 'react', description: 'React is a JavaScript library for building user interfaces.', count: 789654 },
  { id: '4', name: 'node.js', description: 'Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses JavaScript.', count: 456123 },
  { id: '5', name: 'css', description: 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.', count: 687459 },
  { id: '6', name: 'typescript', description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.', count: 497512 },
  { id: '7', name: 'html', description: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.', count: 789632 },
  { id: '8', name: 'sql', description: 'SQL (Structured Query Language) is a domain-specific language used in programming for managing data in relational databases.', count: 412369 },
];

// Mock Comments
const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Have you tried using async/await instead?',
    createdAt: new Date('2023-09-15T14:23:00'),
    userId: '3',
    upvotes: 5,
  },
  {
    id: '2',
    content: 'This question has been asked before, but the solutions didn\'t work for me.',
    createdAt: new Date('2023-09-16T10:45:00'),
    userId: '2',
    upvotes: 2,
  },
  {
    id: '3',
    content: 'Great solution, worked perfectly for me!',
    createdAt: new Date('2023-09-18T09:12:00'),
    userId: '4',
    upvotes: 8,
  },
  {
    id: '4',
    content: 'Could you explain how this works with large datasets?',
    createdAt: new Date('2023-09-19T16:30:00'),
    userId: '1',
    upvotes: 3,
  },
  {
    id: '5',
    content: 'I\'m having the same issue with Node.js 18. Any updates?',
    createdAt: new Date('2023-09-20T11:05:00'),
    userId: '2',
    upvotes: 4,
  },
];

// Mock Answers
const mockAnswers: Answer[] = [
  {
    id: '1',
    content: `You need to handle the Promise rejection properly. Here's how you can do it:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
\`\`\`

This ensures that any errors in the fetch operation are caught and handled appropriately.`,
    createdAt: new Date('2023-09-15T16:45:00'),
    userId: '3',
    questionId: '1',
    upvotes: 24,
    downvotes: 2,
    isAccepted: true,
    comments: [mockComments[2]],
  },
  {
    id: '2',
    content: `Another approach is to use the Promise.catch() method:

\`\`\`javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('There was a problem with the fetch operation:', error));
\`\`\`

This achieves the same result using Promise chaining instead of async/await.`,
    createdAt: new Date('2023-09-16T09:15:00'),
    userId: '2',
    questionId: '1',
    upvotes: 10,
    downvotes: 1,
    isAccepted: false,
    comments: [],
  },
  {
    id: '3',
    content: `To correctly type your React components, you should use the following pattern:

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
\`\`\`

The React.FC type includes children by default, but you can also be more explicit:

\`\`\`typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
\`\`\`

This approach provides proper type checking for your component props.`,
    createdAt: new Date('2023-10-01T14:30:00'),
    userId: '4',
    questionId: '2',
    upvotes: 16,
    downvotes: 0,
    isAccepted: true,
    comments: [mockComments[3]],
  },
  {
    id: '4',
    content: `If you're using the latest versions of TypeScript and React, you can also use this more concise syntax:

\`\`\`typescript
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
\`\`\`

This approach doesn't use React.FC but still provides full type safety for your components.`,
    createdAt: new Date('2023-10-02T10:45:00'),
    userId: '1',
    questionId: '2',
    upvotes: 8,
    downvotes: 2,
    isAccepted: false,
    comments: [],
  },
  {
    id: '5',
    content: `To install Node.js 20 on Ubuntu 22.04, follow these steps:

1. Update your package index:
\`\`\`bash
sudo apt update
\`\`\`

2. Install the required packages:
\`\`\`bash
sudo apt install -y curl
\`\`\`

3. Add NodeSource repository:
\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
\`\`\`

4. Install Node.js:
\`\`\`bash
sudo apt install -y nodejs
\`\`\`

5. Verify the installation:
\`\`\`bash
node -v
npm -v
\`\`\`

This should install Node.js 20.x and npm on your Ubuntu 22.04 system.`,
    createdAt: new Date('2023-11-10T15:20:00'),
    userId: '2',
    questionId: '3',
    upvotes: 12,
    downvotes: 1,
    isAccepted: true,
    comments: [],
  },
  {
    id: '6',
    content: `For beginners learning JavaScript in 2023, I recommend these resources:

1. **MDN Web Docs** - Comprehensive and up-to-date: https://developer.mozilla.org/en-US/docs/Web/JavaScript
2. **JavaScript.info** - Modern JavaScript tutorial: https://javascript.info/
3. **freeCodeCamp** - Interactive learning with exercises: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
4. **Eloquent JavaScript** - Great book available free online: https://eloquentjavascript.net/
5. **JavaScript30** by Wes Bos - Build 30 things in 30 days: https://javascript30.com/

Start with the basics: variables, data types, functions, and control structures. Then move on to more advanced topics like asynchronous JavaScript, closures, and ES6+ features.

Practice by building small projects - that's the best way to solidify your knowledge.`,
    createdAt: new Date('2023-12-05T11:30:00'),
    userId: '3',
    questionId: '4',
    upvotes: 20,
    downvotes: 0,
    isAccepted: true,
    comments: [],
  },
];

// Mock Questions
export const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How to properly handle fetch API errors in JavaScript?',
    content: `I'm trying to fetch data from an API but I'm having trouble handling errors properly. Here's my current code:

\`\`\`javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error));
\`\`\`

The problem is that even when the API returns a 404 or 500 status, it doesn't go to the catch block. How can I properly detect and handle these error responses?`,
    createdAt: new Date('2023-09-15T10:30:00'),
    userId: '1',
    tags: [mockTags[0], mockTags[3]],
    upvotes: 35,
    downvotes: 2,
    viewCount: 456,
    answerCount: 2,
    answers: [mockAnswers[0], mockAnswers[1]],
    comments: [mockComments[0], mockComments[1]],
  },
  {
    id: '2',
    title: 'What is the best practice for typing React components with TypeScript?',
    content: `I'm new to TypeScript and I'm trying to understand the best practices for typing React components. I've seen different approaches like:

\`\`\`typescript
// Approach 1
interface Props {
  name: string;
}
function Greeting({ name }: Props) {
  return <h1>Hello, {name}!</h1>;
}

// Approach 2
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
\`\`\`

Which approach is recommended and why? Are there any other patterns I should be aware of?`,
    createdAt: new Date('2023-10-01T09:15:00'),
    userId: '2',
    tags: [mockTags[0], mockTags[2], mockTags[5]],
    upvotes: 42,
    downvotes: 3,
    viewCount: 789,
    answerCount: 2,
    answers: [mockAnswers[2], mockAnswers[3]],
    comments: [],
  },
  {
    id: '3',
    title: 'How to install Node.js 20 on Ubuntu 22.04?',
    content: `I need to install Node.js 20 on my Ubuntu 22.04 server for a new project. What's the recommended way to do this? I prefer to use the official repositories if possible, but I'm open to using NVM or other methods if that's better.

What are the steps to install Node.js 20 on Ubuntu 22.04, and are there any potential issues I should be aware of?`,
    createdAt: new Date('2023-11-10T12:45:00'),
    userId: '3',
    tags: [mockTags[3], mockTags[7]],
    upvotes: 18,
    downvotes: 1,
    viewCount: 342,
    answerCount: 1,
    answers: [mockAnswers[4]],
    comments: [mockComments[4]],
  },
  {
    id: '4',
    title: 'Best resources for learning JavaScript in 2023 as a beginner',
    content: `I'm completely new to programming and want to learn JavaScript as my first language. What are the best up-to-date resources for beginners in 2023?

I prefer online resources, but book recommendations are welcome too. I learn best by doing, so resources with practical exercises would be ideal.

Also, what would be a good learning path? Should I start with plain JavaScript before moving to frameworks like React or Vue?`,
    createdAt: new Date('2023-12-05T08:20:00'),
    userId: '4',
    tags: [mockTags[0]],
    upvotes: 27,
    downvotes: 0,
    viewCount: 512,
    answerCount: 1,
    answers: [mockAnswers[5]],
    comments: [],
  },
];

// Get current user (would normally come from authentication)
export const currentUser: User = mockUsers[0];