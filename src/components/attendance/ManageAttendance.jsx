// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import DynamicList from '../DynamicList';

// Utilities
import { httpRequest } from '../../utils/apiServices';

// Styling
import Button from 'react-bootstrap/esm/Button';

const ManageAttendances = () => {
  return (
    <main>
      <h2>Manage Attendances</h2>
      <Link to="/attendance/new">
        <Button style={{ margin: '1rem 0' }}>Add Attendance</Button>
      </Link>
      <DynamicList
        fetchDataFunction={() => httpRequest('GET', '/api/attendances')}
        dataKey="attendances"
        showAttendances={true}
      />
    </main>
  );
};

export default ManageAttendances;