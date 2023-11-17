// Libraries
import React, { useState, useEffect } from 'react';
import {postData} from '../../util/apiServices'

// Styling
import { Form, Button } from 'react-bootstrap';

export default function Login() {
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
    const login = await postData('/login', formData)
    console.log("🚀 ~ file: Login.jsx:22 ~ handleSubmit ~ login:", login)
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete='true'
          className="px-1 mr-2 w-32"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete='true'
          className="px-1 w-32 mr-2"
        />

        <Button type="submit" className="py-0">
          Login
        </Button>
      </Form>
      <hr />
    </>
  );
}
