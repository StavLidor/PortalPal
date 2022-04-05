import React from "react";
import DatePicker from "react-datepicker";
const EditableRow = ({
                            contact,
                         editFormData,
                         inputs,
                         handleEditFormChange,
                         handleCancelClick,
                         requeredId
                     }) => {
    return (
        <tr>
            {requeredId && <td>{contact.id}</td>}


                {
                    inputs.map((i) => (
                        <td>
                            {i.edit ===true &&
                                <input
                                    type={i.type}
                                    required={i.required}
                                    placeholder={i.placeholder}
                                    name={i.name}
                                    value={editFormData[i.name]}
                                    onChange={handleEditFormChange}
                                ></input>

                            }
                            {i.edit ===false && contact[i.name]}
                        </td>


                    ))
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