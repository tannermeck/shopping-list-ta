import { useState } from 'react';

export default function CartInfo({
  item,
  edit,
  handleEdit,
  editItem,
  setEditItem,
  handleSave,
}) {
  return (
    <>
      {edit.bool && item.id === edit.id ? (
        <form>
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
        </form>
      ) : (
        <li>
          {item.item} {`(${item.quantity})`} ${item.price}
        </li>
      )}
      {item.id !== edit.id && (
        <button onClick={() => handleEdit(item)}>Edit</button>
      )}
      {edit.bool && item.id == edit.id && (
        <button onClick={() => handleSave(editItem)}>Save</button>
      )}
      <button>Delete</button>
    </>
  );
}
