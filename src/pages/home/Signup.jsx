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
    first_name: '',
    last_name: '',
    gender: '',
  });
  const [match, setMatch] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (name === 'password1') {
      setFormData((prevFormData) => ({ ...prevFormData, password: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { password1, password2 } = formData;
    setMatch(password1 === password2);

    if (password1 === password2) {
      try {
        const createUser = await postData('/api/users', formData);

        // TODO: need to deal with 500, MongoDB is down
        if (createUser.errors) {
          // Handle backend validation errors
          const errors = createUser.errors.errors.map((err) => ({
            path: err.path,
            msg: err.msg,
          }));
          setErrors(errors);
        } else {
          // Handle success, reset form, or navigate to a different page
          console.log('User created successfully:', createUser);
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
      <h3 className="mb-4">Signup</h3>
      <Form onSubmit={handleSubmit}>
        <div className="flex justify-between w-80 items-center">
          <div>
            <label>First name</label>
          </div>
          <input
            type="text"
            name="first_name"
            placeholder="Usain"
            value={formData.first_name}
            onChange={handleChange}
            required
            autoComplete="true"
            className="px-1 mb-2 w-40"
          />
        </div>
        {showError('first_name')}

        <div className="flex justify-between w-80 items-center">
          <div>
            <label>Last name</label>
          </div>
          <input
            type="text"
            name="last_name"
            placeholder="Bolt"
            value={formData.last_name}
            onChange={handleChange}
            required
            autoComplete="true"
            className="px-1 mb-2 w-40"
          />
        </div>
        {showError('last_name')}

        <div className="flex justify-between w-80 items-center">
          <div>
            <label>Gender</label>
          </div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="p-1 ml-4 mb-2 w-20"
          >
            <option value="">-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {showError('gender')}

        <hr />

        <div className="flex justify-between w-80 items-center">
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
            className="px-1 mb-2 w-40"
          />
        </div>
        {showError('username')}

        <div className="flex justify-between w-80 items-center">
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
            className="px-1 mb-2 w-40"
          />
        </div>
        {showError('password')}

        <div className="flex justify-between w-80 items-center">
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
            className="px-1 mb-2 w-40"
          />
        </div>

        {match ? '' : <p className="text-danger">Passwords do not match.</p>}

        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </main>
  );
}
