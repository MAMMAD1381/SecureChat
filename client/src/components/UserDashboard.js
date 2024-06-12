import React, {useState, useEffect} from 'react';
import { Container, Button, Row, Col, Alert } from 'react-bootstrap';
import UserProfile from './UserProfile';
import UserList from './UserList';
import RequestAdmin from './RequestAdmin';
import LocalStorage from '../utils/localStorage';
import axios from 'axios'
import configs from '../env'

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

  const reload = () => window.location.reload()

  const logout = (e) => {
    e.preventDefault()
    LocalStorage.remove('user')
    reload()
  }

  const refreshUsers = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `${configs.SERVER_URL}/api/users/`, 
        { 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          withCredentials: true 
      }
      );

      const users = response.data.users

      if (response.status === 200){
        LocalStorage.set('users', users)
        reload()
      }
    } catch (error) {
      setMessage(`refreshing users failed. Error details: ${error.response.data.message}`);
    }
  }
  return (
    <Container className="mt-5">
      <h2>user's dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <UserProfile />
      <Row className="mt-3">
        <Col>
          <UserList />
        </Col>
        <Col>
          <Button variant="info" className="mb-3" onClick={refreshUsers}>Refresh Users</Button>
          <RequestAdmin />
        </Col>
      </Row>
      <Button variant="danger" onClick={logout} >Logout</Button>
    </Container>
  );
};

export default UserDashboard;
