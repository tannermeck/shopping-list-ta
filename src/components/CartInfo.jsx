import { useState } from 'react';

export default function CartInfo({ item, editItem, setEditItem, handleSave }) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(editItem);
            setEdit(false);
          }}
        >
          <input
            value={editItem.item}
            onChange={(e) =>
              setEditItem({ ...editItem, id: item.id, item: e.target.value })
            }
          />
          <input
            value={editItem.quantity}
            onChange={(e) =>
              setEditItem({
                ...editItem,
                id: item.id,
                quantity: e.target.value,
              })
            }
          />
          <input
            value={editItem.price}
            onChange={(e) =>
              setEditItem({ ...editItem, id: item.id, price: +e.target.value })
            }
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <li>
          {item.item} {`(${item.quantity})`} ${item.price}
        </li>
      )}
      {!edit && (
        <button
          onClick={() => {
            setEdit(true);
            setEditItem({
              item: item.item,
              quantity: item.quantity,
              price: item.price,
            });
          }}
        >
          Edit
        </button>
      )}
      <button>Delete</button>
    </>
  );
}
