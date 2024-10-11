import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import NewsPage from './pages/NewsPage';
import PageNotFound from './components/PageNotFound';
import Layout from './components/Layout';
import { SearchQueryProvider } from './context/SearchQueryContext.jsx';
import SearchPage from './pages/SearchPage.js';

function App() {
  return (
    <SearchQueryProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<NewsPage />}></Route>
            <Route path='/home' element={<NewsPage />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </SearchQueryProvider>
  );
}

export default App;
