import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
  const [booking, setBooking] = useState({
    room_id: '',
    customer_name: '',
    customer_email: '',
    check_in_date: '',
    check_out_date: ''
  });
  const [roomImage, setRoomImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRoomImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("room_id", booking.room_id);
    formData.append("customer_name", booking.customer_name);
    formData.append("customer_email", booking.customer_email);
    formData.append("check_in_date", booking.check_in_date);
    formData.append("check_out_date", booking.check_out_date);
    formData.append("room_image", roomImage);

    axios.post('http://localhost:5000/api/bookings', formData)
      .then((response) => {
        alert('Booking created successfully!');
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl} alt="Room preview" />
        </div>
      )}

      <h2>Make a Booking</h2>

      <label>
        Room ID
        <input
          name="room_id"
          value={booking.room_id}
          onChange={handleChange}
          placeholder="Room ID"
          required
        />
      </label>

      <label>
        Name
        <input
          name="customer_name"
          value={booking.customer_name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </label>

      <label>
        Email
        <input
          name="customer_email"
          value={booking.customer_email}
          onChange={handleChange}
          placeholder="Enter your email"
          type="email"
          required
        />
      </label>

      <label>
        Check-in Date
        <input
          name="check_in_date"
          value={booking.check_in_date}
          onChange={handleChange}
          type="date"
          required
        />
      </label>

      <label>
        Check-out Date
        <input
          name="check_out_date"
          value={booking.check_out_date}
          onChange={handleChange}
          type="date"
          required
        />
      </label>

      <label>
        Room Image
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>



  );
};

export default BookingForm;
