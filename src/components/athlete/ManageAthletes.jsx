// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import DynamicList from '../DynamicList';

// Utilities
import { httpRequest } from '../../utils/apiServices';

// Styling
import Button from 'react-bootstrap/esm/Button';

const ManageAthletes = () => {
  return (
    <main>
      <h2>Manage Athletes</h2>
      <Link to="/athlete/new">
        <Button style={{ margin: '1rem 0' }}>Add Athlete</Button>
      </Link>
      <DynamicList
        fetchDataFunction={() => httpRequest('GET', '/api/athletes')}
        dataKey="athlete_list"
        // buttonComponent={AthleteButton}
        filterOptions={'name'}
      />
    </main>
  );
};

export default ManageAthletes;
