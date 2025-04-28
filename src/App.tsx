import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import AskQuestionPage from './pages/AskQuestionPage';
import TagsPage from './pages/TagsPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="questions/:questionId" element={<QuestionDetailPage />} />
          <Route path="questions/ask" element={<AskQuestionPage />} />
          <Route path="tags" element={<TagsPage />} />
          <Route path="users/:userId" element={<UserProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;