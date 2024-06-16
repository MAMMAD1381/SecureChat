import React from 'react';
import { Button } from 'react-bootstrap';
import requestAdmin from '../controllers/requestAdmin';

const RequestAdmin = ({user}) => {

  const requestAdmin = async (e) => {
    e.preventDefault()
    // const 
  }
  return (
    <div>
      <Button variant="warning" onClick={requestAdmin}>Request Admin Role</Button>
    </div>
  );
};

export default RequestAdmin;
