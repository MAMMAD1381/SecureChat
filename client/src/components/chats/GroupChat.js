// GroupChat.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import configs from '../../env';
import LocalStorage from '../../utils/localStorage';
import { getUsers } from '../../controllers/user';
import { useMessage } from '../MessageContext';
import GroupDescription from './GroupDescription';
import { inviteUserToGroup, removeUserFromGroup} from '../../controllers/group'

const GroupChat = () => {
  const location = useLocation();
  const { user, group } = location.state; // Get the user and targets from the state
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef();
  const [usersNotInGroup, setUsersNotInGroup] = useState([]);
  const { showMessage } = useMessage();

  const refreshUsers = async () => {
    try {
      const allUsers = await getUsers();
      const nonGroupUsers = allUsers.filter(u => !group.members.includes(u.username));
      setUsersNotInGroup(nonGroupUsers);
    } catch (error) {
      showMessage(`Refreshing users failed. Error details: ${error}`);
    }
  };

  useEffect(() => {
    refreshUsers();
    const socket = io(configs.SERVER_SOCKET_URL, {
      auth: { token: LocalStorage.get('token') },
    });
    socketRef.current = socket;

    socket.on('groupMessage', (data) => {
      if (data.group.name === group.name) setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, [user.token, user, group]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    socketRef.current.emit('joinGroup', { user, group, message }, (ack) => {
      console.log(ack);
    });
    socketRef.current.emit('groupMessage', { user, group, message }, (ack) => {
      console.log(ack);
    });
    setMessages((prevMessages) => [...prevMessages, { user, message }]);
    setMessage('');
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAddMember = async (username) => {
    try{
      const result = await inviteUserToGroup(group, username)
      if (result)
        showMessage('invite sent to ' + username, 'info')

      await refreshUsers()
    }
    catch(err){
      showMessage('invite to ' + username + ' failed', 'danger')
    }
  };

  const handleRemoveMember = async (username) => {
    try{
      const result = await removeUserFromGroup(group, username)
      if (result)
        showMessage(`user ${username} removed from group `, 'info')

      await refreshUsers()
    }
    catch(err){
      showMessage('failed to remove user', 'danger')
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Group Chat Room</h1>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <GroupDescription
            user={user}
            group={group}
            usersNotInGroup={usersNotInGroup}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
          />
        </Col>
        
        <Col md={9}>
          <Card className="mb-4">
            <Card.Body style={{ height: '400px', overflowY: 'scroll' }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex justify-content-${
                    msg.user.username === user.username ? 'end' : 'start'
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded ${
                      msg.user.username === user.username ? 'bg-primary text-white' : 'bg-light'
                    }`}
                  >
                    <strong>{msg.user.username}: </strong>
                    {msg.message}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <Form.Group controlId="messageInput">
              <Form.Control
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GroupChat;
