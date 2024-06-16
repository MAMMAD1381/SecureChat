import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Alert, Modal, Form } from 'react-bootstrap'
import UserProfile from './UserProfile'
import UserList from './UsersList'
import GroupsList from './GroupsList'
import LocalStorage from '../utils/localStorage'
import refresh from '../controllers/refresh'
import createGroup from '../controllers/createGroup' // Ensure this function is implemented

const UserDashboard = () => {
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(undefined)
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUser(LocalStorage.get('user') ? LocalStorage.get('user') : [])
    setUsers(LocalStorage.get('users') ? LocalStorage.get('users') : [])
  }, [])

  const reload = () => window.location.reload()

  const logout = (e) => {
    e.preventDefault()
    LocalStorage.empty()
    reload()
  }

  const refreshUsers = async (e) => {
    e.preventDefault()
    try {
      const result = await refresh.refreshUsers(user.token)
      if (result) reload()
    } catch (error) {
      setMessage(`refreshing users failed. Error details: ${error}`)
    }
  }

  const refreshGroups = async (e) => {
    e.preventDefault()
    try {
      const result = await refresh.refreshGroups(user.token)
      if (result) reload()
    } catch (error) {
      setMessage(`refreshing groups failed. Error details: ${error.response.data.message}`)
    }
  }

  const handleCreateGroup = async (e) => {
    e.preventDefault()
    const groupData = {
      // user: user.username,
      groupName,
      description: groupDescription,
      users: groupMembers,
    }
    try {
      const result = await createGroup(groupData, user.token)
      if (result) {
        setMessage('Group created successfully')
        setShowCreateGroupModal(false)
        // reload();
      }
    } catch (error) {
      setMessage(`Creating group failed. Error details: ${error.response.data.message}`)
    }
  }

  return (
    <Container className="mt-5">
      <h2>Admin's Dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <UserProfile />
      <Row className="mt-3">
        <Col md={6}>
          <h3>Users</h3>
          <UserList user={user} />
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshUsers}>
            Refresh Users
          </Button>
        </Col>
        <Col md={6}>
          <h3>Groups</h3>
          <GroupsList user={user} />
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshGroups}>
            Refresh Groups
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
            <Form.Group controlId="formGroupMembers">
              <Form.Label>Group Members</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={groupMembers}
                onChange={(e) =>
                  setGroupMembers([...e.target.selectedOptions].map((option) => option.value))
                }
              >
                {users?.map((member) =>
                  user.username === member.username ? null : (
                    <option key={member._id} value={member.username}>
                      {member.username}
                    </option>
                  )
                )}
              </Form.Control>
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

export default UserDashboard
