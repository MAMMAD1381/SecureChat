import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [showFullPublicKey, setShowFullPublicKey] = useState(false);
  const [showFullPrivateKey, setShowFullPrivateKey] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setUsername(parsedUser.username);
      setEmail(parsedUser.email);
      setRole(parsedUser.role);
      setPublicKey(parsedUser.publicKey);
      setPrivateKey(parsedUser.privateKey);
    }
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-4">User Profile</Card.Title>
        {user ? (
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Username:</strong> {username}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Role:</strong> {role}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Public Key:</strong> {showFullPublicKey ? publicKey : truncate(publicKey, 20)}
              <Button variant="link" onClick={() => setShowFullPublicKey(!showFullPublicKey)}>
                {showFullPublicKey ? 'Show Less' : 'Show More'}
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Private Key:</strong> {showFullPrivateKey ? privateKey : truncate(privateKey, 20)}
              <Button variant="link" onClick={() => setShowFullPrivateKey(!showFullPrivateKey)}>
                {showFullPrivateKey ? 'Show Less' : 'Show More'}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        ) : (
          <p>No user data available.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
