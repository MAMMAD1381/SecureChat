import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Spinner, Modal, Form } from 'react-bootstrap'

// components
import UserProfile from './UserProfile'
import UserList from '../lists/UsersList'
import GroupsList from '../lists/GroupsList'
import GroupInvitationsList from '../lists/GroupInvitationsList'

// controllers
import { createGroup, getGroups, getGroupInvitations } from '../../controllers/group'
import { getProfile, getUsers } from '../../controllers/user'
import { logout } from '../../controllers/auth'
import configs from '../../env'
import { useMessage } from '../MessageContext'

const AdminDashboard = () => {
  const [user, setUser] = useState(undefined)
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  const [groupInvitations, setGroupInvitations] = useState([])
  const {showMessage} = useMessage()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = async () => {
    try {
      await Promise.all([refreshProfile(), refreshUsers(), refreshGroups(), refreshGroupInvitations()]);
    } catch (error) {
      showMessage(`Error refreshing data: ${error}`, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const user = await getProfile()
      setUser(user)
    } catch (error) {
      showMessage(`fetching profile failed. Error details: ${error}`)
    }
  }

  const refreshUsers = async () => {
    try {
      const users = await getUsers()
      setUsers(users)
    } catch (error) {
      showMessage(`Refreshing users failed. Error details: ${error}`)
    }
  }

  const refreshGroups = async () => {
    try {
      const groups = await getGroups()
      setGroups(groups)
    } catch (error) {
      showMessage(`Refreshing groups failed. Error details: ${error.response.data.message}`)
    }
  }

  const refreshGroupInvitations = async () => {
    try {
      const invitations = await getGroupInvitations()
      setGroupInvitations(invitations)
    } catch (error) {
      showMessage(`Refreshing group invitations failed. Error details: ${error.message}`)
    }
  }

  const handleCreateGroup = async () => {
    const groupData = {
      groupName,
      description: groupDescription,
      users: groupMembers,
    }
    try {
      const result = await createGroup(groupData)
      if (result) {
        showMessage('Group created successfully')
        setShowCreateGroupModal(false)
      }
    } catch (error) {
      showMessage(`Creating group failed. Error details: ${error.response.data.message}`)
    }
  }

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="mt-5">
      <h2>Admin's Dashboard</h2>
      <UserProfile />
      <Row className="mt-3">
        <Col md={4}>
          <h3>Users</h3>
          <UserList user={user} users={users} />
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshUsers}>
            Refresh Users
          </Button>
        </Col>
        <Col md={4}>
          <h3>Groups</h3>
          <GroupsList user={user} groups={groups} />
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshGroups}>
            Refresh Groups
          </Button>
        </Col>
        <Col md={4}>
          <h3>Group Invitations</h3>
          <GroupInvitationsList user={user} groupInvitations={groupInvitations} />
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshGroupInvitations}>
            Refresh Group Invitations
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="warning" onClick={() => setShowCreateGroupModal(true)}>
            Create New Group
          </Button>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Modal show={showCreateGroupModal} onHide={() => setShowCreateGroupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGroupDescription">
              <Form.Label>Group Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateGroupModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateGroup}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default AdminDashboard
