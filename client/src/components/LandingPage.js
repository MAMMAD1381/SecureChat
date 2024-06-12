import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';

const LandingPage = ({ isLoggedIn, role }) => {
  if (!isLoggedIn) {
    return (
      <Container className="text-center mt-5">
        <h1>Welcome to SecureChat</h1>
        <Row className="mt-3">
          <Col>
            <Link to="/signup">
              <Button variant="primary" size="lg">Signup</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/login">
              <Button variant="success" size="lg">Login</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  switch (role) {
    case 'user':
      return <UserDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'super':
      return <SuperAdminDashboard />;
    default:
      return null;
  }
};

export default LandingPage;