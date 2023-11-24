// Libraries
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { useModal, InfoModal } from '../../contexts/ModalContext';

// Utilities
import { httpRequest } from '../../utils/apiServices';

// Styling
import { Form, Button } from 'react-bootstrap';

export default function Signup() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
    gender: '',
    mobile: '',
    email: ''
  });
  const [match, setMatch] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (name === 'password1') {
      setFormData((prevFormData) => ({ ...prevFormData, password: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("🚀 ~ file: Signup.jsx:48 ~ handleSubmit ~ formData:", formData)
    const { password1, password2 } = formData;
    const passwordMatch = password1 === password2;
    setMatch(passwordMatch);

    if (passwordMatch) {
      const response = await httpRequest('POST', '/api/users', formData);
      setLoading(false);
      console.log(
        '🚀 ~ file: Signup.jsx:48 ~ handleSubmit ~ response:',
        response
      );
      if (response.error) {
        handleFormErrors(response);
      } else {
        // Handle success, reset form, or navigate to a different page
        console.log('User created successfully:', response);
        navigate('/');
      }
    }
  };

  const handleFormErrors = (response) => {
    if (response.status === 400) {
      // Handle backend validation validationErrors
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

  return (
    <main>
      <h3 className="mb-4">Signup</h3>
      <Form onSubmit={handleSubmit}>
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

        {match ? '' : <p className="text-danger">Passwords do not match.</p>}

        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
      {loading && <p>Submitting...</p>}
    </main>
  );
}
