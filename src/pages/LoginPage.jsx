import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>User Management System</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage; 