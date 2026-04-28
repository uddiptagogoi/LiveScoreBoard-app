import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import Login from './Login';
import HomePage from './HomePage';
import Footer from './Footer';
import Register from './Register';
import UserCustomScoreBoard from './UserCustomScoreBoard';
import MatcheInfo from './MatchesPage';

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    // apply theme class on body
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <Router>
      <div className="App">
        <NavBar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/MatcheInfo" element={<MatcheInfo />} />
          <Route path="/userCustomScoreBoard" element={<UserCustomScoreBoard />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
