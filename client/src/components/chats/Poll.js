// components/GroupChat/Poll.js
import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';

const Poll = ({ poll, onVote }) => {
  const totalVotes = poll.options.reduce((total, option) => total + option.votesCount, 0);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-4">{poll.question}</Card.Title>
        {poll.options.map((option) => (
          <div key={option.id} className="d-flex justify-content-between align-items-center mb-2">
            <span className="flex-grow-1">{option.optionText}</span>
            <Button
              variant="outline-primary"
              size="sm"
              className="ml-2"
              onClick={() => onVote(poll._id, option)}
            >
              Vote
            </Button>
          </div>
        ))}
        <hr />
        {poll.options.map((option) => (
          <div key={option.id} className="mb-3">
            <ProgressBar
              now={(option.votesCount / totalVotes) * 100}
            />
            <div className="d-flex justify-content-between">
              <span>{option.optionText}</span>
              <span>{((option.votesCount / totalVotes) * 100 || 0).toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Poll;
