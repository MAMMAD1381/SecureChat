import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import UserProfile from './UserProfile';
import UserList from './UserList';
import RequestAdmin from './RequestAdmin';
import LocalStorage from '../utils/localStorage';

const UserDashboard = () => {

  const logout = (e) => {
    e.preventDefault()
    LocalStorage.remove('user')
    window.location.reload();
  }
  return (
    <Container className="mt-5">
      <UserProfile />
      <Row className="mt-3">
        <Col>
          <UserList />
        </Col>
        <Col>
          <Button variant="info" className="mb-3">Refresh Users</Button>
          <RequestAdmin />
        </Col>
      </Row>
      <Button variant="danger" onClick={logout} >Logout</Button>
    </Container>
  );
};

export default UserDashboard;
