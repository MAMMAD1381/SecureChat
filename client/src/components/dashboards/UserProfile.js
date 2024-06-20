import React, { useEffect, useState } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'

// controllers
import { getProfile } from '../../controllers/user'

// utils
import { useMessage } from '../MessageContext'
import configs from '../../env'

const UserProfile = () => {
  const {showMessage} = useMessage()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [role, setRole] = useState(null)
  const [publicKey, setPublicKey] = useState(null)
  const [privateKey, setPrivateKey] = useState(null)
  const [showFullPublicKey, setShowFullPublicKey] = useState(false)
  const [showFullPrivateKey, setShowFullPrivateKey] = useState(false)

  useEffect(() => {
    refreshProfile()
  }, [])

  const refreshProfile = async () => {
    try {
      const user = await getProfile()
      setUser(user)
      setUsername(user.username)
      setEmail(user.email)
      setRole(user.role)
      setPublicKey(user.publicKey)
      setPrivateKey(user.privateKey)
      // setUser(user)
    } catch (error) {
      showMessage(`fetching profile failed. Error details: ${error}`)
    }
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

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
              <strong>Private Key:</strong>{' '}
              {showFullPrivateKey ? privateKey : truncate(privateKey, 20)}
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
  )
}

export default UserProfile
