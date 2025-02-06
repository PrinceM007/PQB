import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext'; // Import useUser from context

const Rooms = () => {
  const { user } = useUser();  // Access user from context
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBooking, setUserBooking] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!user) {
        setError("User is not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/rooms/user/${user.id}`);
        setRooms(response.data);
      } catch (err) {
        setError('Failed to load rooms');
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserBooking = async () => {
      if (!user) {
        setError("User is not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/bookings/user/${user.id}`);
        setUserBooking(response.data);
      } catch (err) {
        console.error('Error fetching booking:', err);
      }
    };

    fetchRooms();
    fetchUserBooking();
  }, [user]);

  const handleCheckout = async () => {
    if (!user) {
      alert("User is not logged in");
      return;
    }

    try {
      await axios.post('/api/bookings/checkout', { userId: user.id });
      alert("Checked out successfully!");
      setUserBooking(null); // Clear booking after checkout
    } catch (error) {
      alert("Error during checkout");
    }
  };

  const handleBookRoom = async (roomId) => {
    if (!user) {
      alert("User is not logged in");
      return;
    }

    try {
      const response = await axios.post('/api/bookings/book', { userId: user.id, roomId });
      setUserBooking(response.data);
      alert("Room booked successfully!");
    } catch (error) {
      alert("Error during booking");
    }
  };

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rooms-list">
      <h2>Your Current Booking</h2>
      {userBooking ? (
        <div className="booking-card">
          <h3>Room: {userBooking.room.name}</h3>
          <p>Check-in Date: {userBooking.checkInDate}</p>
          <p>Check-out Date: {userBooking.checkOutDate}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <div>No current bookings</div>
      )}

      <h2>Available Rooms</h2>
      {rooms.map((room) => (
        <div key={room.id} className="room-card">
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p>Price per night: ${room.price}</p>
          <p className={`availability ${room.isAvailable ? 'available' : 'unavailable'}`}>
            {room.isAvailable ? 'Available' : 'Not Available'}
          </p>
          {room.isAvailable && !userBooking && (
            <button onClick={() => handleBookRoom(room.id)}>Book Now</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Rooms;
