import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import configs from '../env';
import LocalStorage from '../utils/localStorage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${configs.SERVER_URL}/api/users/login`, 
        { username, password }, 
        { withCredentials: true }
      );

      const user = response.data.user
      const token = response.data.token || response.headers['set-cookie']

      if (response.status === 200){
        LocalStorage.set('user', {...user, token})
        setTimeout(() => {
          navigate('/'); // Redirect to landing page after 2 seconds
        }, 2000);
        setMessage('Signup successful.');
      }
    } catch (error) {
      console.log(error.response.headers)
      setMessage(`login failed. Error details: ${error.response.data.message}`);
    }
  };
  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
