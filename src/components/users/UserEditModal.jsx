import React, { useState, useEffect } from 'react';
import { updateUser } from '../../services/api';
import { toast } from 'react-toastify';

const indianFirstNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", 
  "Reyansh", "Ayaan", "Divya", "Neha", "Ananya", 
  "Diya", "Saanvi", "Rajesh", "Sunil", "Vikram"
];

const indianLastNames = [
  "Sharma", "Patel", "Singh", "Kumar", "Gupta", 
  "Verma", "Joshi", "Rao", "Malhotra", "Reddy", 
  "Kapoor", "Agarwal", "Shah", "Mehta", "Chopra"
];

const UserEditModal = ({
  user,
  show,
  onClose,
  onUpdateSuccess
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionType, setSuggestionType] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await updateUser(user.id, {
        first_name: firstName,
        last_name: lastName,
        email: email
      });
      
      const updatedUser = {
        ...user,
        first_name: firstName,
        last_name: lastName,
        email: email
      };
      
      onUpdateSuccess(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const selectName = (name, type) => {
    if (type === 'first') {
      setFirstName(name);
    } else {
      setLastName(name);
    }
    setShowSuggestions(false);
  };

  const showNameSuggestions = (type) => {
    setSuggestionType(type);
    setShowSuggestions(true);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2>Edit User</h2>
        <p style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
          Note: Since Reqres is a mock API, changes are client-side only and won't persist on the server.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="btn btn-sm" 
                style={{ position: 'absolute', right: '5px', top: '12px', padding: '2px 8px', fontSize: '12px' }}
                onClick={() => showNameSuggestions('first')}
              >
                Suggestions
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="btn btn-sm" 
                style={{ position: 'absolute', right: '5px', top: '12px', padding: '2px 8px', fontSize: '12px' }}
                onClick={() => showNameSuggestions('last')}
              >
                Suggestions
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {showSuggestions && (
            <div className="suggestions-container" style={{ 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              padding: '10px', 
              borderRadius: '4px',
              maxHeight: '150px',
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                Select a {suggestionType === 'first' ? 'first' : 'last'} name:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {(suggestionType === 'first' ? indianFirstNames : indianLastNames).map((name, index) => (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-sm"
                    style={{ margin: '3px', padding: '3px 8px', fontSize: '12px' }}
                    onClick={() => selectName(name, suggestionType === 'first' ? 'first' : 'last')}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              className="btn" 
              onClick={onClose}
              style={{ marginRight: '10px', marginBottom: '10px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal; 