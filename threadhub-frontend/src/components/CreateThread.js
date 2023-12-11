// src/components/CreateThread.js
import React, { useState } from 'react';
import { getAuthToken } from './auth';
import { useNavigate } from 'react-router-dom';

const CreateThread = () => {
  const [threadName, setThreadName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://django-server-production-feda.up.railway.app/thread/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: threadName,
        }),
      });

      if (response.ok) {
        // Ваша логіка після успішного створення треду

        // Переадресація на сторінку тредів
        navigate('/threads');
        
        // Reload the page
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error creating thread');
      }
    } catch (error) {
      console.error('Error during create thread:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Thread</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="threadName">Thread Name:</label>
        <input
          type="text"
          id="threadName"
          value={threadName}
          onChange={(e) => setThreadName(e.target.value)}
          required
        />
        <button type="submit">Create Thread</button>
      </form>
    </div>
  );
};

export default CreateThread;
