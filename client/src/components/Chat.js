// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';

const socket = io('http://localhost:5000');

const Chat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionKey, setSessionKey] = useState('');

  useEffect(() => {
    // This is a placeholder for session key generation
    // In a real-world app, you would perform key exchange here
    setSessionKey('your-session-key');

    socket.on('message', (encryptedMessage) => {
      const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, sessionKey).toString(CryptoJS.enc.Utf8);
      setMessages((prevMessages) => [...prevMessages, decryptedMessage]);
    });
  }, [sessionKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const encryptedMessage = CryptoJS.AES.encrypt(message, sessionKey).toString();
    socket.emit('message', encryptedMessage);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
