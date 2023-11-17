// Libraries
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Utilities
import { postData } from '../../util/apiServices';

// Styling
import { Form, Button } from 'react-bootstrap';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const [match, setMatch] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { password1, password2 } = formData;
    setMatch(password1 === password2);

    if (password1 === password2) {
      try {
        const dataToSend = {
          username: formData.username,
          password: formData.password1,
        };
        const createUser = await postData('/api/users', dataToSend);
        if (createUser.errors) {
          // Handle backend validation errors
          const errors = createUser.errors.errors.map((err) => ({
            path: err.path,
            msg: err.msg,
          }));
          setErrors(errors);
        } else {
          // Handle success, reset form, or navigate to a different page
          console.log('Athlete created successfully:', createUser);
          navigate('/');
        }
      } catch (error) {
        // General errors
        // Handle error state or show an error message to the user
      }
    }
  };

  // To show backend validation error for an input field
  const showError = (fieldName) => {
    return errors.map((error, index) => {
      if (error.path === fieldName) {
        return (
          <p key={index} style={{ color: 'red' }}>
            {error.msg}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <main>
      <h3>Signup</h3>
      <Form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Username</label>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="true"
            className="px-1 my-2 w-40"
          />
        </div>
        {showError('username')}

        <div>
          <div>
            <label>New password</label>
          </div>
          <input
            type="password"
            name="password1"
            placeholder="Password"
            value={formData.password1}
            onChange={handleChange}
            required
            autoComplete="true"
            className="px-1 my-2 w-40"
          />
        </div>
        {showError('password')}

        <div>
          <div>
            <label>Re-enter password</label>
          </div>
          <input
            type="password"
            name="password2"
            placeholder="Password"
            value={formData.password2}
            onChange={handleChange}
            required
            autoComplete="true"
            className="px-1 my-2 w-40"
          />
        </div>

        {match ? '' : <p className="text-danger">Passwords do not match.</p>}

        <Button type="submit" className="mt-2 py-0">
          Signup
        </Button>
      </Form>
    </main>
  );
}
