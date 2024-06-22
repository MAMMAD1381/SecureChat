// File: ../controllers/admin.js

import axios from 'axios'
import configs from '../env'
import LocalStorage from '../utils/localStorage'

async function createGroup({ groupName, description }) {
  const token = LocalStorage.get('token')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/group/create`,
    { groupName, description },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  )

  if (response.status === 201) {
    return 'success'
  }
}

async function deleteGroup(groupName) {
  const token = LocalStorage.get('token')
  console.log('he')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/group/delete`,
    { groupName },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  )

  if (response.status === 200) {
    return 'success'
  }
}

async function getGroups() {
  const token = LocalStorage.get('token')
  const response = await axios.get(`${configs.SERVER_URL}/api/group/groups`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })

  const groups = response.data.groups

  if (response.status === 200) {
    return groups
  }
}

async function getGroup() {
  // Implement your logic here
}
async function inviteUserToGroup(group, username) {
  const token = LocalStorage.get('token')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/group/inviteMember`,
    { groupName: group.name, member: username },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  )

  if (response.status === 200) {
    return 'success'
  }
}
async function removeUserFromGroup(group, username) {
  const token = LocalStorage.get('token')
  const response = await axios.patch(
    `${configs.SERVER_URL}/api/group/removeMember`,
    { groupName: group.name, member: username },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  )

  if (response.status === 200) {
    return 'success'
  }
}

async function acceptInvitation(groupName) {
  const token = LocalStorage.get('token')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/group/invitation/accept`,
    { groupName },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  )

  if (response.status === 200) {
    return 'success'
  }
}

async function denyInvitation(groupName) {
  const token = LocalStorage.get('token')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/group/invitation/reject`,
    { groupName },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  )

  if (response.status === 200) {
    return 'success'
  }
}

async function getGroupInvitations() {
  const token = LocalStorage.get('token')
  const response = await axios.get(`${configs.SERVER_URL}/api/group/invitations`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })

  if (response.status === 200) {
    return response.data.invitations
  }
}

async function getAllGroups() {
  const token = LocalStorage.get('token')
  const response = await axios.get(`${configs.SERVER_URL}/api/group/allGroups`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })

  if (response.status === 200) {
    return response.data.groups
  }
}

export {
  deleteGroup,
  createGroup,
  getGroup,
  getGroups,
  removeUserFromGroup,
  inviteUserToGroup,
  acceptInvitation,
  denyInvitation,
  getGroupInvitations,
  getAllGroups,
}
