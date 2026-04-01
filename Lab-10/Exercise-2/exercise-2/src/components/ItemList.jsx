import React, { useState } from 'react';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addItem = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem = {
      id: Date.now(),
      text: inputValue
    };

    setItems([...items, newItem]);
    setInputValue('');
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Dynamic List</h2>
      
      <form onSubmit={addItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter item name..."
        />
        <button type="submit">Add Item</button>
      </form>

      {items.length === 0 ? (
        <p>The list is currently empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              {item.text} 
              <button 
                onClick={() => removeItem(item.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;