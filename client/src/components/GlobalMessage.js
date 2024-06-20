// src/components/GlobalMessage.jsx

import React from 'react';
import { Alert } from 'react-bootstrap';
import { useMessage } from './MessageContext';

const GlobalMessage = () => {
  const { message, messageType, clearMessage } = useMessage();

  return (
    message && (
      <Alert variant={messageType} onClose={clearMessage} dismissible>
        {message}
      </Alert>
    )
  );
};

export default GlobalMessage;
