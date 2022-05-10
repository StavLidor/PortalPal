import React from "react";
import DatePicker from "react-datepicker";
import TableData from "./TableData";
import {Button, Accordion, Form, Row, Col, Container, ButtonGroup, Table, Grid} from 'react-bootstrap'
import {convertToNormalDate} from '../../useFunction'
import { Check, X} from 'react-bootstrap-icons';

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
            {requiredId && <td style={{fontSize: 20}} className="text-center">{contact.id}</td>}


            {
                columnsInfo.map((column) => (
                    <>
                        {column.view && <td>
                            {column.edit === true && column.type !== 'tableEdit' && !('options' in column) &&
                            <Form.Control

                                type={column.type}
                                required={column.required}
                                placeholder={column.placeholder}
                                name={column.name}
                                value={(() => {
                                    if (column.type === 'date') {
                                        return convertToNormalDate(editFormData[column.name])
                                    }
                                    return editFormData[column.name]
                                })()}
                                onChange={handleEditFormChange}
                            ></Form.Control>

                            }


                            {column.edit === true && column.type !== 'tableEdit' && 'options' in column &&

                            <Form.Select type={column.type} name={column.name} id={column.name} style={{width: 100}}
                                         onChange={handleEditFormChange}
                                         value={editFormData[column.name]}>
                                {
                                    column.options.map((op) => (
                                        // <option value={op}>{op}</option>
                                        <option style={{fontSize: 18}} value={op}>{op}</option>

                                    ))

                                }
                            </Form.Select>
                                // <select type={column.type} name={column.name} id={column.name}
                                //         onChange={handleEditFormChange}
                                //         value={editFormData[column.name]}>
                                //     {
                                //         column.options.map((op) => (
                                //             <option value={op}>{op}</option>
                                //         ))
                                //     }
                                // </select>
                            }
                            {column.edit === true && column.type === 'tableEdit' &&
                            <TableData data={editFormData[column.name]}
                            />}
                            {column.edit === false && contact[column.name]}
                        </td>}
                    </>


                ))
            }
            {/*{table !== undefined &&*/}
            {/*<td>*/}
            {/*    <Accordion defaultActiveKey="0">*/}
            {/*        <Accordion.Item eventKey="0">*/}
            {/*            <Accordion.Header>המטופלים שלי</Accordion.Header>*/}
            {/*            <Accordion.Body>*/}
            {/*                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod*/}
            {/*                tempor incididunt ut ladebore et dolore magna aliqua. Ut enim ad minim*/}
            {/*                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea*/}
            {/*                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate*/}
            {/*                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
            {/*                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id*/}
            {/*                est laborum.*/}
            {/*            </Accordion.Body>*/}
            {/*        </Accordion.Item>*/}
            {/*    </Accordion>*/}
            {/*    <button*/}
            {/*        type="button"*/}
            {/*        onClick={(event) => handleOpen(event, contact)}*/}
            {/*    >*/}
            {/*        v*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        type="button"*/}
            {/*        onClick={(event) => handleClose(event, contact)}*/}
            {/*    >*/}
            {/*        ^*/}
            {/*    </button>*/}
            {/*</td>*/}
            {/*}*/}
            <td>
                <Button  className="p-1 m-1" variant="outline-success" style={{fontWeight: "bold"}} type="submit"><Check style={{fontSize:16}}/></Button>
                <Button  className="p-1 m-1" variant="outline-danger" style={{fontWeight: "bold"}} type="button"
                        onClick={handleCancelClick}>
                    <X style={{fontSize:16}}/>
                </Button>
            </td>
        </tr>
    )
}

export default EditableRow;