// src/components/AddUserToThread.js
import React, { useState } from 'react';

const AddUserToThread = ({ threadId, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://0.0.0.0:8000/thread/${threadId}/add_members/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          members: [email],
        }),
      });

      if (response.ok) {
        // Ваша логіка після успішного додавання користувача

        // Закриваємо вікно
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error adding user to thread');
      }
    } catch (error) {
      console.error('Error during add user to thread:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add User to Thread</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="userEmail">User Email:</label>
        <input
          type="email"
          id="userEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserToThread;
