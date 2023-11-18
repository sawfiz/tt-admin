// Libraries
import React, { useState, useContext } from 'react';
import { postData } from '../../util/apiServices';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

// Styling
import { Form, Button } from 'react-bootstrap';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedin = await postData('/login', formData);
    console.log('🚀 ~ file: Login.jsx:22 ~ handleSubmit ~ login:', loggedin);
    if (loggedin) {
      const name = loggedin.user.name;
      login(name);
      navigate('/');
    }
  };

  return (
    <main>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="true"
          className="px-1 mr-2 w-32"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="true"
          className="px-1 w-32 mr-2"
        />

        <Button type="submit" className="py-0">
          Login
        </Button>
      </Form>
    </main>
  );
}
