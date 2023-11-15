// Libraries
import React, { useContext, useEffect, useState } from 'react';

// Components
import AthleteList from './AthleteList';

// Styling
import Button from 'react-bootstrap/esm/Button';

const ManageAthletes = () => {

  return (
    <main>
      <h2>Manage Athletes</h2>
      {/* <Link to="/athletes/new">Add New Athlete</Link> */}
      <AthleteList />
    </main>
  );
};

export default ManageAthletes;
