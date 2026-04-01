import React from 'react';

const StudentProfile = (props) => {
  return (
    <div style={{
      border: '2px solid #4A90E2',
      borderRadius: '12px',
      padding: '15px',
      margin: '10px',
      width: '250px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#333', marginTop: '0' }}>{props.name}</h3>
      <p><strong>Dept:</strong> {props.department}</p>
      <p><strong>Marks:</strong> {props.marks}%</p>
    </div>
  );
};

export default StudentProfile;