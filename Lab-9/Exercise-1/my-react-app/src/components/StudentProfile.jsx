import React from 'react'

const StudentProfile = () => {
  
    const student = {
    name: "Ice Bear",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    section: "A"
    };

  return (
    <>
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      borderRadius: '8px', 
      maxWidth: '300px',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Student Profile</h2>
      <hr />
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Year:</strong> {student.year}</p>
      <p><strong>Section:</strong> {student.section}</p>
    </div>
    </>
  )
}

export default StudentProfile;

