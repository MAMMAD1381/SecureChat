// File: ../controllers/admin.js

import axios from 'axios'
import configs from '../env'
import LocalStorage from '../utils/localStorage'

async function signup(username, email, password, confirmPassword) {
  const response = await axios.post(
    `${configs.SERVER_URL}/api/user/register`,
    { username, email, password, confirmPassword },
    { withCredentials: true }
  )

  const token = response.data.token || response.headers['set-cookie']
  const privateKey = response.data.privateKey

  if (response.status === 201) {
    LocalStorage.set('token', token)
    LocalStorage.set('private_key', privateKey)
    return 'success'
  }
}

async function login(username, password) {
  const response = await axios.post(
    `${configs.SERVER_URL}/api/user/login`,
    { username, password },
    { withCredentials: true }
  )

  const token = response.data.token || response.headers['set-cookie']

  if (response.status === 200) {
    LocalStorage.set('token', token)
    return 'success'
  }
}

async function logout() {
  LocalStorage.remove('token')
  window.location.reload()
}

export { signup, login, logout }
