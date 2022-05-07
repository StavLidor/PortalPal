import React, {Fragment} from "react";
import {Accordion} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick,columnNames,requeredId,toEdit,table,handleOpen,handleClose }) => {
    console.log('ReadOnlyRow',contact.id)
    console.log('ReadOnlyRow',columnNames)
    // columnNames.map((name) => (
    //
    //     console.log(contact[name])
    // ))
  return (
    <tr>
        {/*{requeredId && <td>{contact.id}</td>}*/}

        {
            columnNames.map((columnName) => (
                <td className="text-center">
                {contact[columnName]}
                </td>

            ))
        }
        {table !== undefined &&
            <td>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>המטופלים שלי</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                {/*{handleOpen &&*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={(event) => handleOpen(event, contact)}*/}
                {/*    >*/}
                {/*        v*/}
                {/*    </button>}*/}
                {/*{handleClose &&*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={(event) => handleClose(event, contact)}*/}
                {/*    >*/}
                {/*        ^*/}
                {/*    </button>*/}
                {/*}*/}

            </td>
        }

      <td>
          {toEdit &&
              <Button variant="outline-primary" style={{fontWeight: "bold"}}
                  type="button"
                  onClick={(event) => handleEditClick(event, contact)}
              >
                 ערוך
              </Button>
          }

        <Button variant="outline-primary"  style={{fontWeight: "bold"}} type="button" onClick={() => handleDeleteClick(contact.id)}>
          מחק
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;