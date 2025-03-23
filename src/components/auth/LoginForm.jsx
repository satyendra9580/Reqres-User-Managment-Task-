import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../services/api';
import { setToken } from '../../utils/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const data = await login({ email, password });
      
      if (data.token) {
        setToken(data.token);
        toast.success('Login successful!');
        navigate('/users');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form" style={{ 
      background: 'linear-gradient(135deg, #fff, #f5f5f5)',
      borderTop: '4px solid #FF9933', 
      borderBottom: '4px solid #138808',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ 
          color: '#000080', 
          marginBottom: '10px'
        }}>
          Welcome to User Management
        </h2>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Experience the power of Indian innovation
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderRadius: '4px' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ borderRadius: '4px' }}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading}
          style={{ 
            width: '100%',
            backgroundColor: '#138808', 
            marginTop: '10px',
            padding: '10px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="helper-text" style={{ 
        marginTop: '20px', 
        fontSize: '14px',
        padding: '10px',
        backgroundColor: 'rgba(255, 153, 51, 0.1)', 
        borderRadius: '4px',
        border: '1px solid rgba(255, 153, 51, 0.3)'
      }}>
        <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Use these credentials:</p>
        <p style={{ margin: '0 0 5px 0' }}>Email: eve.holt@reqres.in</p>
        <p style={{ margin: '0' }}>Password: cityslicka</p>
      </div>
    </div>
  );
};

export default LoginForm; 