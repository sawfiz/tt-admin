// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import DynamicList from '../DynamicList';

// Utilities
import { httpRequest } from '../../utils/apiServices';

// Styling
import Button from 'react-bootstrap/esm/Button';

const ManageUsers = () => {
  return (
    <main>
      <h2>Manage Users</h2>
      <DynamicList
        fetchDataFunction={() => httpRequest('GET', '/api/users')}
        dataKey="user_list"
        // buttonComponent={AthleteButton}
        filterOptions={'username'}
      />
    </main>
  );
};

export default ManageUsers;
