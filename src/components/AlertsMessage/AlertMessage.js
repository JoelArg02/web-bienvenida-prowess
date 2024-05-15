import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ message, messageType, setMessage }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return message ? <Alert variant={messageType}>{message}</Alert> : null;
};

export default AlertMessage;
