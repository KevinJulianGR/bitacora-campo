import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Ajusta la ruta según tu estructura

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;