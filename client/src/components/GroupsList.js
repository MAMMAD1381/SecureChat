import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LocalStorage from '../utils/localStorage';

const GroupsList = ({user}) => {
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined)
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(user)
    setGroups(LocalStorage.get('groups'))
  }, [user]);

  const handleGroupClick = (group) => {
    navigate('/chat', { state: { user: currentUser, target: group } });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Groups</Card.Title>
        <ListGroup>
          {groups?.length > 0 ? (
            groups.map((group, index) => (
              <ListGroup.Item key={index} onClick={() => handleGroupClick(group)}>
                {group.name}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No groups available</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default GroupsList;