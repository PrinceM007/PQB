import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './AvailableRooms.css';

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setShowConfirmation(true);
  };

  const handleImageClick = (room) => {
    navigate(`/bookings`, { state: { room } });
  };

  return (
    <div className="available-rooms">
      <div className="rooms">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.id}
              className="room-card"
              onClick={() => handleImageClick(room)}
            >
              {room.imageURL ? (
                <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
                  <div>
                    <img
                      src={`/img/${room.imageURL}`}
                      alt={`Room ${room.name}`}
                      className="room-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200';
                      }}
                    />
                  </div>
                </Carousel>
              ) : (
                <div>No image available</div>
              )}          
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <b>Price: ${room.price} per night</b>
              <p className={`availability ${room.isAvailable ? 'available' : 'unavailable'}`}>
                {room.isAvailable ? 'Available' : 'Not Available'}
              </p>
              {room.isAvailable && (
                <button
                       
                key={room.id}
               
                onClick={() => handleImageClick(room)}                
                >
                  Book Now
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
};

export default AvailableRooms;
