import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
