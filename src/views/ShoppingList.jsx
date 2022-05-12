import { useEffect, useReducer, useState } from 'react';
import { setItem, getItems } from '../utils/local';

function shopReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const newItem = [...state, { ...action.payload, id: Date.now() }];
      setItem(newItem);
      return newItem;
    }
  }
}

export default function ShoppingList() {
  let cart = getItems();
  let initialCart = [
    { id: Date.now(), item: 'Apples', quantity: 4, price: 2.5 },
    { id: +Date.now() + 1, item: 'Apples', quantity: 4, price: 5.5 },
  ];
  const [state, dispatch] = useReducer(shopReducer, initialCart);
  const [newItem, setNewItem] = useState({ item: '', price: '', quantity: '' });
  const [total, setTotal] = useState('');

  useEffect(() => {
    let add = 0;
    for (let item of cart) {
      add = add + item.price;
    }
    setTotal(add);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'add', payload: { ...newItem } });
    setNewItem({ item: '', price: '', quantity: '' });
  };

  return (
    <>
      <h1>Shopping List:</h1>
      <form onSubmit={handleSubmit}>
        {/* (dispatch({type: 'add', item:, quantity, price:} */}
        <label>Item:</label>
        <input
          placeholder="item"
          value={newItem.item}
          onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
        />
        <label>Quantity:</label>
        <input
          type="number"
          placeholder="quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <label>Price:</label>
        <input
          type="number"
          placeholder="$$$"
          required
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: +e.target.value })}
        />
        <button type="submit">Add to Cart</button>
      </form>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.item} {`(${item.quantity})`}
          </li>
        ))}
      </ul>
      <p>______________</p>
      <p>Total: ${total}</p>
    </>
  );
}
