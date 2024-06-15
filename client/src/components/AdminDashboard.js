import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import UserProfile from './UserProfile';
import UserList from './UsersList';
import CreateChatroom from './CreateChatroom';

const AdminDashboard = () => {
  return (
    <Container className="mt-5">
      <UserProfile />
      <Row className="mt-3">
        <Col>
          <UserList />
        </Col>
        <Col>
          <Button variant="info" className="mb-3">Refresh Users</Button>
          <CreateChatroom />
        </Col>
      </Row>
      <Button variant="danger">Logout</Button>
    </Container>
  );
};

export default AdminDashboard;
