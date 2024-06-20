import axios from 'axios'
import configs from '../env'
import LocalStorage from '../utils/localStorage'

async function deleteUser(username) {
  const token = LocalStorage.get('token')
  const response = await axios.post(
    `${configs.SERVER_URL}/api/user/delete`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
    { username }
  )

  if (response.status === 200) {
    return 'success'
  }
}

async function getUsers() {
  const token = LocalStorage.get('token')
  const response = await axios.get(`${configs.SERVER_URL}/api/user/users`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })

  const users = response.data.users

  if (response.status === 200) {
    return users
  }
}

async function getProfile() {
  const token = LocalStorage.get('token')
  const response = await axios.get(`${configs.SERVER_URL}/api/user/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })

  const profile = response.data.profile

  if (response.status === 200) {
    return profile
  }
}

export { deleteUser, getUsers, getProfile }
