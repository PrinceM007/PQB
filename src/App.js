import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import BookingsPage from './components/BookingsPage';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MyBookings from './components/MyBookings';
import { UserProvider, useUser } from './contexts/UserContext';

const App = () => {
  const { user, isAuthenticated, setIsAuthenticated } = useUser();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.clear();
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]);

  if (isAuthenticated === null) return <p>Loading...</p>; // Show loading while validating

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <NavBar />}
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login />
            }
          />

          {/* Private Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Default Routes */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
        </Routes>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const WrappedApp = () => (
  <UserProvider>
    <App />   
  </UserProvider>
);

export default WrappedApp;
