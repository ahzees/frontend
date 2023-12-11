// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Threads from './components/Threads';
import Navigation from './components/Navigation';
import ThreadDetail from './components/ThreadDetail'; // Import the ThreadDetail component
import './App.css';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  };

  return (
    <Router>
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/threads" /> : <Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/threads" /> : <Login />} />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/threads" /> : <Register />}
        />
        <Route path="/threads" element={isAuthenticated ? <Threads /> : <Navigate to="/login" />} />
        <Route path="/thread/:id" element={<ThreadDetail />} /> {/* New route for ThreadDetail */}
      </Routes>
    </Router>
  );
};

export default App;
