import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LocalStorage from '../utils/localStorage';

const UserList = ({user}) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined)
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(user)
    setUsers(LocalStorage.get('users'))
  }, [user]);

  const handleUserClick = (user) => {
    navigate('/chat', { state: { user: currentUser, target: user } });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Users</Card.Title>
        <ListGroup>
          {users?.length > 0 ? (
            users.map((user, index) => (
              <ListGroup.Item key={index} onClick={() => handleUserClick(user)}>
                {user.username}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No users available</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UserList;