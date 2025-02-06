import React, { useEffect, useState } from 'react';
import './MyBookings.css';
import { useUser } from '../contexts/UserContext';

const MyBookings = () => {
  const { user, isAuthenticated, loading: userLoading } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleCheckout = (bookingId) => {
    fetch(`http://localhost:5000/api/bookings/checkout/${bookingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to check out');
        return response.json();
      })
      .then(() => {
        alert('Checked out successfully!');
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === bookingId ? { ...booking, isAvailable: 1 } : booking
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert('Error during checkout');
      });
  };

  useEffect(() => {
    if (userLoading) return;
    if (!isAuthenticated || !user) {
      setError('User not logged in.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/rooms/user/${user.id}`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('YOU DON’T HAVE ANY BOOKINGS.');
        console.error(err);
        setLoading(false);
      });
  }, [user, isAuthenticated, userLoading]);

  if (userLoading || loading) {
    return <div className="loading">Loading rooms...</div>;
  }
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <img src={`../img/${booking.imageURL}`} alt={booking.name} className="booking-image" />
              <div className="booking-details">
                <h3>{booking.name}</h3>
                <p>{booking.description}</p>
                <bold><strong>Price:</strong> ${booking.price}</bold>
                <p><strong>Status:</strong> {booking.isAvailable === 0 ? 'Checked In' : 'Checked Out'}</p>
                {booking.isAvailable === 0 && (
                  <button className="checkout-button" onClick={() => handleCheckout(booking.id)}>
                    Check Out
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
