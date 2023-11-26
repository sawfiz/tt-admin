// Libraries
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// Components
import DynamicList from '../DynamicList';

// Utilities
import { httpRequest } from '../../utils/apiServices';

// Styling
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function AttendanceForm() {
  const navigate = useNavigate();

  // States
  const [today, setToday] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  console.log(
    '🚀 ~ file: AttendanceForm.jsx:16 ~ AttendanceForm ~ today:',
    today
  );
  const [formData, setFormData] = useState({
    date: today,
    venue: '',
    coachList: [],
    attendeeList: [],
  });
  const { date, venue, coachList, attendeeList } = formData;

  const fetchDataOnChange = async (day, std) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') fetchDataOnChange(value); // value is the new date
    if (name === 'venue') fetchDataOnChange(date, value); // value is the new venue
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addCoach = (id) => {
    setFormData({ ...formData, coachList: [...coachList, id] });
  };

  const removeCoach = (id) => {
    const filteredList = coachList.filter((attendeeId) => attendeeId !== id);
    setFormData({ ...formData, coachList: filteredList });
  };

  const addAttendee = (id) => {
    setFormData({ ...formData, attendeeList: [...attendeeList, id] });
  };

  const removeAttendee = (id) => {
    const filteredList = attendeeList.filter((attendeeId) => attendeeId !== id);
    setFormData({ ...formData, attendeeList: filteredList });
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  const handleOverwrite = async () => {};

  const handleClose = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Perform POST request:', formData);
    const response = await httpRequest('POST', '/api/attendances', formData);
    if (response.error) {
      console.log("🚀 ~ file: AttendanceForm.jsx:74 ~ handleSubmit ~ response.error:", response.error)

      // handleFormErrors(response);
    } else {
      // Handle success, reset form, or navigate to a different page
      console.log('Athlete created successfully:', response);
      navigate('/manage-athletes');
    }
  };

  const coaches = (
    <DynamicList
      fetchDataFunction={() => httpRequest('GET', '/api/users', null, 'coach')}
      dataKey="users"
      list={coachList}
      addItem={addCoach}
      removeItem={removeCoach}
      showCheckboxes={true}
      showFilter={false}
    />
  );

  const athletes = (
    <DynamicList
      fetchDataFunction={() => httpRequest('GET', '/api/athletes')}
      dataKey="athletes"
      list={attendeeList}
      addItem={addAttendee}
      removeItem={removeAttendee}
      showCheckboxes={true}
      showFilter={true}
    />
  );

  return (
    <main>
      <h2>New Attendance</h2>
      <form>
        <InputGroup className="mb-3">
          <InputGroup.Text required id="basic-addon1">
            Date
          </InputGroup.Text>
          <Form.Control
            type="date"
            name="date"
            // value needs to be in yyyy-mm-dd format
            value={date}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Venue </InputGroup.Text>
          <Form.Select
            required
            name="venue"
            value={venue}
            onChange={handleChange}
          >
            <option></option>
            <option value="Bukit Gombak">Bukit Gombak</option>
            <option value="Choa Chu Kang">Choa Chu Kang</option>
            <option value="Clmenti">Clementi</option>
          </Form.Select>
        </InputGroup>

        <hr></hr>
        <h4>Coaches</h4>
        {coaches}

        <hr></hr>
        <h4>Athletes</h4>
        {athletes}

        <div className="m-4 flex justify-around">
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
      {/* <SubmitAttendanceModal
      show={show}
      handleClose={handleClose}
      handleOverwrite={handleOverwrite}
    /> */}
      {/* A div at the end of page to make sure Foot shows properly */}
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}
