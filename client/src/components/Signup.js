import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import configs from '../env'
import LocalStorage from '../utils/localStorage';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${configs.SERVER_URL}/api/users/register`, 
        { username, email, password, confirmPassword }, 
        { withCredentials: true }
      );

      const user = response.data.user
      const token = response.data.token || response.headers['set-cookie']
      const privateKey = response.data.privateKey

      if (response.status === 201){
        LocalStorage.set('user', {...user, token, privateKey})
        setTimeout(() => {
          navigate('/'); // Redirect to landing page after 2 seconds
        }, 2000);
        setMessage('Signup successful.');
      }
    } catch (error) {
      console.log(error.response.headers)
      setMessage(`Signup failed. Error details: ${error.response.data.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Signup</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>


        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>ConfirmPassword</Form.Label>
          <Form.Control
            type="password"
            placeholder="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
