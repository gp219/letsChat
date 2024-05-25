import React from 'react';

const UserList = ({ users, onSelectUser }) => {
  const handleUserClick = (username) => {
    onSelectUser(username);
  };

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} onClick={() => handleUserClick(user.username)}>
          {user.username}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
