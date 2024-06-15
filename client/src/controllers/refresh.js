import LocalStorage from '../utils/localStorage';
import axios from 'axios';
import configs from '../env';

async function refreshUsers(token){
    const response = await axios.get(
      `${configs.SERVER_URL}/api/users/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    const users = response.data.users;

    if (response.status === 200) {
      LocalStorage.set('users', users);
      return 'success'
    }
}

async function refreshGroups(token){
  const response = await axios.get(
    `${configs.SERVER_URL}/api/users/groups`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  const groups = response.data.groups;

  if (response.status === 200) {
    LocalStorage.set('groups', groups);
    return 'success'
  }
}


const refresh = {
  refreshUsers,
  refreshGroups
}

export default refresh