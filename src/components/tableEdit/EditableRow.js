import React from "react";
import DatePicker from "react-datepicker";
import TableData from "./TableData";
import {Button,Accordion, Form, Row, Col, Container, ButtonGroup, Table, Grid} from 'react-bootstrap'

const EditableRow = ({
                         contact,
                         editFormData,
                         columnsInfo,
                         handleEditFormChange,
                         handleCancelClick,
                         requiredId, table,
                         handleOpen, handleClose
                     }) => {
    return (
        <tr>
            {requiredId && <td>{contact.id}</td>}


            {
                columnsInfo.map((column) => (
                        <td>
                            {column.edit === true && column.type !== 'tableEdit' && !('options' in column) &&
                            <Form.Control
                                type={column.type}
                                required={column.required}
                                placeholder={column.placeholder}
                                name={column.name}
                                value={editFormData[column.name]}
                                onChange={handleEditFormChange}
                            ></Form.Control>

                            }


                            {column.edit === true && column.type !== 'tableEdit' && 'options' in column &&
                            <select type={column.type} name={column.name} id={column.name}
                                    onChange={handleEditFormChange}
                                    value={editFormData[column.name]}>
                                {
                                    column.options.map((op) => (
                                        <option value={op}>{op}</option>
                                    ))
                                }
                            </select>
                            }
                            {column.edit === true && column.type === 'tableEdit' &&
                            <TableData data={editFormData[column.name]}
                            />}
                            {column.edit === false && contact[column.name]}
                        </td>



                ))
            }
            {table !== undefined &&
            <td>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
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
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={(event) => handleOpen(event, contact)}*/}
                {/*>*/}
                {/*    v*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={(event) => handleClose(event, contact)}*/}
                {/*>*/}
                {/*    ^*/}
                {/*</button>*/}
            </td>
            }
            <td>
                <Button variant="outline-primary" style={{fontWeight: "bold"}} type="submit">שמור</Button>
                <Button variant="outline-primary" style={{fontWeight: "bold"}} type="button" onClick={handleCancelClick}>
                    בטל
                </Button>
            </td>
        </tr>
    );
};

export default EditableRow;