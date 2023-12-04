// Libraries
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { useModal, InfoModal } from '../../contexts/ModalContext';

// Utilities
import { httpRequest } from '../../utils/apiServices';

// Styling
import { Button, Form, InputGroup } from 'react-bootstrap';

const AthleteForm = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  // State variables
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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
    avatar: null,
  });

  // If an id is provided in the route, GET data of the athlete
  useEffect(() => {
    const fetchData = async () => {
      const response = await httpRequest('GET', `/api/athletes/${id}`);
      console.log(
        '🚀 ~ file: AthleteForm.jsx:48 ~ fetchData ~ response:',
        response
      );

      if (response.error) {
        displayErrorModal(response);
      } else {
        setFormData(response.data.athlete);
      }
    };

    if (id) fetchData();
    setLoading(false);
  }, [id]); // Include id as it is used in the useEffect

  // Display error modal
  const displayErrorModal = (response) => {
    // Display the model. If error is token timed out, click on button logs the user out.
    showModal(
      <InfoModal
        show={true}
        handleClose={closeModal}
        title={response.error}
        body={response.message}
        primaryAction={response.status === 403 ? handleLogout : closeModal}
      />
    );
    setErrorMsg(`${response.error} ${response.errorMsg}`);
  };

  // Logout if token expired
  const handleLogout = async () => {
    await httpRequest('POST', '/logout');
    closeModal();
    logout();
    navigate('/login');
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'file') {
      const file = event.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: file, // Save the selected file to state
      }));
    } else {
      const inputValue = type === 'checkbox' ? checked : value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      updateAthlete();
    } else {
      createAthlete();
    }
  };

  const createAthlete = async () => {
    // Logic for creating a new athlete
    console.log('Perform POST request:', formData);

    const response = await httpRequest(
      'POST',
      '/api/athletes',
      convertToFormData(formData)
    );
    console.log("🚀 ~ file: AthleteForm.jsx:121 ~ createAthlete ~ response:", response)
    if (response.error) {
      handleFormErrors(response);
    } else {
      // Handle success, reset form, or navigate to a different page
      console.log('Athlete created successfully:', response);
      navigate('/manage-athletes');
    }
  };

  const updateAthlete = async () => {
    // Logic for updating an existing athlete
    console.log('Perform PUT request:', formData);

    const response = await httpRequest(
      'PUT',
      `/api/athletes/${id}`,
      convertToFormData(formData)
    );
    if (response.error) {
      handleFormErrors(response);
    } else {
      // Handle success, reset form, or navigate to a different page
      console.log('Athlete updated successfully:', updateAthlete);
      navigate(`/athletes/${id}`);
    }
  };

  const convertToFormData = (data) => {
    const formDataToSend = new FormData();

    // Append each key-value pair from formData to FormData instance
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    return formDataToSend;
  };

  const handleFormErrors = (response) => {
    if (response.status === 400) {
      // Handle backend validation validationErrors
      // const validationErrors = JSON.parse(response).errors.map((err) => ({
      const validationErrors = JSON.parse(response.message).errors.map((err) => ({
        path: err.path,
        msg: err.msg,
      }));
      setValidationErrors(validationErrors);
    } else {
      // Clear validation errors displayed on page
      setValidationErrors([]);
      // Handle other errors
      displayErrorModal(response);
    }
  };

  // To show backend validation error for an input field
  const showValidationError = (fieldName) => {
    return validationErrors.map((error, index) => {
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

  const handleCancel = () => {
    if (title === 'Create') {
      navigate('/manage-athletes');
    }
    navigate(`/athletes/${id}`);
    // In case of Update, the cancel button is automatically handled
  };

  return (
    <main>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
        {showValidationError('first_name')}

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
        {showValidationError('last_name')}

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
        {showValidationError('gender')}

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
        {showValidationError('birthdate')}

        <InputGroup className="mb-2">
          <InputGroup.Text>Photo </InputGroup.Text>
          <Form.Control
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
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
        {showValidationError('mobile')}

        <InputGroup className="mb-3">
          <InputGroup.Text id="email">Email</InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </InputGroup>
        {showValidationError('email')}

        <InputGroup className="mb-3">
          <InputGroup.Text id="school">School</InputGroup.Text>
          <Form.Control
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
          />
        </InputGroup>
        {showValidationError('school')}

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
