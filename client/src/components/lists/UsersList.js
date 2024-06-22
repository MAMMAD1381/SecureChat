import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { useMessage } from '../MessageContext'
import { useNavigate } from 'react-router-dom'

// controllers
import { deleteUser } from '../../controllers/user'

const UserList = ({ user, users }) => {
  const { showMessage } = useMessage()
  const navigate = useNavigate()

  const handleDeleteUser = async (username) => {
    try {
      const result = await deleteUser(username, user.token)
      if (result) {
        showMessage('User deleted successfully')
      }
    } catch (error) {
      showMessage(`Deleting user failed. Error details: ${error.message}`)
    }
  }

  const handleSendMessage = (member) => {
    navigate('/chat', { state: { user, target: member } })
  }

  return (
    <ListGroup>
      {users?.map((member) =>
        user.username === member.username ? null : (
          <ListGroup.Item
            key={member._id}
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative' }}
          >
            <span>{member.username}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
              {user.role === 'super' && (
                <Button
                  variant="danger"
                  size="sm"
                  style={{
                    padding: '0.2rem 0.4rem',
                    fontSize: '0.8rem',
                  }}
                  onClick={() => handleDeleteUser(member.username)}
                >
                  delete
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                style={{
                  padding: '0.2rem 0.4rem',
                  fontSize: '0.8rem',
                }}
                onClick={() => handleSendMessage(member)}
              >
                ✉
              </Button>
            </div>
          </ListGroup.Item>
        )
      )}
    </ListGroup>
  )
}

export default UserList
