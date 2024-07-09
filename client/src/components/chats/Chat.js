import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import configs from '../../env'
import LocalStorage from '../../utils/localStorage'
import { getPublickey } from '../../controllers/user'
import Crypto from '../../utils/Crypto'
import { useMessage } from '../MessageContext'

const Chat = () => {
  const location = useLocation()
  const { user, target } = location.state // Get the user and target from the state
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const socketRef = useRef()
  const { showMessage } = useMessage()

  useEffect(() => {
    const socket = io(configs.SERVER_SOCKET_URL, {
      auth: { token: LocalStorage.get('token') },
    })
    socketRef.current = socket

    socket.on('privateMessage', async (data) => {
      const { sender, encodedMessage, signature } = data
      try {
        const sendersPublickey = await getPublickey(sender.username)
        const crypto = new Crypto(user.privateKey, sendersPublickey)
        const decodedMessage = crypto.decryptData(encodedMessage)
        crypto.verifySignature(decodedMessage, signature)
        data.message = decodedMessage
      } catch (err) {
        showMessage('decoding or verification of new message failed' + err.message, 'danger')
      }
      setMessages((prevMessages) => [...prevMessages, data])
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = async () => {
    if (message.trim() === '') return
    let signature, encodedMessage
    try {
      const targetsPublickey = await getPublickey(target.username)
      const crypto = new Crypto(user.privateKey, targetsPublickey)
      signature = crypto.signData(message)
      encodedMessage = crypto.encryptData(message)
    } catch (err) {
      showMessage('encoding or signing message failed', 'danger')
    }
    socketRef.current.emit('privateMessage', { sender: user, target, signature, encodedMessage }, (ack) => {
      console.log(ack)
    })
    setMessages((prevMessages) => [...prevMessages, { sender: user, target, message }])
    setMessage('')
  }

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Chat Room</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body style={{ height: '400px', overflowY: 'scroll' }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex justify-content-${
                    msg.sender.username === user.username ? 'end' : 'start'
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded ${
                      msg.sender.username === user.username ? 'bg-primary text-white' : 'bg-light'
                    }`}
                  >
                    <strong>{msg.sender.username}: </strong>
                    {msg.message}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
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
      </Row>
    </Container>
  )
}

export default Chat
