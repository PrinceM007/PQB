import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]); // State for storing bookings
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(''); // State for error messages

  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) {
        setError('User ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        // Ensure the full URL is correct for development or production
        const response = await fetch(`http://localhost:5000/api/bookings/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    try {
      // Cancel booking API call (ensure the backend supports this route)
      await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`);
      alert("Booking canceled successfully!");
      // Remove canceled booking from the state
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      alert("Error canceling booking");
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="bookings-list">
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h4>Room ID: {booking.roomId}</h4>
          <p>Check-in: {booking.checkInDate}</p>
          <p>Check-out: {booking.checkOutDate}</p>
          <p>Status: {booking.status}</p>
          {booking.status === 'booked' && (
            <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserBookings;
