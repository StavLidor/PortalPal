import React from "react";
import DatePicker from "react-datepicker";
import TableEdit from "./TableEdit";
const EditableRow = ({
                            contact,
                         editFormData,
                         inputs,
                         handleEditFormChange,
                         handleCancelClick,
                         requeredId,table,
                         handleOpen,handleClose
                     }) => {
    return (
        <tr>
            {requeredId && <td>{contact.id}</td>}


                {
                    inputs.map((i) => (
                        <td>
                            {}
                            {i.edit ===true && i.type!=='tableEdit' &&

                                <input
                                    type={i.type}
                                    required={i.required}
                                    placeholder={i.placeholder}
                                    name={i.name}
                                    value={editFormData[i.name]}
                                    onChange={handleEditFormChange}
                                ></input>

                            }
                            {i.edit ===true && i.type!=='tableEdit' &&'options' in i &&
                                <select type={i.type} name={i.name} id={i.name} onChange={handleEditFormChange}
                                        value={editFormData[i.name]}>
                                    {
                                        i.options.map((op) => (
                                            <option value={op[0]}>{op[1]}</option>
                                        ))
                                    }
                                </select>
                            }
                            {i.edit ===true && i.type==='tableEdit' &&
                                <TableEdit data={editFormData[i.name]}
                                />}
                            {i.edit ===false && contact[i.name]}
                        </td>


                    ))
                }
            {table !== undefined &&
                <td>
                <button
                            type="button"
                            onClick={(event) => handleOpen(event, contact)}
                        >
                v
                </button>
                <button
                type="button"
                onClick={(event) => handleClose(event, contact)}
                >
                ^
                </button>
                </td>
            }
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default EditableRow;