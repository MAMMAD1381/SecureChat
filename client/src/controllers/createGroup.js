import axios from 'axios';
import configs from '../env'


async function requestCreateGroup({groupName, description, users}, token){

  const response = await axios.post(
    `${configs.SERVER_URL}/api/groups/create`, 
    { groupName, description, users }, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );


  if (response.status === 201){
    return 'success'
  }
}

export default requestCreateGroup