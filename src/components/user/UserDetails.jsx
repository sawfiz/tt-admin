// Libraries
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';


// Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { useModal, InfoModal } from '../../contexts/ModalContext';

// Utilities
import { httpRequest } from '../../utils/apiServices';

// Styling
import { Button, Modal } from 'react-bootstrap';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpRequest(
        'GET',
        `/api/users/${id}`,
        null,
        'user'
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

  const imgSrc =
    data.photoURL ||
    (data.gender === 'male'
      ? '/images/man.png'
      : data.gender === 'female'
      ? '/images/woman.png'
      : '/images/unknown.png');

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
      // Send API request to delete the user
      await httpRequest('DELTET', `/api/users/${id}`);
      // Redirect or perform any other action upon successful deletion
      navigate('/manage-users'); // Redirect to users page after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error state or show an error message to the user
    }
  };

  const handleDeleteConfirmation = () => {
    handleCloseModal(); // Close the modal
    handleDelete(); // Trigger the delete function
  };
  return (
    <main>
      <Link to="/manage-visitors">
        <Button variant="outline-secondary">⬅️ Visitors</Button>
      </Link>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <div>
              {/* user full name */}
              <h2 className="mt-24 font-bold text-xl">{data.name}</h2>
              {/* Profile photo */}
              <div className=" absolute top-4 right-[0.5rem] w-28 h-28 overflow-hidden">
                <img
                  className="w-full h-full object-center object-cover rounded-lg "
                  src={imgSrc}
                  alt="profile"
                />
              </div>
              {/* Personal details */}
              <div className="outline-dashed outline-2 outline-pink-300 p-2 grid grid-cols-[1fr_2fr] my-2">
                <div className=" font-bold">Active</div>
                <div>{data.active ? '✅' : '❌'}</div>
                <div className=" font-bold">Username</div>
                <div>{data.username}</div>
                <div className=" font-bold">Mobile</div>
                <div>{data.mobile}</div>
                <div className=" font-bold">Email</div>
                <div>{data.email}</div>
                <div className=" font-bold">Gender</div>
                <div>{data.gender}</div>
                <div className=" font-bold">Role</div>
                <div>{data.role}</div>
              </div>

              {/* Buttons */}
              <div className="flex justify-around">
                <Link to={`/user/update/${id}`}>
                  <Button variant="primary">Update</Button>
                </Link>
                <Button variant="danger" onClick={handleShowDeleteModal}>
                  Delete
                </Button>
              </div>
            </div>
          )
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
    </main>
  );
}
