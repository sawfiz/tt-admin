// Libraries
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

// Components
import Login from '../components/user/Login';

// Styling
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Home() {
  const { isLoggedIn, name } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  return (
    <main>
      {isLoggedIn ? (
        <p>Welcome {name}</p>
      ) : (
        <>
          <p>
            Welcome, please login or <Link to="/signup">Sign up</Link>
          </p>
          <Login />
        </>
      )}
    </main>
  );
}
