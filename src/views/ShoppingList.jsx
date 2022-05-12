import { useReducer, useState } from 'react';

function shopReducer(state, action) {
  switch (action.type) {
    case 'add': {
    }
  }
}

export default function ShoppingList() {
  let initialCart = [
    { id: Date.now(), item: 'Apples', quantity: 4, price: 2.5 },
    { id: +Date.now() + 1, item: 'Apples', quantity: 4, price: 5.5 },
  ];
  const [state, dispatch] = useReducer(shopReducer, initialCart);
  const [newItem, setNewItem] = useState({ item: '', price: 0, quantity: 0 });

  const total = () => {
    let add = 0;
    for (let item of state) {
      add += item.price;
    }
    return add;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newItem);
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
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <button type="submit">Add to Cart</button>
      </form>
      <ul>
        {state.map((item) => (
          <li key={item.id}>{item.item}</li>
        ))}
      </ul>
      <p>______________</p>
      <p>Total: ${total()}</p>
    </>
  );
}
