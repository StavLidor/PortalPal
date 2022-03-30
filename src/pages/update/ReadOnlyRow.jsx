import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
//     console.log('ReadOnlyRow',contact)
  return (
    <tr>
      <td>{contact.id}</td>
      <td>{contact.firstName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.dateOfBirth}</td>

      <td>{contact.city}</td>
      <td>{contact.street}</td>
      <td>{contact.buildingNumber}</td>
      {/*<td>{contact.phoneNumber}</td>*/}
      {/*<td>{contact.email}</td>*/}
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