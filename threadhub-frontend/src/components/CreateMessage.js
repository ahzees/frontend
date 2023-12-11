// src/components/CreateMessage.js
import React, { useState } from 'react';
import { getAuthToken } from './auth';

const CreateMessage = ({ threadId, onClose, onMessageCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://django-server-production-feda.up.railway.app/thread/${threadId}/message/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        // Reset content and notify parent component
        setContent('');
        onMessageCreated();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error creating message');
      }
    } catch (error) {
      console.error('Error during create message:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Message</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="messageContent">Message Content:</label>
        <textarea
          id="messageContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Send Message</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default CreateMessage;
