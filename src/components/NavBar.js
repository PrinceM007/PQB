import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './NavBar.css';

const NavBar = () => {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <header className="header">
      <div className="logo-container">
        <h1>PQB HOMES</h1>
      </div>
      <nav className="nav-menu">
        {isAuthenticated ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/my-bookings">My Bookings</Link> {/* Updated link */}
            <div className="user-section">
              <span className="welcome-text">
                Welcome, <strong>{user?.fullName || user?.username || "User"}</strong>!
              </span>
              <span onClick={logout} className="logout-link">
                Logout
              </span>
            </div>
          </>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
