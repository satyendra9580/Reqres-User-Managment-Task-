import React from 'react';
import UserList from '../components/users/UserList';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const UsersPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px 20px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3>Reqres User Management</h3>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <UserList />
    </>
  );
};

export default UsersPage; 