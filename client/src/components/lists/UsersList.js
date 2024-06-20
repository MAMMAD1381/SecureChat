import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { useMessage } from '../MessageContext'
import { useNavigate } from 'react-router-dom';

// controllers
import { deleteUser } from '../../controllers/user'

const UserList = ({ user, users }) => {
  const showMessage = useMessage()
  const navigate = useNavigate();

  const handleDeleteUser = async (username) => {
    try {
      const result = await deleteUser(username, user.token)
      if (result) {
        showMessage('User deleted successfully')
      }
    } catch (error) {
      showMessage(`Deleting user failed. Error details: ${error.response.data.message}`)
    }
  }

  const handleUserClick = (member) => {
    navigate('/chat', { state: { user, target: member } });
  };

  return ( user.role === 'super' ? 
    <ListGroup>
      {users?.map((member) =>
        user.username === member.username ? null : (
          <ListGroup.Item key={member._id} onClick={() => handleUserClick(member)}>
            {member.username}
            <Button
              variant="danger"
              className="float-right"
              onClick={() => handleDeleteUser(member.username)}
            >
              X
            </Button>
          </ListGroup.Item>
        )
      )}
    </ListGroup>

    :

    <ListGroup>
    {users?.map((member) =>
      user.username === member.username ? null : (
        <ListGroup.Item key={member._id} onClick={() => handleUserClick(member)}>
          {member.username}
        </ListGroup.Item>
      )
    )}
  </ListGroup>
  )
}

export default UserList
