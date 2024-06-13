import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LocalStorage from '../utils/localStorage';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(LocalStorage.get('users'))
  }, []);

  const handleUserClick = (user) => {
    // Navigate to the chat page and pass the selected user as state
    console.log(user)
    // const chatMembers = users; // Or however you derive chatMembers from the users
    // Navigate to the chat page and pass the selected user and chatMembers as state
    navigate('/chat', { state: { user, chatMembers: users } });
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