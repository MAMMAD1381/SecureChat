// components/GroupChat/CreatePollModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

const CreatePollModal = ({ show, onHide, onCreatePoll }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.slice();
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && options.every(option => option.trim())) {
      onCreatePoll({ question, options });
      setQuestion('');
      setOptions(['']);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Poll</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="pollQuestion">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Label>Options</Form.Label>
          <ListGroup>
            {options.map((option, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleRemoveOption(index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="link" onClick={handleAddOption}>
            Add Option
          </Button>
          <Button variant="primary" type="submit" className="mt-3">
            Create Poll
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePollModal;
