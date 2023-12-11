// src/components/ThreadDetail.js
import React, { useState, useEffect } from 'react';
import './ThreadDetail.css';
import { useParams } from 'react-router-dom';
import CreateMessage from './CreateMessage';
import AddUserToThread from './AddUserToThread'; // Додаємо імпорт

const ThreadDetail = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [showCreateMessage, setShowCreateMessage] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false); // Додаємо стейт для вікна додавання користувача

  const fetchThread = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:8000/thread/${id}/view/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setThread(data);
      } else {
        console.error('Failed to fetch thread details');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [id]);

  const handleCreateMessage = () => {
    setShowCreateMessage(true);
  };

  const handleMessageCreated = () => {
    // Reload thread details after creating a message
    fetchThread();
    setShowCreateMessage(false);
  };

  const handleAddUser = () => {
    setShowAddUser(true);
  };

  return (
    <div className="thread-detail-container">
      <h2>Thread Detail</h2>
      {thread ? (
        <div>
          <div className="messages-container">
            {thread.messages.map((message) => (
              <div key={message.send_at} className="message-item">
                <p>{message.user}</p>
                <p>{message.content}</p>
                <p>{message.send_at}</p>
              </div>
            ))}
          </div>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <CreateMessage
        threadId={id}
        onClose={() => setShowCreateMessage(false)}
        onMessageCreated={handleMessageCreated}
      />

      {showAddUser && <AddUserToThread threadId={id} onClose={() => setShowAddUser(false)} />}
    </div>
  );
};

export default ThreadDetail;
