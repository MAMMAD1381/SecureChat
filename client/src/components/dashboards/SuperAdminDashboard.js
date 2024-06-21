import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Modal, Form, Spinner } from 'react-bootstrap';

// components
import UserProfile from './UserProfile';
import UserList from '../lists/UsersList';
import GroupsList from '../lists/GroupsList';
import AdminRequestsList from '../lists/AdminRequestsList';

// controllers
import { getAdminRequests } from '../../controllers/admin';
import { getUsers, getProfile } from '../../controllers/user';
import { getGroups, createGroup } from '../../controllers/group';
import { logout } from '../../controllers/auth';
import { useMessage } from '../MessageContext';

const SuperAdminDashboard = () => {
  const [user, setUser] = useState(undefined);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [adminRequests, setAdminRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showMessage } = useMessage();

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      await Promise.all([refreshProfile(), refreshUsers(), refreshGroups(), refreshAdminRequests()]);
    } catch (error) {
      showMessage(`Error refreshing data: ${error}`, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const user = await getProfile();
      setUser(user);
    } catch (error) {
      showMessage(`Fetching profile failed. Error details: ${error}`, 'danger');
    }
  };

  const refreshAdminRequests = async () => {
    try {
      const requests = await getAdminRequests();
      setAdminRequests(requests);
      console.log(requests)
    } catch (error) {
      console.log(error)
      showMessage(`fetching admin requests failed. Error details: ${error}`, 'danger');
    }
  };

  const refreshUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      showMessage(`Refreshing users failed. Error details: ${error}`, 'danger');
    }
  };

  const refreshGroups = async () => {
    try {
      const groups = await getGroups();
      setGroups(groups);
    } catch (error) {
      showMessage(`Refreshing groups failed. Error details: ${error.response?.data?.message || error.message}`, 'danger');
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const groupData = {
      groupName,
      description: groupDescription,
      users: groupMembers,
    };
    try {
      const result = await createGroup(groupData, user.token);
      if (result) {
        showMessage('Group created successfully', 'success');
        setShowCreateGroupModal(false);
      }
    } catch (error) {
      showMessage(`Creating group failed. Error details: ${error.response?.data?.message || error.message}`, 'danger');
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="mt-5">
      <h2>Super Admin's Dashboard</h2>
      <UserProfile />
      <Row className="mt-3">
        <Col md={4}>
          <h3>Users</h3>
          {user && users.length > 0 ? (
            <UserList user={user} users={users} />
          ) : (
            <p>No users found.</p>
          )}
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshUsers}>
            Refresh Users
          </Button>
        </Col>
        <Col md={4}>
          <h3>Groups</h3>
          {groups.length > 0 ? (
            <GroupsList user={user} groups={groups} />
          ) : (
            <p>No groups found.</p>
          )}
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshGroups}>
            Refresh Groups
          </Button>
        </Col>
        <Col md={4}>
          <h3>Admin Requests</h3>
          {adminRequests.length > 0 ? (
            <AdminRequestsList user={user} adminRequests={adminRequests} />
          ) : (
            <p>No admin requests found.</p>
          )}
          <Button variant="info" className="mt-2 mb-3 btn-sm" onClick={refreshAdminRequests}>
            Refresh Requests
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
  );
};

export default SuperAdminDashboard;
