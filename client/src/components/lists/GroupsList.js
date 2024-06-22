import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { deleteGroup } from '../../controllers/group'
import { useMessage } from '../MessageContext'
import { useNavigate } from 'react-router-dom'

const GroupsList = ({ user, groups }) => {
  const { showMessage } = useMessage()
  const navigate = useNavigate()

  const handleDeleteGroup = async (groupName) => {
    try {
      const result = await deleteGroup(groupName)
      if (result) {
        showMessage('Group deleted successfully')
      }
    } catch (error) {
      showMessage(`Deleting group failed. Error details: ${error.message}`)
    }
  }

  const handleSendMessage = (group) => {
    navigate('/groupChat', { state: { user, group } })
  }

  const canDeleteGroup = (group) => {
    return user.role === 'super' || (user.role === 'admin' && group.owner === user.username)
  }

  return (
    <ListGroup>
      {groups?.map((group) => (
        <ListGroup.Item
          key={group._id}
          className="d-flex justify-content-between align-items-center"
          style={{ position: 'relative' }}
        >
          <span>{group.name}</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            {canDeleteGroup(group) && (
              <Button
                variant="danger"
                size="sm"
                style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}
                onClick={() => handleDeleteGroup(group.name)}
              >
                delete
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}
              onClick={() => handleSendMessage(group)}
            >
              ✉
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default GroupsList
