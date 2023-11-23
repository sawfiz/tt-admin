import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { useModal, InfoModal } from '../../contexts/ModalContext';

import { httpRequest } from '../../utils/apiServices';

import { Button } from 'react-bootstrap';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedout = await httpRequest('POST', '/logout');
    if (!loggedout) {
      // Handle error and show modal
      showModal(
        <InfoModal
          show={true}
          handleClose={closeModal}
          title="Connection Error"
          body="Error connecting to the server.  Please contact support."
          primaryAction={closeModal}
        />
      );
    }
    // Logout in the frontend in any case
    logout();
    navigate('/');
  };
  return (
    <main>
      <p>Are you sure you want to log out?</p>
      <Button onClick={handleSubmit}>Logout</Button>
    </main>
  );
}
