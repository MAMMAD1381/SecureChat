import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';

const LandingPage = () => {
  
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Check if user is logged in and fetch role from API or local storage
    const jsonUser = localStorage.getItem('user');
    if (!jsonUser)
      setUser(undefined)
    else
      setUser(JSON.parse(jsonUser))
    
  }, []);

  if (!user) {
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
  else if (user.role === 'user')
    return <UserDashboard />;
  
  else if (user.role === 'admin')
    return <AdminDashboard />;
  
  else if (user.role === 'super')
    return <SuperAdminDashboard />;
  
  else
    return null
};

export default LandingPage;