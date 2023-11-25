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
    stadium: '',
    attendeeList: [],
  });
  const { date, stadium, attendeeList } = formData;

  const fetchDataOnChange = async (day, std) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') fetchDataOnChange(value); // value is the new date
    if (name === 'stadium') fetchDataOnChange(date, value); // value is the new stadium
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {};

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
          <InputGroup.Text id="basic-addon1">Stadium </InputGroup.Text>
          <Form.Select
            required
            // isInvalid={isStadiumEmpty}
            name="stadium"
            value={stadium}
            onChange={handleChange}
          >
            <option></option>
            <option value="Bukit Gombak">Bukit Gombak</option>
            <option value="Choa Chu Kang">Choa Chu Kang</option>
            <option value="Clmenti">Clementi</option>
          </Form.Select>
        </InputGroup>

        {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 outline-dashed outline-2 outline-pink-300 p-1'> */}
        {/* {athletes.map((athlete) => {
          return (
            <Attendee
              key={athlete.id}
              attendeeList={attendeeList}
              athlete={athlete}
              addAttendee={addAttendee}
              removeAttendee={removeAttendee}
            />
          );
        })} */}
        <DynamicList
          fetchDataFunction={() => httpRequest('GET', '/api/athletes')}
          dataKey="athletes"
          filterOptions={'name'}
          list = {attendeeList}
          addItem = {addAttendee}
          removeItem = {removeAttendee}
          showButtons={false}
        />
        {/* </div> */}

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
