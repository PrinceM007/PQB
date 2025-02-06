import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';
import { useUser } from '../contexts/UserContext';
import { useLocation } from 'react-router-dom';

const BookingPage = () => {
  const { state } = useLocation();
  const room = state?.room || {}; // Extract room data from state
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState(null);
  const { user } = useUser(); // Access user from UserContext
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  // Calculate total price based on check-in and check-out dates
  const calculateTotalAmount = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffInTime = checkOut.getTime() - checkIn.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      return diffInDays * room.price;
    }
    return 0;
  };
  const handleBookNow = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!checkInDate || !checkOutDate || calculateTotalAmount() <= 0) {
      alert('Please select valid dates.');
      return;
    }
    if (new Date(checkInDate) < new Date(today)) {
      alert('Check-in date cannot be in the past.');
      return;
    }
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      alert('Check-out date must be after the check-in date.');
      return;
    }
    setShowPopup(true);
  };
  
  

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };
  const handleCardPayment = (e) => {
    e.preventDefault();
  
    const bookingDetails = {
      userId: user?.id,
      roomId: room.id,
      checkInDate,
      checkOutDate,
      paymentMethod: 'Card',
      phoneNumber,
      totalAmount: calculateTotalAmount(),
    };
  
    console.log('Booking details:', bookingDetails); // Debug log
  
    axios
      .post(`http://localhost:5000/api/bookings/book`, bookingDetails)
      .then(() => {
        alert('Booking confirmed!');
        setShowPopup(false);
        navigate('/confirmation');
      })
      .catch((error) => {
        console.error('Error booking room:', error);
        setError('Error processing payment. Please try again.');
      });
  };
  
  const handleMomoPayment = (e) => {
    e.preventDefault();
    const bookingDetails = {
      userId: user?.id,
      roomId: room.id,
      checkInDate,
      checkOutDate,
      paymentMethod: 'MOMO',
      phoneNumber,
      totalAmount: calculateTotalAmount(),
    };

    axios
      .post(`http://localhost:5000/api/bookings/book`, bookingDetails)
      .then(() => {
        alert('Booking confirmed!');
        setShowPopup(false);
        navigate('/confirmation');
      })
      .catch((error) => {
        console.error('Error booking room:', error);
        setError('Error processing payment. Please try again.');
      });
  };

  const handleCashPayment = (e) => {
    e.preventDefault();
    const bookingDetails = {
      userId: user?.id,
      roomId: room.id,
      checkInDate,
      checkOutDate,
      paymentMethod: 'Cash',
      phoneNumber,
      totalAmount: calculateTotalAmount(),
    };

    axios
      .post(`http://localhost:5000/api/bookings/book`, bookingDetails)
      .then(() => {
        alert('Booking confirmed!');
        setShowPopup(false);
        navigate('/confirmation');
      })
      .catch((error) => {
        console.error('Error booking room:', error);
        setError('Error processing payment. Please try again.');
      });
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedPaymentMethod('');
  };

  return (
    <div className="booking-page">
      {!room ? (
        <p>Room details not available.</p>
      ) : (
        <>
          <div className="room-details">
            <h2>{room.name}</h2>
            <img
              src={`/img/${room.imageURL}`}
              alt={`Room ${room.name}`}
              className="room-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200';
              }}
            />
            <p>{room.description}</p>
            <p>Price: ${room.price} per night</p>
            <h4 className={`availability ${room.isAvailable ? 'available' : 'unavailable'}`}>
              {room.isAvailable ? 'Available' : 'Not Available'}
            </h4>
          </div>

          <div className="booking-form">
            <h3>Book Your Stay</h3>
            <label>
              Check-in Date:
              <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
            </label>
            <label>
              Check-out Date:
              <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
            </label>
            <label>
              Number of Guests:
              <input type="number" value={guests} min="1" onChange={(e) => setGuests(e.target.value)} required />
            </label>
            <div className="total-amount">
              <h4>Total Amount: ${calculateTotalAmount().toFixed(2)}</h4>
            </div>
            {room.isAvailable && <button onClick={handleBookNow}>Book Now</button>}
          </div>
        </>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup" onClick={closePopup}>
              ×
            </button>
            <div className="total-amount">
              <h4>Total Amount: ${calculateTotalAmount().toFixed(2)}</h4>
            </div>
            {!selectedPaymentMethod ? (
              <div className="payment-options">
                <h3>Select Payment Method</h3>
                <button onClick={() => handlePaymentMethodSelect('Card')}>Card Payment</button>
                <button onClick={() => handlePaymentMethodSelect('MOMO')}>MOMO PAY</button>
                <button onClick={() => handlePaymentMethodSelect('Cash')}>Cash</button>
              </div>
            ) : selectedPaymentMethod === 'Card' ? (
              <div className="payment-form">
                <h3>Card Payment</h3>
                <form onSubmit={handleCardPayment}>
                  <label>
                    Card Number:
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Expiry Date:
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    CVV:
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      required
                    />
                  </label>
                  <button type="submit">Confirm Payment</button>
                </form>
              </div>
            ) : selectedPaymentMethod === 'MOMO' ? (
              <div className="momo-payment">
                <h3>MOMO PAY</h3>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </label>
                <button onClick={handleMomoPayment}>Confirm Payment</button>
              </div>
            ) : selectedPaymentMethod === 'Cash' ? (
              <div className="cash-payment">
                <h3>Cash Payment</h3>
                <button onClick={handleCashPayment}>Confirm Booking</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
