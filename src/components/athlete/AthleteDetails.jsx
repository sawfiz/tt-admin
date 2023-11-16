// Libraries
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { getData, deleteData } from '../../util/apiServices';

// Styling
import { Button, Modal } from 'react-bootstrap';

export default function AthleteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateData = (newData) => {
      setData(newData); // Function to update 'data' state
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

  const imgSrc =
    data.photoURL ||
    (data.gender === 'male'
      ? '/images/boy.png'
      : data.gender === 'female'
      ? '/images/girl.png'
      : '/images/unknown.png');

  // Function to open the delete confirmation modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Function to close the delete confirmation modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      // Send API request to delete the athlete
      await deleteData(`/api/athlete/${id}`);
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
        ) : (
          data && (
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
                <div>{format(new Date(data.birthdate), 'yyyy-MM-dd')}</div>
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
                <Button variant="danger" onClick={handleShowModal}>
                  Delete
                </Button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
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
