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

const UserForm = ({ title }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  // State variables
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
    gender: '',
    mobile: '',
    email: '',
    role: '',
  });

  const [match, setMatch] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // If an id is provided in the route, GET data of the user
  useEffect(() => {
    const fetchData = async () => {
      const response = await httpRequest(
        'GET',
        `/api/users/${id}`,
        null,
        'user'
      );

      if (response.error) {
        displayErrorModal(response);
      } else {
        setFormData(response.data.user);
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

    if (name === 'password1') {
      setFormData((prevFormData) => ({ ...prevFormData, password: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    console.log(
      '🚀 ~ file: Signup.jsx:48 ~ handleSubmit ~ formData:',
      formData
    );
    const { password1, password2 } = formData;
    const passwordMatch = password1 === password2;
    setMatch(passwordMatch);

    if (passwordMatch) {
      if (id) {
        updateuser();
      } else {
        createuser();
      }
    }
  };

  const createuser = async () => {
    // Logic for creating a new user
    console.log('Perform POST request:', formData);
    const response = await httpRequest('POST', '/api/users', formData);
    if (response.error) {
      handleFormErrors(response);
    } else {
      // Handle success, reset form, or navigate to a different page
      console.log('user created successfully:', response);
      navigate('/login');
    }
  };

  const updateuser = async () => {
    // Logic for updating an existing user
    console.log('Perform PUT request:', formData);
    const response = await httpRequest('PUT', `/api/users/${id}`, formData);
    if (response.error) {
      handleFormErrors(response);
    } else {
      // Handle success, reset form, or navigate to a different page
      console.log('user updated successfully:', updateuser);
      navigate(`/users/${id}`);
    }
  };

  const handleFormErrors = (response) => {
    console.log(
      '🚀 ~ file: userForm.jsx:130 ~ handleFormErrors ~ response:',
      response
    );
    if (response.status === 400) {
      // Handle backend validation validationErrors
      // const validationErrors = JSON.parse(response).errors.map((err) => ({
      const errors = JSON.parse(response.error);
      console.log(
        '🚀 ~ file: userForm.jsx:135 ~ //validationErrors ~ errors:',
        errors
      );
      const validationErrors = JSON.parse(response.error).errors.map((err) => ({
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
      navigate('/');
    }
    navigate(`/users/${id}`);
    // In case of Update, the cancel button is automatically handled
  };

  return (
    <main>
      <Form onSubmit={handleSubmit}>
        <h2>{title} User</h2>
        <div className="flex justify-between w-80 items-center mb-2">
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
            className="px-1 w-40"
          />
        </div>
        {showValidationError('first_name')}

        <div className="flex justify-between w-80 items-center mb-2">
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
            className="px-1 w-40"
          />
        </div>
        {showValidationError('last_name')}

        <div className="flex justify-between w-80 items-center mb-2">
          <div>
            <label>Gender</label>
          </div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="p-1 ml-4 w-20"
          >
            <option value="">-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {showValidationError('gender')}

        <div className="flex justify-between w-80 items-center mb-2">
          <div>
            <label>Mobile</label>
          </div>
          <input
            type="text"
            name="mobile"
            placeholder="88888888"
            value={formData.mobile}
            onChange={handleChange}
            required
            autoComplete="true"
            className="px-1 w-40"
          />
        </div>
        {showValidationError('mobile')}

        <div className="flex justify-between w-80 items-center mb-2">
          <div>
            <label>Email</label>
          </div>
          <input
            type="text"
            name="email"
            placeholder="usain.bolt@gmail.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="true"
            className="px-1 w-52"
          />
        </div>
        {showValidationError('email')}

        {title === 'Create' && (
          <div>
            <hr />
            <div className="flex justify-between w-80 items-center mb-2">
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
                className="px-1 w-40"
              />
            </div>
            {showValidationError('username')}
            <div className="flex justify-between w-80 items-center mb-2">
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
                className="px-1 w-40"
              />
            </div>
            {showValidationError('password')}
            <div className="flex justify-between w-80 items-center mb-2">
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
                className="px-1 w-40"
              />
            </div>
            {match ? (
              ''
            ) : (
              <p className="text-danger">Passwords do not match.</p>
            )}
          </div>
        )}

        {title==="Update" && (<div>
          <div className="flex justify-between w-80 items-center mb-2">
            <div>
              <label>Role</label>
            </div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="p-1 ml-4 w-20"
            >
              <option value="">-</option>
              <option value="visitor">Visitor</option>
              <option value="parent">Parent</option>
              <option value="coach">Coach</option>
            </select>
          </div>
        </div>)}

        <div className="flex justify-around">
          <Button type="submit">{title}</Button>
          <Button variant="secondary" type="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
      {loading && <p>Submitting...</p>}
    </main>
  );
};

export default UserForm;
