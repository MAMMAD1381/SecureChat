import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import UserProfile from './UserProfile';
import UserList from './UserList';
import GroupsList from './GroupsList';
import RequestAdmin from './RequestAdmin';
import LocalStorage from '../utils/localStorage';
import axios from 'axios';
import configs from '../env';

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
    LocalStorage.remove('user');
    reload();
  };

  const refreshUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${configs.SERVER_URL}/api/users/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );

      const users = response.data.users;

      if (response.status === 200) {
        LocalStorage.set('users', users);
        reload();
      }
    } catch (error) {
      setMessage(`refreshing users failed. Error details: ${error.response.data.message}`);
    }
  };

  const refreshGroups = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${configs.SERVER_URL}/api/groups/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );

      const groups = response.data.groups;

      if (response.status === 200) {
        LocalStorage.set('groups', groups);
        reload();
      }
    } catch (error) {
      setMessage(`refreshing groups failed. Error details: ${error.response.data.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <h2>User's Dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <UserProfile />
      <Row className="mt-3">
        <Col>
          <Tabs defaultActiveKey="users" id="uncontrolled-tab-example">
            <Tab eventKey="users" title="Users">
              <UserList user={user} />
              <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshUsers}>Refresh Users</Button>
            </Tab>
            <Tab eventKey="groups" title="Groups">
              <GroupsList user={user} />
              <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshGroups}>Refresh Groups</Button>
            </Tab>
          </Tabs>
        </Col>
        <Col>
          <RequestAdmin />
        </Col>
      </Row>
      <Button variant="danger" onClick={logout}>Logout</Button>
    </Container>
  );
};

export default UserDashboard;
