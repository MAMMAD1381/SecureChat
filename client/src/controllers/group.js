// File: ../controllers/admin.js

import axios from 'axios'
import configs from '../env'
import LocalStorage from '../utils/localStorage'

async function createGroup({ groupName, description, users }) {
  const token = LocalStorage.get('token')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/group/create`,
    { groupName, description, users },
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

async function deleteGroup(username) {
  // Implement your logic here
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

export { deleteGroup, createGroup, getGroup, getGroups }
