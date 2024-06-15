import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import LocalStorage from '../utils/localStorage';

const GroupsList = ({ user }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const groupsData = LocalStorage.get('groups');
    if (groupsData) {
      setGroups(groupsData);
    }
  }, []);

  return (
    <div>
      <h3>Groups</h3>
      <ListGroup>
        {groups.map((group, index) => (
          <ListGroup.Item key={index}>{group.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default GroupsList;
