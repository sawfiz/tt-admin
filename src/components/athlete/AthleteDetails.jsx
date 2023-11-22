// Libraries
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { useModal, InfoModal } from '../../contexts/ModalContext';

// Utilities
import { httpGET, httpPOST, deleteData } from '../../utils/apiServices';

// Styling
import { Button, Modal } from 'react-bootstrap';

export default function AthleteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpGET(
        `api/athletes/${id}`,
        'athlete'
      );
      if (response.error) {
        // Token expired error, log user out
        if (response.error === 'TokenExpiredError') {
          showModal(
            <InfoModal
              show={true}
              handleClose={closeModal}
              title="Token Expired"
              body={response.errorMsg}
              primaryAction={handleLogout}
            />
          );
        } else {
          // Other errors, ask user to contact support
          setErrorMsg(`${response.error}.  ${response.errorMsg}`);
          showModal(
            <InfoModal
              show={true}
              handleClose={closeModal}
              title={response.error}
              body={response.errorMsg}
              primaryAction={closeModal}
            />
          );
        }
      } else setData(response);
    };

    fetchData();
    setLoading(false);
  }, [id]); // Include id as it is used in the useEffect

  // Logout if token expired
  const handleLogout = async () => {
    const loggedout = await httpPOST('logout');
    if (loggedout.message === 'success') {
      console.log(
        '🚀 ~ file: Logout.jsx:11 ~ handleSubmit ~ logout:',
        loggedout.message
      );
      closeModal();
      logout();
      navigate('/login');
    }
  };

  const imgSrc = data ?
    data.photoURL ||
    (data.gender === 'male'
      ? '/images/boy.png'
      : data.gender === 'female'
      ? '/images/girl.png'
      : '/images/unknown.png') : null;

  // Function to open the delete confirmation modal
  const handleshowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  // Function to close the delete confirmation modal
  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      // Send API request to delete the athlete
      await deleteData(`/api/athletes/${id}`);
      // Redirect or perform any other action upon successful deletion
      navigate('/manage-athletes'); // Redirect to athletes page after deletion
    } catch (error) {
      console.error('Error deleting athlete:', error);
      // Handle error state or show an error message to the user
    }
  };

  const handleDeleteConfirmation = () => {
    handleCloseModal(); // Close the modal
    handleDelete(); // Trigger the delete function
  };
  return (
    <main>
      <Link to="/manage-athletes">
        <Button variant="outline-secondary">⬅️ Atheltes</Button>
      </Link>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : errorMsg ? (
          <p className="text-danger">{errorMsg}</p>
        ) : ( data &&
           (
            <div>
              {/* Athlete full name */}
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
                <div className=" font-bold">Gender</div>
                <div>{data.gender}</div>
                <div className=" font-bold">Birthdate</div>
                <div>
                  {data.birthdate
                    ? format(new Date(data.birthdate), 'yyyy-MM-dd')
                    : ''}
                </div>
                <div className=" font-bold">Mobile</div>
                <div>{data.mobile}</div>
                <div className=" font-bold">Email</div>
                <div>{data.email}</div>
                <div className=" font-bold">School</div>
                <div>{data.school}</div>
                <div className=" font-bold">Father</div>
                <div>{data.father}</div>
                <div className=" font-bold">Mother</div>
                <div>{data.mother}</div>
              </div>

              {/* Buttons */}
              <div className="flex justify-around">
                <Link to={`/athlete/update/${id}`}>
                  <Button variant="primary">Update</Button>
                </Link>
                <Button variant="danger" onClick={handleshowDeleteModal}>
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
