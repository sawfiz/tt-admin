// Libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import Login from '../components/user/Login';

// Styling
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Home() {
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
      <p>
        Welcome, please login or <Link to="/signup">Sign up</Link>
      </p>
      <Login />
    </main>
  );
}
