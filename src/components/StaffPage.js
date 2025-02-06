import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import './StaffPage.css';




const StaffPage = ({ onLogout }) => {
  const [staff, setStaff] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [staffIdToUpdate, setStaffIdToUpdate] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    // Fetch staff members from backend API
    axios.get('http://localhost:5000/api/staff')
      .then(response => {
        setStaff(response.data);
      })
      .catch(error => {
        console.error('Error fetching staff:', error);
      });
  }, []);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const assignRole = (staffId) => {
    axios.put(`http://localhost:5000/api/staff/${staffId}`, { role: selectedRole })
      .then(response => {
        setStaff(staff.map(staffMember => 
          staffMember.id === staffId ? { ...staffMember, role: selectedRole } : staffMember
        ));
        setStaffIdToUpdate(null);
      })
      .catch(error => {
        console.error('Error assigning role:', error);
      });
  };

  const handleLogout = () => {
    onLogout();
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="staff-page">
    
      
      <h2>Staff Management</h2>
      
      <div className="staff-settings-table">
        <div className="staff-table-header">
          <div className="header-item">Name</div>
          <div className="header-item">Email</div>
          <div className="header-item">Role</div>
          <div className="header-item">Assign Role</div>
        </div>
        
        {staff.map(staffMember => (
          <div className="staff-table-row" key={staffMember.id}>
            <div className="staff-item">{staffMember.name}</div>
            <div className="staff-item">{staffMember.email}</div>
            <div className="staff-item">
              {staffIdToUpdate === staffMember.id ? (
                <select value={selectedRole} onChange={handleRoleChange}>
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Security">Security</option>
                </select>
              ) : staffMember.role}
            </div>
            <div className="staff-item">
              {staffIdToUpdate === staffMember.id ? (
                <button onClick={() => assignRole(staffMember.id)} className="assign-button">Assign Role</button>
              ) : (
                <button onClick={() => setStaffIdToUpdate(staffMember.id)} className="edit-button">Edit Role</button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  );
};

export default StaffPage;
