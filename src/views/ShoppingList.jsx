import { useEffect, useReducer, useState } from 'react';
import CartInfo from '../components/CartInfo';
import { setItem, getItems } from '../utils/local';

function shopReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const newItem = [...state, { ...action.payload, id: Date.now() }];
      setItem(newItem);
      return newItem;
    }
    case 'edit': {
      const editItem = state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      setItem(editItem);
      return editItem;
    }
  }
}

export default function ShoppingList() {
  const cart = getItems();
  const [state, dispatch] = useReducer(shopReducer, cart);
  const [newItem, setNewItem] = useState({ item: '', price: '', quantity: '' });
  const [total, setTotal] = useState('');
  const [editItem, setEditItem] = useState({
    item: '',
    price: '',
    quantity: '',
  });

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
  const handleSave = (editedItem) => {
    dispatch({ type: 'edit', payload: { ...editedItem } });
  };

  return (
    <>
      <h1>Shopping List:</h1>
      <form onSubmit={handleSubmit}>
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
        {cart?.map((item) => (
          <CartInfo
            key={item.id}
            item={item}
            editItem={editItem}
            setEditItem={setEditItem}
            handleSave={handleSave}
          />
        ))}
      </ul>
      <p>______________</p>
      <p>Total: ${total}</p>
    </>
  );
}
