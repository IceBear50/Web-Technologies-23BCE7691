import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading data, please wait...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Directory</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map((user) => (
          <li key={user.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <strong>{user.name}</strong> - {user.email}
            <br />
            <small>Company: {user.company.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;