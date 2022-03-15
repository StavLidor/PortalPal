

import React, { useState, Fragment } from "react";
import ReadOnlyRow from "../../components/ReadOnlyRow";
import EditableRow from "../../components/EditableRow";
import {details_users} from "../../firebase"
import Secretary from "../secretary/Secretary";
import {signUser} from "../../pepole/users/user";
import "./UpdatePatient.css"

export default  function UpdatePatient({data}) {
    console.log(data)
    // function t() {
    //     const arr =  details_users(data.ids)
    //     const p1 = Promise.resolve(arr)
    //     p1.then(value => {
    //         setContacts(value)
    //     });
    //     return []
    //
    //
    // }
    const arr =  details_users(data.students_arr)
    const [contacts, setContacts] = useState([]);
    console.log(contacts)
    if(contacts.length == 0){
        const p1 = Promise.resolve(arr)
        p1.then(value => {
            setContacts(value)
        });
    }
    // const p1 = Promise.resolve(arr)
    // p1.then(value => {
    //     setContacts(value)
    // });
    // t()
    // const [promise, setPromise] = useState(true);
    // console.log(contacts)
    // // contacts.map((contact) => {
    // //     console.log(contact)
    // //
    // // })
    // console.log('Contacts', typeof (contacts))
    //
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        firstName: "",
        lastName: "",
        //email: "",
    });
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };
    const handleCancelClick = () => {
        setEditContactId(null);
    };
    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);

        const formValues = {
            firstName: contact.firstName,
            lastName: contact.lastName,
            // phoneNumber: contact.phoneNumber,
            // email: contact.email,
        };

        setEditFormData(formValues);
    };
    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
          (contacts.length > 0 ) ? (
                <div className="secretary">
                    <table>
                        <thead>
                        <tr>
                            {/*<th>מייל הורה</th>*/}
                            <th>תעודת זהות</th>
                            <th>שם</th>
                            <th>שם משפחה</th>

                            {/*<th>תעודת זהות</th>*/}
                        </tr>
                        </thead>
                        <tbody>

                        {

                             contacts.map((contact) => (
                                <Fragment>
                                    { contact!==undefined && editContactId === contact.id ? (
                                        <EditableRow
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) : (contact!==undefined)?(
                                        <ReadOnlyRow
                                            contact={contact}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                        ):
                                        <div>

                                        </div>}


                                </Fragment>
                            ))}
                        </tbody>
                    </table>

                </div>
             ) :
             <div></div>


    )
}