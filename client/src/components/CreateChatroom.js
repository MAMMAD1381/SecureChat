import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateChatroom = () => {
  return (
    <Form className="mb-3">
      <Form.Group controlId="formChatroomName">
        <Form.Label>Chatroom Name</Form.Label>
        <Form.Control type="text" placeholder="Enter chatroom name" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Chatroom
      </Button>
    </Form>
  );
};

export default CreateChatroom;
