import React from "react";
import TableData from "./TableData";
import {Button, Form} from 'react-bootstrap'
import {convertToNormalDate} from '../../useFunction'
import { Check, X} from 'react-bootstrap-icons';
/*edit data on a table*/
const EditableRow = ({
                         contact,
                         editFormData,
                         columnsInfo,
                         handleEditFormChange,
                         handleCancelClick,
                         requiredId,
                     }) => {
    return (
        <tr>
            {requiredId && <td style={{fontSize: 20}} className="text-center">{contact.id}</td>}


            {
                columnsInfo.map((column) => (
                    <>
                        {column.view && <>
                            {column.edit === true && column.type !== 'tableEdit' && !('options' in column) &&<td>
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
                            ></Form.Control></td>

                            }


                            {column.edit === true && column.type !== 'tableEdit' && 'options' in column &&
                                <td>

                            <Form.Select type={column.type} name={column.name} id={column.name} style={{width: 100}}
                                         onChange={handleEditFormChange}
                                         value={editFormData[column.name]}>
                                {
                                    column.options.map((op) => (
                                        // <option value={op}>{op}</option>
                                        <option style={{fontSize: 18}} value={op}>{op}</option>

                                    ))

                                }

                            </Form.Select></td>

                            }
                            {column.edit === true && column.type === 'tableEdit' &&
                            <td><TableData data={editFormData[column.name]}
                            /></td>}
                            {column.edit === false && <td style={{fontSize: 20}}>{contact[column.name]}</td>}</>
                        }
                    </>


                ))
            }
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