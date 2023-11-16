// Libraries
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, postData, putData } from '../../util/apiServices';
import { format } from 'date-fns';

// Styling
import { Button, Form, InputGroup } from 'react-bootstrap';

const AthleteForm = ({ title }) => {
  const { id } = useParams();
  const today = new Date();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    birthdate: '',
    father: '',
    mother: '',
    mobile: '',
    email: '',
    school: '',
    active: true,
    photoUrl: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateData = (newData) => {
      setFormData(newData); // Function to update 'data' state
    };

    const getDataFromAPI = async () => {
      try {
        await getData(`api/athlete/${id}`, updateData, setLoading, 'athlete');
        // 'athlete' is the specific key for the data in the response
      } catch (error) {
        // Handle error if needed
      }
    };

    getDataFromAPI();
  }, [id]); // Include id as it is used in the useEffect

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      // Logic for updating an existing athlete
      console.log('Perform PUT request:', formData);
      try {
        const updateAthlete = await putData(`/api/athlete/${id}`, formData);
        console.log('Athlete updated successfully:', updateAthlete);

        // Handle success, reset form, or navigate to a different page
        navigate(`/athlete/${id}`);
      } catch (error) {
        // Handle error state or show an error message to the user
      }
      // Replace this with your actual update logic
    } else {
      // Logic for creating a new athlete
      console.log('Perform POST request:', formData);
      try {
        const createdAthlete = await postData('/api/athlete/create', formData);
        console.log('Athlete created successfully:', createdAthlete);

        // Handle success, reset form, or navigate to a different page
        navigate('/manage-athletes');
      } catch (error) {
        // Handle error state or show an error message to the user
      }
    }
  };

  return (
    <main>
      <Form onSubmit={handleSubmit}>
        {/* Input fields */}
        <h2>{title} Athlete</h2>

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

        <InputGroup className="mb-3">
          <InputGroup.Text id="birthdate">Birthdate</InputGroup.Text>
          <Form.Control
            type="date"
            name="birthdate"
            value={
              formData.birthdate
                ? format(new Date(formData.birthdate), 'yyyy-MM-dd')
                : format(today, 'yyyy-MM-dd')
            }
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="mobile">Mobile</InputGroup.Text>
          <Form.Control
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="email">Email</InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="school">School</InputGroup.Text>
          <Form.Control
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
          />
        </InputGroup>

        <Button type="submit">{title}</Button>
      </Form>
    </main>
  );
};

export default AthleteForm;
