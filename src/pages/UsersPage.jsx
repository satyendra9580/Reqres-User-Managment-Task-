import React, { useEffect } from 'react';
import UserList from '../components/users/UserList';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../utils/auth';

const UsersPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="navbar">
        <h3>Reqres User Management</h3>
        <button 
          className="btn btn-danger" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <UserList />
    </>
  );
};

export default UsersPage; 