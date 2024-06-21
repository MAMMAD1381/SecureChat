import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Spinner } from 'react-bootstrap'

// components
import UserProfile from './UserProfile'
import UserList from '../lists/UsersList'
import GroupsList from '../lists/GroupsList'
import GroupInvitationsList from '../lists/GroupInvitationsList'

// controllers
import { createAdminRequest } from '../../controllers/admin'
import { getUsers, getProfile } from '../../controllers/user'
import { getGroups, getGroupInvitations } from '../../controllers/group'
import { logout } from '../../controllers/auth'
import configs from '../../env'
import { useMessage } from '../MessageContext'

const UserDashboard = () => {
  const [user, setUser] = useState(undefined)
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

  const handleRequestAdmin = async () => {
    const result = await createAdminRequest(user.username)

    if (!(result instanceof Error)) 
      showMessage('admin role requested successfully')
    
    else
      showMessage(`requesting admin role failed. Error details: ${result.message}`)
    
  }

  const refreshGroupInvitations = async () => {
    try {
      const invitations = await getGroupInvitations()
      setGroupInvitations(invitations)
    } catch (error) {
      showMessage(`Refreshing group invitations failed. Error details: ${error.message}`)
    }
  }

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="mt-5">
      <h2>User's Dashboard</h2>
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
          <Button variant="warning" onClick={handleRequestAdmin}>
            Request Admin Role
          </Button>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default UserDashboard
