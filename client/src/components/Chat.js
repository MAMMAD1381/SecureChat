import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button, ListGroup } from 'react-bootstrap';
import io from 'socket.io-client';

const Chat = () => {
  const location = useLocation();
  const { user, chatMembers } = location.state; // Get the user and chatMembers from the state

  console.log(user, chatMembers, 'here?')
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:3001'); // Replace with your server address

    // Join the room for the current user
    socketRef.current.emit('join', { userId: user._id });

    // Listen for incoming messages
    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Clean up the socket connection on component unmount
      socketRef.current.disconnect();
    };
  }, [user._id]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const newMessage = {
        text: message,
        user: user.name,
        timestamp: new Date(),
      };

      // Emit the message to the server
      socketRef.current.emit('sendMessage', newMessage);

      // Add the message to the local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div>
      <ListGroup className="mb-3">
        {messages.map((msg, index) => (
          <ListGroup.Item key={index}>
            <strong>{msg.user}</strong>: {msg.text} <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleSendMessage}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Chat;
