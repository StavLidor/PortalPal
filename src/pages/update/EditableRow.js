import React from "react";
import DatePicker from "react-datepicker";
const EditableRow = ({
                            contact,
                         inputs,
                         handleEditFormChange,
                         handleCancelClick,
                     }) => {
    return (
        <tr>
            <td>{contact.id}</td>

                {
                    inputs.map((i) => (
                        <td>
                        <input
                            type={i.type}
                            required={i.required}
                            placeholder={i.placeholder}
                            name={i.name}
                            value={i.value}
                            onChange={handleEditFormChange}
                        ></input>
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