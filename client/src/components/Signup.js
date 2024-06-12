import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Signup = () => {
  return (
    <Container className="mt-5">
      <h2>Signup</h2>
      <Form>
        {/* Signup form fields */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
