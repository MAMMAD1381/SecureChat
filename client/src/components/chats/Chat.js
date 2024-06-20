import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import configs from '../../env'
import LocalStorage from '../../utils/localStorage'

const Chat = () => {
  const location = useLocation()
  const { user, target } = location.state // Get the user and target from the state
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const socketRef = useRef()

  useEffect(() => {
    const socket = io(configs.SERVER_SOCKET_URL, {
      auth: { token: LocalStorage.get('token') },
    })
    socketRef.current = socket

    socket.on('privateMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data])
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    return () => {
      socket.disconnect()
    }
  }, [user.token])

  const sendMessage = () => {
    if (message.trim() === '') return
    socketRef.current.emit('privateMessage', { user, target, message }, (ack) => {
      console.log(ack)
    })
    setMessages((prevMessages) => [...prevMessages, { user, target, message }])
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
