// GroupChat.js
import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import configs from '../../env'
import LocalStorage from '../../utils/localStorage'
import { getUsers, getPublickey } from '../../controllers/user'
import { useMessage } from '../MessageContext'
import GroupDescription from './GroupDescription'
import {
  inviteUserToGroup,
  removeUserFromGroup,
  getPolls,
  createPoll,
  getPollsCert,
  registerVote,
} from '../../controllers/group'
import Crypto from '../../utils/Crypto'
import Poll from './Poll'
import CreatePollModal from './CreatePollModal'

const GroupChat = () => {
  const location = useLocation()
  const { user, group } = location.state // Get the user and targets from the state
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [polls, setPolls] = useState([])
  const [showPollModal, setShowPollModal] = useState(false)
  const socketRef = useRef()
  const [usersNotInGroup, setUsersNotInGroup] = useState([])
  const { showMessage } = useMessage()

  const refreshUsers = async () => {
    try {
      const allUsers = await getUsers()
      const nonGroupUsers = allUsers.filter((u) => !group.members.includes(u.username))
      setUsersNotInGroup(nonGroupUsers)
    } catch (error) {
      showMessage(`Refreshing users failed. Error details: ${error}`)
    }
  }

  const refreshPolls = async () => {
    try {
      const polls = await getPolls(group.name)
      const verifiedPolls = []
      if(polls && polls.length > 0){
        for(let poll of polls){
          const cert = await getPollsCert(poll.cert)
          const isGroupNameVerified = cert.name === poll.group
          const isOwnerVerified = cert.certOwner === poll.createdBy

          const crypto = new Crypto(null, cert.publicKey)
          const isSignatureVerified = crypto.verifySignature(poll.group, cert.signature)
          
          if(isOwnerVerified && isGroupNameVerified && isSignatureVerified)
            verifiedPolls.push(poll)
        }
        setPolls(verifiedPolls)
      }
    } catch (error) {
      showMessage(`Refreshing users failed. Error details: ${error}`)
    }
  }

  const refreshData = async () => {
    try {
      await Promise.all([refreshUsers(), refreshPolls()])
    } catch (error) {
      showMessage(`Error refreshing data: ${error}`, 'danger')
    }
  }

  useEffect(() => {
    refreshData()
    const socket = io(configs.SERVER_SOCKET_URL, {
      auth: { token: LocalStorage.get('token') },
    })
    socketRef.current = socket

    socket.on('groupMessage', async (data) => {
      try {
        const { user, group, message, signature } = data
        const sendersPublickey = await getPublickey(user.username)
        const crypto = new Crypto(null, sendersPublickey)
        crypto.verifySignature(message, signature)
        if (data.group.name === group.name) setMessages((prevMessages) => [...prevMessages, data])
      } catch (err) {
        showMessage('Decoding or verification of new message failed: ' + err.message, 'danger')
      }
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    return () => {
      socket.disconnect()
    }
  }, [user.token, user, group])

  const sendMessage = async () => {
    if (message.trim() === '') return
    try {
      const crypto = new Crypto(LocalStorage.get('private_key'), null)
      const signature = crypto.signData(message)
      socketRef.current.emit('joinGroup', { user, group, message, signature }, (ack) => {
        console.log(ack)
      })
      socketRef.current.emit('groupMessage', { user, group, message, signature }, (ack) => {
        console.log(ack)
      })
      setMessages((prevMessages) => [...prevMessages, { user, message }])
      setMessage('')
    } catch (err) {
      showMessage('Encoding or signing message failed', 'danger')
    }
  }

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const handleAddMember = async (username) => {
    try {
      const result = await inviteUserToGroup(group, username)
      if (result) showMessage('Invite sent to ' + username, 'info')
      await refreshUsers()
    } catch (err) {
      showMessage('Invite to ' + username + ' failed', 'danger')
    }
  }

  const handleRemoveMember = async (username) => {
    try {
      const result = await removeUserFromGroup(group, username)
      if (result) showMessage(`User ${username} removed from group`, 'info')
      await refreshUsers()
    } catch (err) {
      showMessage('Failed to remove user', 'danger')
    }
  }

  const handleVote = async (pollId, option) => {
    try {
      const crypto = new Crypto(user.privateKey, user.publicKey)
      const signature = crypto.signData(option.optionText)
      const result = await registerVote(group.name, pollId, option.optionText, signature)
      if (result) {
        await refreshPolls()
        showMessage('Vote recorded', 'info')
      }
    } catch (err) {
      showMessage(`voting failed. error details: ${err.message}`, 'danger')
    }
  }

  const handleCreatePoll = async ({ question, options }) => {
    try {
      const result = await createPoll(group.name, question, options)

      if (result) {
        await refreshPolls()
        showMessage('Poll created', 'info')
      }
    } catch (err) {
      showMessage(`creating poll failed. more details: ${err.message}`, 'danger')
    }
  }

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
        <Col md={6}>
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
              e.preventDefault()
              sendMessage()
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
        <Col md={3}>
          <h5>Polls</h5>
          {polls.length > 0 ? polls.map((poll) => (
            <Poll poll={poll} onVote={handleVote} />
          )) : null}
          {user.username === group.owner && (
            <Button variant="success" onClick={() => setShowPollModal(true)}>
              Create Poll
            </Button>
          )}
        </Col>
      </Row>
      <CreatePollModal
        show={showPollModal}
        onHide={() => setShowPollModal(false)}
        onCreatePoll={handleCreatePoll}
      />
    </Container>
  )
}

export default GroupChat
