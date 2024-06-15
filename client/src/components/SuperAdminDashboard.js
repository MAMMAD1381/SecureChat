import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import UserProfile from './UserProfile';
import UserList from './UsersList';
import CreateChatroom from './CreateChatroom';

const SuperAdminDashboard = () => {
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
      <h3>Super Admin Options</h3>
      <Button variant="warning" className="mr-2">Delete User</Button>
      <Button variant="primary" className="mr-2">Approve Admin Requests</Button>
      <Button variant="secondary">Change User Roles</Button>
      <Button variant="danger" className="mt-3">Logout</Button>
    </Container>
  );
};

export default SuperAdminDashboard;
