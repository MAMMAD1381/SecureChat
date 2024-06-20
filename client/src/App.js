import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Chat from './components/chats/Chat';
import GroupChat from './components/chats/GroupChat';
import { MessageProvider } from './components/MessageContext';
import GlobalMessage from './components/GlobalMessage';

function App() {
  return (
    <Router>
      <MessageProvider>
        <div className="App">
          <GlobalMessage />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/groupChat" element={<GroupChat />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </MessageProvider>
    </Router>
  );
}

export default App;
