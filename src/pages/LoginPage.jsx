import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="container">
      <h1 style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        marginBottom: '20px',
        color: '#000080' // Navy Blue color
      }}>
      User Management <span style={{ color: '#138808' }}>System</span>
      </h1>
      
      <div style={{ textAlign: 'center', marginBottom: '30px', fontSize: '16px', color: '#555' }}>
        A simple and powerful way to manage your users with an Indian touch
      </div>
      
      <LoginForm />
      
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        padding: '20px', 
        fontSize: '14px',
        color: '#666'
      }}>
        <div>Built with React and Reqres API</div>
        <div style={{ marginTop: '10px' }}>
          <span style={{ color: '#FF9933', marginRight: '5px' }}>●</span>
          <span style={{ color: '#FFFFFF', marginRight: '5px' }}>●</span>
          <span style={{ color: '#138808' }}>●</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage; 