import React, { createContext, useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  // Function to show the modal
  const showModal = (content) => {
    setModalContent(content);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalContent}
    </ModalContext.Provider>
  );
};

// Reusable modal component
export const CustomModal = ({ show, handleClose, title, body, primaryAction }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={primaryAction}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Hook to access modal context and functions
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};