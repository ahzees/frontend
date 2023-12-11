// src/components/Threads.js
import React, { useState, useEffect } from 'react';
import './Threads.css'; // Import the CSS file
import CreateThread from './CreateThread';
import { Link } from 'react-router-dom';

const Threads = () => {
  const [threads, setThreads] = useState([]);
  const [showCreateThread, setShowCreateThread] = useState(false);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch('https://django-server-production-feda.up.railway.app/thread/all/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setThreads(data.threads);
        } else {
          console.error('Failed to fetch threads');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchThreads();
  }, []); // Add an empty dependency array to fetch threads only once on mount

  const handleCreateThread = () => {
    setShowCreateThread(true);
  };

  return (
    <div className="threads-container">
      <h2>Threads</h2>
      {threads.length > 0 ? (
        <ul className="threads-list">
          {threads.map((thread) => (
            <li key={thread.pk} className="thread-item">
              <Link to={`/thread/${thread.pk}`}>{thread.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available threads</p>
      )}

      <button className="create-thread-button" onClick={handleCreateThread}>
        Create Thread
      </button>

      {showCreateThread && <CreateThread onClose={() => setShowCreateThread(false)} />}
    </div>
  );
};

export default Threads;
