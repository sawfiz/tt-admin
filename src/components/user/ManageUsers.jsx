// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import UserList from './UserList'

// Styling
import Button from 'react-bootstrap/esm/Button';

const ManageUsers = () => {
  return (
    <main>
      <h2>Manage Users</h2>
      <UserList />
    </main>
  );
};

export default ManageUsers;
