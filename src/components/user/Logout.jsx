import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { httpGET } from '../../util/apiServices';

import { Button } from 'react-bootstrap';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedout = await httpGET('logout');
    if (loggedout.message==='success') {
      console.log('🚀 ~ file: Logout.jsx:11 ~ handleSubmit ~ logout:', loggedout.message);
      logout();
      navigate('/');
    }
  };
  return (
    <main>
      <p>Are you sure you want to log out?</p>
      <Button onClick={handleSubmit}>Logout</Button>
    </main>
  );
}
