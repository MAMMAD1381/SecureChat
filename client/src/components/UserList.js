import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const UserList = () => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Users</Card.Title>
        <ListGroup>
          {/* List of users for chatting */}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UserList;
