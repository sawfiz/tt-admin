// Libraries
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Contexts
import { AuthContext } from '../contexts/AuthContext';
import { useModal, InfoModal } from '../contexts/ModalContext';

// Components
import AtheletPersonalDetails from './athlete/AtheletPersonalDetails';
import VisitorPersonalDetails from './user/VisitorPersonalDetails';

// Utilities
import { httpRequest } from '../utils/apiServices';

// Styling
import { Button, Modal } from 'react-bootstrap';

export default function DynamicDetails({ type, id }) {
  const manageType = type === 'user' ? 'visitor' : type;
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpRequest(
        'GET',
        `/api/${type}s/${id}`,
        null,
        type
      );

      if (response.error) {
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
      } else {
        setData(response);
      }
    };

    fetchData();
    setLoading(false);
  }, [id]); // Include id as it is used in the useEffect

  // Logout if token expired
  const handleLogout = async () => {
    await httpRequest('POST', '/logout');
    closeModal();
    logout();
    navigate('/login');
  };

  // Function to open the delete confirmation modal
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  // Function to close the delete confirmation modal
  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      // Send API request to delete the athlete
      await httpRequest('DELETE', `/api/${type}s/${id}`);
      // Redirect or perform any other action upon successful deletion
      navigate(`/manage-${manageType}s`); // Redirect to athletes page after deletion
    } catch (error) {
      console.error('Error deleting athlete:', error);
      // Handle error state or show an error message to the user
    }
  };

  const handleDeleteConfirmation = () => {
    handleCloseModal(); // Close the modal
    handleDelete(); // Trigger the delete function
  };

  let personalDetails;
  if (manageType === 'athlete')
    personalDetails = (
      <AtheletPersonalDetails
        id={id}
        data={data}
        type={type}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    );
  if (manageType === 'visitor')
    personalDetails = (
      <VisitorPersonalDetails
        id={id}
        data={data}
        type={type}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    );

  return (
    <div>
      <Link to={`/manage-${manageType}s`}>
        <Button variant="outline-secondary">⬅️ {`${manageType}s`}</Button>
      </Link>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : errorMsg ? (
          <p className="text-danger">{errorMsg}</p>
        ) : (
          data && personalDetails
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this athlete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
