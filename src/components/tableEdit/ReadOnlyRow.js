import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick,namesFiled }) => {
    console.log('ReadOnlyRow',contact)
    console.log('ReadOnlyRow',namesFiled)
    namesFiled.map((f) => (

        console.log(contact[f])
    ))
  return (
    <tr>
        <td>{contact.id}</td>
        {
            namesFiled.map((f) => (

                <td>{contact[f]}</td>
            ))
        }
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;