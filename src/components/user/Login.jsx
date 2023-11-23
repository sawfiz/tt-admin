// Libraries
import React, { useState, useContext } from 'react';
import { httpRequest } from '../../utils/apiServices';
import { useNavigate } from 'react-router-dom';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { useModal, InfoModal } from '../../contexts/ModalContext';

// Styling
import { Form, Button } from 'react-bootstrap';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const [loading, setLoading] = useState(false);
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
    const response = await httpRequest('POST', '/login', formData, setLoading);
    console.log('🚀 ~ file: Login.jsx:32 ~ handleSubmit ~ response:', response);

    if (response.error) {
      // Handle error and show modal
      showModal(
        <InfoModal
          show={true}
          handleClose={closeModal}
          title={response.error}
          body={response.message}
          primaryAction={closeModal}
        />
      );
    } else {
      // Set response and the user's name in the AuthContext
      const name = response.user.name;
      login(name);
      // Save the JWT token in localStorage
      const token = response.token;
      localStorage.setItem('token', token);
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
      {loading && <p>Authenticating user...</p>}
    </main>
  );
}
