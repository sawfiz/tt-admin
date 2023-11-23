import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import { AuthContext } from '../contexts/AuthContext';
import { useModal, InfoModal } from '../contexts/ModalContext';

// Utilities
import { httpGET, httpPOST } from './apiServices';

export const HandleFetchError = (
  response,
  setErrorMsg,
  setData
) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  if (response.error) {
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
      setErrorMsg(`${response.error}. ${response.errorMsg}`);
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
  } else {
    setData(response);
  }

  // Logout if token expired
  const handleLogout = async () => {
    const loggedout = await httpPOST('logout');
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
    closeModal();
    logout();
    navigate('/login');
  };
};
