import React from 'react';
import { useSelector } from 'react-redux';

const ShowUserList = () => {
  const users = useSelector((state) => state.users.list);

  return (
    <div>
      <h2>Show User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowUserList;
