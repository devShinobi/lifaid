export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  reputation: number;
  joinedDate: Date;
}

export interface Tag {
  id: string;
  name: string;
  description?: string;
  count: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  upvotes: number;
}

export interface Answer {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  questionId: string;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  comments: Comment[];
}

export interface Question {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  tags: Tag[];
  upvotes: number;
  downvotes: number;
  viewCount: number;
  answerCount: number;
  answers: Answer[];
  comments: Comment[];
}