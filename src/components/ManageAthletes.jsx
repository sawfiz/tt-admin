import React from 'react';
import { Link } from 'react-router-dom';
import AthleteList from './AthleteList';

const ManageAthletes = () => {
  return (
    <div>
      <h2>Manage Athletes</h2>
      {/* <Link to="/athletes/new">Add New Athlete</Link> */}
      <AthleteList />
    </div>
  );
};

export default ManageAthletes;