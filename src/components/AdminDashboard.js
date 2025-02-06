import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get('/api/rooms', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRooms(response.data);
    };

    const fetchUsers = async () => {
      const response = await axios.get('/api/users/report', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    };

    fetchRooms();
    fetchUsers();
    setLoading(false);
  }, []);

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await axios.delete(`/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            <h2>Rooms</h2>
            <ul>
              {rooms.map(room => (
                <li key={room.id}>
                  {room.name} - ${room.price}
                  <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Users</h2>
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  {user.fullName} ({user.email})
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
