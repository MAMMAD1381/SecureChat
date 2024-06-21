import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { acceptInvitation, denyInvitation } from '../../controllers/group'
import { useMessage } from '../MessageContext'

const GroupInvitationsList = ({ user, groupInvitations }) => {
  const {showMessage} = useMessage()

  const handleAcceptInvitation = async (groupName) => {
    try{
      const result = await acceptInvitation(groupName)
      if (result) showMessage('invitation accepted successfully', 'info')
    }
    catch(err){
      showMessage('accepting invitation failed', 'danger')
    }
  }

  const handleDenyInvitation = async (groupName) => {
    try{
      const result = await denyInvitation(groupName)
      if (result) showMessage('invitation denied successfully', 'info')
    }
    catch(err){
      showMessage('denying invitation failed', 'danger')
    }
  }

  return (
    <ListGroup>
      {groupInvitations.map((invitation) => (
        <ListGroup.Item key={invitation._id}>
          {invitation.groupName}: Owned by {invitation.owner} 
          <Button
            variant="success"
            className="float-right"
            onClick={() => handleAcceptInvitation(invitation.groupName)}
          >
            ✓
          </Button>
          <Button
            variant="danger"
            className="float-right"
            onClick={() => handleDenyInvitation(invitation.groupName)}
          >
            X
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default GroupInvitationsList
