// src/components/ThreadDetail.js
import React, { useState, useEffect } from 'react';
import './ThreadDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import CreateMessage from './CreateMessage';
import AddUserToThread from './AddUserToThread';

const ThreadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Додаємо useNavigate
  const [thread, setThread] = useState(null);
  const [showCreateMessage, setShowCreateMessage] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const fetchThread = async () => {
    try {
      const response = await fetch(`https://django-server-production-feda.up.railway.app/thread/${id}/view/`, {
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
    fetchThread();
    setShowCreateMessage(false);
  };

  const handleAddUser = () => {
    setShowAddUser(true);
  };

  const handleDeleteThread = async () => {
    try {
      const response = await fetch(`https://django-server-production-feda.up.railway.app/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Ваша логіка після успішного видалення треду

        // Переадресація на сторінку тредів
        navigate('/threads');
      } else {
        console.error('Failed to delete thread');
      }
    } catch (error) {
      console.error('Error during delete thread:', error);
    }
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
          <button onClick={handleDeleteThread}>Delete Thread</button>
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
