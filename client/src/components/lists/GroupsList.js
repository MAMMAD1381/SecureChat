import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { deleteGroup } from '../../controllers/admin'
import { useMessage } from '../MessageContext'
import { useNavigate } from 'react-router-dom';


const GroupsList = ({ user, groups }) => {
  const showMessage = useMessage()
  const navigate = useNavigate();

  const handleDeleteGroup = async (groupId) => {
    try {
      const result = await deleteGroup(groupId, user.token)
      if (result) {
        showMessage('Group deleted successfully')
      }
    } catch (error) {
      showMessage(`Deleting group failed. Error details: ${error.response.data.message}`)
    }
  }

  const handleGroupClick = (group) => {
    navigate('/groupChat', { state: { user, group } });
  };

  return ( user.role === 'super' ? 
    <ListGroup>
      {groups?.map((group) => (
        <ListGroup.Item key={group._id} onClick={() => handleGroupClick(group)}>
          {group.name}
          <Button
            variant="danger"
            className="float-right"
            onClick={() => handleDeleteGroup(group.name)}
          >
            X
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>

    :

    <ListGroup>
      {groups?.map((group) => (
        <ListGroup.Item key={group._id} onClick={() => handleGroupClick(group)}>
          {group.name}
        </ListGroup.Item>
      ))}
    </ListGroup>

  )
}

export default GroupsList
