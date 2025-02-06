import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import AvailableRooms from './AvailableRooms';
import './HomePage.css';
import NavBar from './NavBar';
import Footer from './Footer';
const HomePage = ({ onLogout }) => {
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    onLogout();
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="home-page">
    

      <main>
      
        <AvailableRooms />
      </main>

    </div>
  );
};

export default HomePage;
