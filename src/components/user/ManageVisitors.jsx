// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import DynamicList from '../DynamicList';

// Utilities
import { httpRequest } from '../../utils/apiServices';

// Styling
import Button from 'react-bootstrap/esm/Button';

const ManageVisitors = () => {
  return (
    <main>
      <h2>Manage Visitors</h2>
      <DynamicList
        fetchDataFunction={() => httpRequest('GET', '/api/users')}
        dataKey="users"
        filterOptions={'username'}
      />
    </main>
  );
};

export default ManageVisitors;
