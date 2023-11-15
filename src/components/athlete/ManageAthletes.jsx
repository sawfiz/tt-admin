// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import AthleteList from './AthleteList';

// Styling
import Button from 'react-bootstrap/esm/Button';

const ManageAthletes = () => {
  return (
    <main>
      <h2>Manage Athletes</h2>
      <Link to="/athlete/new">
        <Button style={{ margin: '1rem 0' }}>Add Athlete</Button>
      </Link>
      <AthleteList />
    </main>
  );
};

export default ManageAthletes;
