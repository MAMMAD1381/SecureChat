import axios from 'axios';
import configs from '../env'
import LocalStorage from '../utils/localStorage';


async function signup(username, email, password, confirmPassword){

  const response = await axios.post(
    `${configs.SERVER_URL}/api/users/register`, 
    { username, email, password, confirmPassword }, 
    { withCredentials: true }
  );

  const user = response.data.user
  const token = response.data.token || response.headers['set-cookie']
  console.log(token, response.data)
  const privateKey = response.data.privateKey

  if (response.status === 201){
    LocalStorage.set('user', {...user, token, privateKey})
    return 'success'
  }
}

export default signup