import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserDashboard from './dashboards/UserDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import { getProfile } from '../controllers/user';
import { useMessage } from './MessageContext';
import {} from '../utils/sign'

const LandingPage = () => {
  
  const [user, setUser] = useState(undefined);
  const {showMessage} = useMessage()

  const fetchUser = async () => {
    try{
      const result = await getProfile();
      setUser(result);
    }
    catch(error){
      // showMessage(error.message, 'danger')
      // set
    }
  };

  useEffect(() => {
    fetchUser();
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