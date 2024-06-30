// components/GroupChat/Poll.js
import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';

const Poll = ({ poll, onVote }) => {
  const totalVotes = poll.options.reduce((total, option) => total + option.votesCount, 0);
  // const totalVotes = poll.options.reduce((total, option) => total + option.votesCount, 0);

  console.log(poll)
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{poll.question}</Card.Title>
        {poll.options.map((option) => (
          <div key={option.id} className="d-flex justify-content-between align-items-center">
            <span>{option.optionText}</span>
            <Button variant="outline-primary" size="sm" onClick={() => onVote(poll._id, option)}>
              Vote
            </Button>
          </div>
        ))}
        <ProgressBar now={(totalVotes / poll.options.length) * 100} />
        {poll.options.map((option) => (
          <div key={option.id} className="d-flex justify-content-between">
            <span>{option.optionText}</span>
            <span>{((option.votesCount / totalVotes) * 100 || 0).toFixed(2)}%</span>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Poll;
