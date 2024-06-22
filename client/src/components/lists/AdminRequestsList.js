import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { approveAdminRequest, denyAdminRequest } from '../../controllers/admin'
import { useMessage } from '../MessageContext'

const AdminRequestsList = ({ user, adminRequests }) => {
  const { showMessage } = useMessage()

  const handleApproveAdminRequest = async (username) => {
    try {
      const result = await approveAdminRequest(username)
      if (result) {
        showMessage('Admin request approved successfully')
      }
    } catch (error) {
      showMessage(`Approving admin request failed. Error details: ${error.message}`)
    }
  }

  const handleDenyAdminRequest = async (username) => {
    try {
      const result = await denyAdminRequest(username)
      if (result) {
        showMessage('Admin request denied successfully')
      }
    } catch (error) {
      showMessage(`Denying admin request failed. Error details: ${error.message}`)
    }
  }

  return (
    <ListGroup>
      {adminRequests.map((request) => (
        <ListGroup.Item
          key={request._id}
          className="d-flex justify-content-between align-items-center"
          style={{ position: 'relative' }}
        >
          <span>{request.username}</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <Button
              variant="success"
              size="sm"
              style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}
              onClick={() => handleApproveAdminRequest(request.username)}
            >
              ✓
            </Button>
            <Button
              variant="danger"
              size="sm"
              style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}
              onClick={() => handleDenyAdminRequest(request.username)}
            >
              X
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default AdminRequestsList
