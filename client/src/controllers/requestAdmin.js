import axios from 'axios';
import configs from '../env'
import LocalStorage from '../utils/localStorage';


async function requestAdmin(username, token){
  console.log(username, token)

  const response = await axios.post(
    `${configs.SERVER_URL}/api/users/requestAdmin`, 
    { username }, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  // const user = response.data.user
  // const token = response.data.token || response.headers['set-cookie']
  // console.log(token, response.data)
  // const privateKey = response.data.privateKey

  if (response.status === 201){
    // LocalStorage.set('user', {...user, token, privateKey})
    return 'success'
  }
}

export default requestAdmin