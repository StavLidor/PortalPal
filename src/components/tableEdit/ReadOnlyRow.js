import React, {Fragment} from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick,namesFiled,requeredId,toEdit,table,handleOpen,handleClose }) => {
    console.log('ReadOnlyRow',contact)
    console.log('ReadOnlyRow',namesFiled)
    namesFiled.map((f) => (

        console.log(contact[f])
    ))
  return (
    <tr>
        {/*{requeredId && <td>{contact.id}</td>}*/}

        {
            namesFiled.map((f) => (


                <td>
                {contact[f]}
                </td>
            ))
        }
        {table !== undefined &&
            <td>
                {handleOpen &&
                    <button
                        type="button"
                        onClick={(event) => handleOpen(event, contact)}
                    >
                        v
                    </button>}
                {handleClose &&
                    <button
                        type="button"
                        onClick={(event) => handleClose(event, contact)}
                    >
                        ^
                    </button>
                }

            </td>
        }

      <td>
          {toEdit &&
              <button
                  type="button"
                  onClick={(event) => handleEditClick(event, contact)}
              >
                  Edit
              </button>
          }

        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;