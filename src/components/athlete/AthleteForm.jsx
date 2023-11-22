// Libraries
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { httpGET, httpPOST, putData } from '../../utils/apiServices';
import { format } from 'date-fns';

// Styling
import { Button, Form, InputGroup } from 'react-bootstrap';

const AthleteForm = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    birthdate: new Date(),
    father: '',
    mother: '',
    mobile: '',
    email: '',
    school: '',
    active: true,
    photoUrl: '',
  });

  // If an id is provided in the route, GET data of the athlete
  useEffect(() => {
    const updateData = (newData) => {
      setFormData(newData); // Function to update 'data' state
    };

    const fetchData = async () => {
      try {
        await httpGET(`api/athletes/${id}`, updateData, setLoading, 'athlete');
        // 'athlete' is the specific key for the data in the response
      } catch (error) {
        // Handle error if needed
      }
    };

    if (id) fetchData(); // Only fetch data if id is in the route
  }, [id]); // Include id as it is used in the useEffect

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let inputValue;
    if (type === 'checkbox') {
      inputValue = checked;
    } else {
      inputValue = value;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      // Logic for updating an existing athlete
      console.log('Perform PUT request:', formData);
      try {
        const updateAthlete = await putData(`/api/athletes/${id}`, formData);
        if (updateAthlete.errors) {
          // Handle backend validation errors
          const errors = updateAthlete.errors.errors.map((err) => ({
            path: err.path,
            msg: err.msg,
          }));
          setErrors(errors);
        } else {
          // Handle success, reset form, or navigate to a different page
          console.log('Athlete created successfully:', updateAthlete);
          navigate(`/athlete/${id}`);
        }
      } catch (error) {
        // General errors
        // Handle error state or show an error message to the user
      }
    } else {
      // Logic for creating a new athlete
      console.log('Perform POST request:', formData);
      try {
        const createAthlete = await httpPOST('/api/athletes', formData);
        if (createAthlete.errors) {
          // Handle backend validation errors
          const errors = createAthlete.errors.errors.map((err) => ({
            path: err.path,
            msg: err.msg,
          }));
          setErrors(errors);
        } else {
          // Handle success, reset form, or navigate to a different page
          console.log('Athlete created successfully:', createAthlete);
          navigate('/manage-athletes');
        }
      } catch (error) {
        // General errors
        // Handle error state or show an error message to the user
      }
    }
  };

  const handleCancel = () => {
    if (title === 'Create') {
      navigate('/manage-athletes');
    }
    // In case of Update, the cancel button is automatically handled
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
      <Form onSubmit={handleSubmit}>
        <h2>{title} Athlete</h2>

        {/* Input fields */}
        <InputGroup className="mb-3">
          <InputGroup.Text>First Name</InputGroup.Text>
          <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            autoFocus
          />
        </InputGroup>
        {showError('first_name')}

        <InputGroup className="mb-3">
          <InputGroup.Text>Last Name</InputGroup.Text>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </InputGroup>
        {showError('last_name')}

        <InputGroup className="mb-3">
          <InputGroup.Text>Gender</InputGroup.Text>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </InputGroup>
        {showError('gender')}

        <InputGroup className="mb-3">
          <InputGroup.Text id="birthdate">Birthdate</InputGroup.Text>
          <Form.Control
            type="date"
            name="birthdate"
            value={
              formData.birthdate
                ? format(new Date(formData.birthdate), 'yyyy-MM-dd')
                : format(new Date(), 'yyyy-MM-dd')
            }
            onChange={handleChange}
            required
          />
        </InputGroup>
        {showError('birthdate')}

        <InputGroup className="mb-3">
          <InputGroup.Text id="mobile">Mobile</InputGroup.Text>
          <Form.Control
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </InputGroup>
        {showError('mobile')}

        <InputGroup className="mb-3">
          <InputGroup.Text id="email">Email</InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </InputGroup>
        {showError('email')}

        <InputGroup className="mb-3">
          <InputGroup.Text id="school">School</InputGroup.Text>
          <Form.Control
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
          />
        </InputGroup>
        {showError('school')}

        <InputGroup className="mb-3">
          <InputGroup.Text id="active">Active</InputGroup.Text>
          <Form.Check
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
        </InputGroup>

        <div className="flex justify-around">
          <Button type="submit">{title}</Button>
          <Button variant="secondary" type="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </main>
  );
};

export default AthleteForm;
