import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { approveAdminRequest, denyAdminRequest } from '../../controllers/admin'
import { useMessage } from '../MessageContext'

const AdminRequestsList = ({ user, adminRequests }) => {
  const showMessage = useMessage()

  const handleApproveAdminRequest = async (requestId) => {
    try {
      const result = await approveAdminRequest(requestId, user.token)
      if (result) {
        showMessage('Admin request approved successfully')
      }
    } catch (error) {
      showMessage(`Approving admin request failed. Error details: ${error.response.data.message}`)
    }
  }

  const handleDenyAdminRequest = async (requestId) => {
    try {
      const result = await denyAdminRequest(requestId, user.token)
      if (result) {
        showMessage('Admin request denied successfully')
      }
    } catch (error) {
      showMessage(`Denying admin request failed. Error details: ${error.response.data.message}`)
    }
  }

  return (
    <ListGroup>
      {adminRequests.map((request) => (
        <ListGroup.Item key={request._id}>
          {request.username}
          <Button
            variant="success"
            className="float-right"
            onClick={() => handleApproveAdminRequest(request._id)}
          >
            ✓
          </Button>
          <Button
            variant="danger"
            className="float-right"
            onClick={() => handleDenyAdminRequest(request._id)}
          >
            X
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default AdminRequestsList
