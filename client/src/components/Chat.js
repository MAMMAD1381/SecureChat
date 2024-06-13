import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const { user, chatMembers } = location.state; // Get the user and chatMembers from the state
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Connect to the user's own WebSocket for receiving messages
    ws.current = new WebSocket(user.address);
    console.log('create socket for receiving', user.address);

    ws.current.onopen = () => {
      console.log('WebSocket connection established for receiving messages');
    };

    ws.current.onmessage = (event) => {
      console.log('message received', event.data);
      receiveMessage(event.data);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed for receiving messages');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user.address]);

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    // Open WebSocket connections to all users' addresses to send the message
    chatMembers.forEach(member => {
      console.log('sending', member.address);
      const wsSend = new WebSocket(member.address);

      wsSend.onopen = () => {
        console.log(`WebSocket connection established with ${member.username} for sending message`);
        wsSend.send(messageInput);
        wsSend.current.onmessage = (event) => {
          console.log('message received', event.data);
          receiveMessage(event.data);
        };
        // wsSend.close(); // Close after sending the message
      };

      wsSend.onerror = (error) => {
        console.error(`WebSocket error with ${member.username}:`, error);
      };

      wsSend.onclose = () => {
        console.log(`WebSocket connection closed with ${member.username} after sending message`);
      };
    });

    // Add the sent message to own messages
    setMessages(prevMessages => [...prevMessages, { text: messageInput, sender: user.name }]);
    setMessageInput('');
  };

  const receiveMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, { text: message, sender: 'Other' }]);
  };

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === user.username ? 'right' : 'left', margin: '5px' }}>
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <input type="text" value={messageInput} onChange={handleChange} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
