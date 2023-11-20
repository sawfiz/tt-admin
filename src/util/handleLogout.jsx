// Libraries
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import { AuthContext } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';

// Utilities
import { httpGET } from './apiServices';

export const handleLogout = async () =>{
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { closeModal } = useModal();

  try {

    const loggedout = await httpGET('logout');
    if (loggedout.message==='success') {
      console.log('🚀 ~ file: Logout.jsx:11 ~ handleSubmit ~ logout:', loggedout.message);
      closeModal();
      logout();
      navigate('/login');
    }
  } catch (error) {
    console.log("Error logging out.");
  }
}