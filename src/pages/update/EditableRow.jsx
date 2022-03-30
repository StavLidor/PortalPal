import React from "react";
import DatePicker from "react-datepicker";
const EditableRow = ({
                            contact,
                         editFormData,
                         handleEditFormChange,
                         handleCancelClick,
                     }) => {
    return (
        <tr>
            <td>{contact.id}</td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a first name..."
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a last name..."
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
{/*                  <DatePicker selected={editFormData.dateOfBirth} onChange={handleEditFormChange} /> */}
                    <input
                                        type="date"
                                        required="required"
                                        placeholder="Enter a birth day..."
                                        name="dateOfBirth"
                                        value={editFormData.dateOfBirth}
                                        onChange={handleEditFormChange}
                                    >
                                    </input>

             </td>
             <td>
                             <input
                                 type="text"
                                 required="required"
                                 placeholder="Enter a last city..."
                                 name="city"
                                 value={editFormData.city}
                                 onChange={handleEditFormChange}
                             ></input>
             </td>
             <td>
                                          <input
                                              type="text"
                                              required="required"
                                              placeholder="Enter a last street..."
                                              name="street"
                                              value={editFormData.street}
                                              onChange={handleEditFormChange}
                                          ></input>
              </td>
              <td>
                                                        <input
                                                            type="text"
                                                            required="required"
                                                            placeholder="Enter a last buildingNumber..."
                                                            name="buildingNumber"
                                                            value={editFormData.buildingNumber}
                                                            onChange={handleEditFormChange}
                                                        ></input>
              </td>

            {/*<td>*/}
            {/*    /!*<input*!/*/}
            {/*    /!*    type="text"*!/*/}
            {/*    /!*    required="required"*!/*/}
            {/*    /!*    placeholder="Enter a phone number..."*!/*/}
            {/*    /!*    name="phoneNumber"*!/*/}
            {/*    /!*    value={editFormData.phoneNumber}*!/*/}
            {/*    /!*    onChange={handleEditFormChange}*!/*/}
            {/*    /!*></input>*!/*/}
            {/*</td>*/}
            {/*<td>*/}
            {/*    /!*<input*!/*/}
            {/*    /!*    type="email"*!/*/}
            {/*    /!*    required="required"*!/*/}
            {/*    /!*    placeholder="Enter an email..."*!/*/}
            {/*    /!*    name="email"*!/*/}
            {/*    /!*    value={editFormData.email}*!/*/}
            {/*    /!*    onChange={handleEditFormChange}*!/*/}
            {/*    /!*></input>*!/*/}
            {/*</td>*/}
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