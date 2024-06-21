// GroupDescription.js
import React from 'react';
import { Card, ListGroup, Button, Alert } from 'react-bootstrap';

const GroupDescription = ({ user, group, usersNotInGroup, onAddMember, onRemoveMember }) => {
  const isSuperOrAdmin = user.role === 'super' || (user.role === 'admin' && user.username === group.owner);

  const handleAddMember = (username) => {
    if (isSuperOrAdmin) {
      onAddMember(username);
    }
  };

  const handleRemoveMember = (username) => {
    if (isSuperOrAdmin) {
      onRemoveMember(username);
    }
  };

  return (
    <div>
      <h5>Group Info</h5>
      <Card>
        <Card.Body>
          <Card.Text><strong>Name:</strong> {group.name}</Card.Text>
          <Card.Text><strong>Description:</strong> {group.description}</Card.Text>
          <Card.Text><strong>Owner:</strong> {group.owner}</Card.Text>
          
          {group.members.length > 0 ? (
            <>
              <Card.Text><strong>Members:</strong></Card.Text>
              <ListGroup>
                {group.members.map((member, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <span>{member}</span>
                    {isSuperOrAdmin && user.username !== member && (
                      <Button variant="danger" size="sm" onClick={() => handleRemoveMember(member)}>Remove</Button>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          ) : (
            <Alert variant="info" className="mt-3">There are no members in this group.</Alert>
          )}

          {isSuperOrAdmin && usersNotInGroup.length > 0 && (
            <>
              <Card.Text className="mt-3"><strong>Users Not in Group:</strong></Card.Text>
              <ListGroup>
                {usersNotInGroup.map((userNotInGroup, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <span>{userNotInGroup.username}</span>
                    <Button variant="success" size="sm" onClick={() => handleAddMember(userNotInGroup.username)}>Add</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}

          {isSuperOrAdmin && usersNotInGroup.length === 0 && (
            <Alert variant="info" className="mt-3">There are no users to invite to this group.</Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GroupDescription;
