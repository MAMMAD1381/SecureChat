import React, {useEffect, useState} from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { acceptInvitation, denyInvitation, getGroupCert } from '../../controllers/group'
import { useMessage } from '../MessageContext'
import Crypto from '../../utils/Crypto'

const GroupInvitationsList = ({ user, groupInvitations }) => {

  const [verifiedInvitations, setVerifiedInvitations] = useState([])
  const { showMessage } = useMessage()

  useEffect(() => {
    verifyInvitesCertifications()
  }, [])


  const verifyInvitesCertifications = async () => {
    try {
      const verifiedInvitations = []
      for(let invite in groupInvitations){
        const c = groupInvitations[invite].cert
        const cert = await getGroupCert(c)
        const isOwnerVerified = cert.certOwner === groupInvitations[invite].owner
        const isGroupNameVerified = cert.name === groupInvitations[invite].groupName

        const crypto = new Crypto(null, cert.publicKey)
        const isSignatureVerified = crypto.verifySignature(cert.name, cert.signature)

        if(isOwnerVerified && isGroupNameVerified && isSignatureVerified)
          verifiedInvitations.push(groupInvitations[invite])
      }
      setVerifiedInvitations(verifiedInvitations)
    } catch (error) {
      showMessage(`fetching invitations cert failed. Error details: ${error.message}`)
    }
  }

  const handleAcceptInvitation = async (groupName) => {
    try {
      const result = await acceptInvitation(groupName)
      if (result) showMessage('Invitation accepted successfully', 'info')
    } catch (err) {
      showMessage('Accepting invitation failed', 'danger')
    }
  }

  const handleDenyInvitation = async (groupName) => {
    try {
      const result = await denyInvitation(groupName)
      if (result) showMessage('Invitation denied successfully', 'info')
    } catch (err) {
      showMessage('Denying invitation failed', 'danger')
    }
  }

  return (
    <ListGroup>
      {verifiedInvitations.map((invitation) => (
        <ListGroup.Item
          key={invitation._id}
          className="d-flex justify-content-between align-items-center"
          style={{ position: 'relative' }}
        >
          <span>
            {invitation.groupName}: Owned by {invitation.owner}
          </span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <Button
              variant="success"
              size="sm"
              style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}
              onClick={() => handleAcceptInvitation(invitation.groupName)}
            >
              ✓
            </Button>
            <Button
              variant="danger"
              size="sm"
              style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}
              onClick={() => handleDenyInvitation(invitation.groupName)}
            >
              X
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default GroupInvitationsList
