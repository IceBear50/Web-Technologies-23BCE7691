import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '50px',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1>Interactive Counter</h1>
      
      <div style={{ 
        fontSize: '48px', 
        margin: '20px',
        color: count >= 0 ? '#2ecc71' : '#e74c3c' 
      }}>
        {count}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={decrement}
          style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}
        >
          Decrease
        </button>

        <button 
          onClick={reset}
          style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#f0f0f0' }}
        >
          Reset
        </button>

        <button 
          onClick={increment}
          style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}
        >
          Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;