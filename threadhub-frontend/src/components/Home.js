// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-container">
        <h2 className="welcome-heading">Welcome to ThreadHub</h2>
        <p className="description">
          ThreadHub is a platform for creating and managing threads of conversations. Connect with
          others and start threaded discussions on various topics.
        </p>
        <p className="get-started">
          To get started, <button><Link to="/login">login</Link></button> or <button><Link to="/register">register</Link></button>  to
          join the conversation.
        </p>
        <p className="explore">
          If you already have an account, explore the <button><Link to="/threads">threads</Link> </button>to engage
          with the community.
        </p>
      </div>
    </div>
  );
};

export default Home;
