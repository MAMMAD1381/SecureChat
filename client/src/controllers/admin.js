import axios from 'axios'
import configs from '../env'
import LocalStorage from '../utils/localStorage'

async function createAdminRequest(username) {
  const token = LocalStorage.get('token')

  const response = await axios.post(
    `${configs.SERVER_URL}/api/user/requestAdmin`,
    { username },
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

async function makeAdmin(username) {
  // Implement your logic here
}

async function deleteGroup(groupName) {
  // Implement your logic here
}

async function getAdminRequests() {
  const token = LocalStorage.get('token')

  const response = await axios.get(`${configs.SERVER_URL}/api/admin/adminRequests`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })

  const requests = response.data.requests

  if (response.status === 200) {
    return requests
  }
}

async function approveAdminRequest(username) {
  const token = LocalStorage.get('token')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/admin/adminRequest/approve`,
    { username },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )

  if (response.status === 200) {
    return 'success'
  }
}

async function denyAdminRequest(username) {
  const token = LocalStorage.get('token')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/admin/adminRequest/deny`,
    { username },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  )

  if (response.status === 200) {
    return 'success'
  }
}

export {
  createAdminRequest,
  makeAdmin,
  deleteGroup,
  getAdminRequests,
  approveAdminRequest,
  denyAdminRequest,
}
