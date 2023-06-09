import React from 'react';
// React-router-dom
import { Routes, Route } from 'react-router-dom';
// Pages
import { HomePage } from '../../pages/HomePage';
import { NewsPage } from '../../pages/NewsPage';
// Css
import './index.css';

function App() {
  return (
    <div className="app__container">
      <Routes>
        <Route path='/hacker-news/' element={<HomePage />} />
        <Route path='/news/:newsId' element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
