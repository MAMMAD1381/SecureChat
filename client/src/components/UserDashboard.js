import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import UserProfile from './UserProfile';
import UserList from './UsersList';
import GroupsList from './GroupsList';
import RequestAdmin from './RequestAdmin';
import LocalStorage from '../utils/localStorage';
import refresh from '../controllers/refresh';
import requestAdmin from '../controllers/requestAdmin';

const UserDashboard = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const reload = () => window.location.reload();

  const logout = (e) => {
    e.preventDefault();
    LocalStorage.empty();
    reload();
  };

  const refreshUsers = async (e) => {
    e.preventDefault();
    try {
      const result = await refresh.refreshUsers(user.token);

      if (result) 
        reload();
      
    } catch (error) {
      setMessage(`refreshing users failed. Error details: ${error}`);
    }
  };

  const refreshGroups = async (e) => {
    e.preventDefault();
    try {
      const result = await refresh.refreshGroups(user.token);

      if (result) 
        reload();
      
    } catch (error) {
      setMessage(`refreshing groups failed. Error details: ${error.response.data.message}`);
    }
  };

  const handleRequestAdmin = async (e) => {
    e.preventDefault()
    try {
      const result = await requestAdmin(user.username, user.token);

      if (result) {
        setMessage('admin role requested successfully')
        console.log('successfully')
      }
        // reload();
      
    } catch (error) {
      console.log(error.response.data)
      setMessage(`requesting admin role failed. Error details: ${error.response.data.message}`);
    }
  }

  return (
    <Container className="mt-5">
      <h2>User's Dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <UserProfile />
      <Row className="mt-3">
        <Col md={6}>
          <h3>Users</h3>
          <UserList user={user} />
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshUsers}>Refresh Users</Button>
        </Col>
        <Col md={6}>
          <h3>Groups</h3>
          <GroupsList user={user} />
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshGroups}>Refresh Groups</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="warning" onClick={handleRequestAdmin}>Request Admin Role</Button>
          <Button variant="danger" onClick={logout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
