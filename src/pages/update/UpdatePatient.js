

import React, { useState, Fragment } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import {addUserFromAdmin, deletePatientFromInstitute, details_users, updatesPatients} from "../../firebase"
import "./UpdatePatient.css"
import CsvFile from "./CsvFile";

export default  function UpdatePatient({update,data,new_patients}) {

    console.log(data)
    const [detailsPatients,setDetailsPatients] = useState({id:"",firstName:"",lastName:"",dateOfBirth:new Date(),city:"",street:"",buildingNumber:"",firstNameParent:"",lastNameParent:"",email:""});
    const [contacts, setContacts] = useState(data.students_arr);
    const [detailsTherapist,setDetailsTherapist]=useState({firstName:"",lastName:"",email:"",jobs:"",institutes:[data.institutionNumber]})
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth:new Date()
        ,city:"",street:"",buildingNumber:"",
        //email: "",
    });
    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData)
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
            dateOfBirth: contact.dateOfBirth,
            city:contact.city,street:contact.street,buildingNumber:contact.buildingNumber,
            // phoneNumber: contact.phoneNumber,
            // email: contact.email,
        };

        setEditFormData(formValues);
    };
    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];
        console.log(contacts)
        const index = contacts.findIndex((contact) => contact.id === contactId);
        deletePatientFromInstitute(data.institutionNumber,{id:contactId,jobs:['secretary']},data.id,)
        newContacts.splice(index, 1);
        console.log(newContacts)
        setContacts(newContacts);
        console.log(data.id)
        console.log(contactId)

    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact=Object.assign({}, editFormData,{id: editContactId})
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact) => contact.id === editContactId);
        newContacts[index] = editedContact
        setContacts(newContacts)
        setEditContactId(null)
        update(editContactId,editedContact)
        console.log('change',contacts)
    };
    const addNewPatient =allDetails => {
        //console.log('new patinet for csv')
        const newContacts = [...contacts]
        let i=0
        allDetails.map(async (details) => {
                newContacts[contacts.length+i] = details
                i++
                await new_patients(Object.assign({}, {
                    institutionNumber: data.institutionNumber, idSecretary: data.id, emailCurrent: data.emailCurrent,
                    passwordCurrent: data.passwordCurrent
                }, details));

                console.log('new contacts', newContacts)


            }

        )
        setContacts(newContacts)

        //details.dateOfBirth= new Date(details.dateOfBirth)
        //console.log('add',details)


    }
    const submitNewPatient = (event) => {
        console.log('submitNewPatient')
        event.preventDefault();

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === detailsPatients.id);



        if(index<0){

            new_patients(Object.assign({}, {institutionNumber:data.institutionNumber,idSecretary:data.id,emailCurrent:data.emailCurrent,
                                                                                        passwordCurrent:data.passwordCurrent}, detailsPatients));
             newContacts[contacts.length]= detailsPatients
        }
        else {
        // mybe can not change the informtion need to think about
            newContacts[index] = detailsPatients
        }
        console.log('newContacts',newContacts)
        setContacts(newContacts);
        setEditContactId(null);
        console.log('change',contacts)
        setDetailsPatients({id:"",firstName:"",lastName:"",dateOfBirth:new Date(),city:"",street:"",buildingNumber:"",firstNameParent:"",lastNameParent:"",email:""})
    };
    const submitNewTherapist = (event) => {
        event.preventDefault()
        detailsTherapist.jobs =detailsTherapist.jobs.split(",")
        addUserFromAdmin(detailsTherapist,data.emailCurrent,
            data.passwordCurrent,"works")
    }
    return (
           <div>
               <CsvFile addNewPatient={addNewPatient}/>
               {/*<input type="file" name="learnCSV" accept="text/csv"/>*/}
           {contacts.length > 0  &&

                           <div className="secretary">
                               <form onSubmit={handleEditFormSubmit}>
                               <table>
                                   <thead>
                                   <tr>
                                       <th>תעודת זהות</th>
                                       <th>שם פרטי</th>
                                       <th>שם משפחה</th>
                                       <th>תאריך לידה</th>
                                       <th>עיר</th>
                                       <th>רחוב</th>
                                       <th>מספר רחוב</th>
                                       {/*<th> שם פרטי הורה</th>*/}
                                       {/*<th> שם משפחה הורה</th>*/}
                                       {/*<th> מייל הורה</th>*/}

                                       {/*parents name or*/}

                                   </tr>
                                   </thead>
                                   <tbody>

                                   {

                                        contacts.map((contact) => (
                                           <Fragment>
                                               { contact!==undefined && editContactId === contact.id ? (
                                                   <EditableRow
                                                       contact={contact}
                                                       /*editFormData={editFormData}*/
                                                       handleEditFormChange={handleEditFormChange}
                                                       handleCancelClick={handleCancelClick}
                                                       inputs={[{type:"text",required:"required",
                                                           placeholder:"Enter a first name..."
                                                           ,name:"firstName"
                                                           ,value:editFormData.firstName,
                                                           },{type:"text",required:"required",
                                                           placeholder:"Enter a last name..."
                                                           ,name:"lastName"
                                                           ,value:editFormData.lastName,
                                                       },
                                                           {type:"date",required:"required",
                                                               placeholder:"Enter a birth day..."
                                                               ,name:"dateOfBirth"
                                                               ,value:editFormData.dateOfBirth,
                                                           },
                                                           {type:"text",required:"required",
                                                               placeholder:"Enter a last city..."
                                                               ,name:"city"
                                                               ,value:editFormData.city,
                                                           },
                                                           {type:"text",required:"required",
                                                               placeholder:"Enter a last street..."
                                                               ,name:"street"
                                                               ,value:editFormData.street,
                                                           },
                                                           {type:"text",required:"required",
                                                               placeholder:"Enter a last buildingNumber..."
                                                               ,name:"buildingNumber"
                                                               ,value:editFormData.buildingNumber,
                                                           }
                                                       ]}

                                                   />
                                               ) : (contact!==undefined)?(
                                                   <ReadOnlyRow
                                                       contact={contact}
                                                       handleEditClick={handleEditClick}
                                                       handleDeleteClick={handleDeleteClick}
                                                       namesFiled={['id','firstName','lastName','dateOfBirth',
                                                           'city','street','buildingNumber']}
                                                   />
                                                   ):
                                                   <div>

                                                   </div>}


                                           </Fragment>
                                       ))}
                                   </tbody>
                               </table>
                               </form>

                           </div>
                       }
                       <form onSubmit={submitNewPatient} >
                                       <h2>
                                           מטופל חדש
                                       </h2>
                                       <div className="form-group">
                                           <label htmlFor="id">תעודות זהות של המטופל:</label>
                                           <input type="number" name="id" id="id" onChange={e=>setDetailsPatients({...detailsPatients,id:e.target.value})} value={detailsPatients.id}/>
                                       </div>
                                       <div className="form-group">
                                           <label htmlFor="DateOfBirth">תאריך לידה מטופל:</label>
                                           <input type="date" name="dateOfBirth" id="DateOfBirth" onChange={e=>setDetailsPatients({...detailsPatients,dateOfBirth:e.target.value})} value={detailsPatients.dateOfBirth}/>
                                           {/*<DatePicker selected={detailsPatients.dateOfBirth} onChange={(date) =>setDetailsPatients({...detailsPatients,dateOfBirth:date})} />*/}
                                       </div>

                                       <div className="form-group" >
                                           <label htmlFor="firstName">שם פרטי:</label>
                                           <input type="text" name="firstName" id="firstName" onChange={e=>setDetailsPatients({...detailsPatients,firstName:e.target.value})} value={detailsPatients.firstName}/>
                                       </div>
                                       <div className="form-group" >
                                           <label htmlFor="lastName">שם משפחה:</label>
                                           <input type="text" name="lastName" id="lastName" onChange={e=>setDetailsPatients({...detailsPatients,lastName:e.target.value})} value={detailsPatients.lastName}/>
                                       </div>
                                       <div className="form-group" >
                                           <label htmlFor="city">עיר</label>
                                           <input type="text" name="city" id="city" onChange={e=>setDetailsPatients({...detailsPatients,city:e.target.value})} value={detailsPatients.city}/>
                                       </div>
                                       <div className="form-group" >
                                           <label htmlFor="street">רחוב</label>
                                           <input type="text" name="street" id="street" onChange={e=>setDetailsPatients({...detailsPatients,street:e.target.value})} value={detailsPatients.street}/>
                                       </div>
                                       <div className="form-group" >
                                           <label htmlFor="buildingNumber">מספר רחוב</label>
                                           <input type="text" name="buildingNumber" id="buildingNumber" onChange={e=>setDetailsPatients({...detailsPatients,buildingNumber:e.target.value})} value={detailsPatients.buildingNumber}/>
                                       </div>
                                       <div className="form-group" >
                                           <label htmlFor="name">שם פרטי הורה:</label>
                                           <input type="text" name="name" id="nameParent" onChange={e=>setDetailsPatients({...detailsPatients,firstNameParent:e.target.value})} value={detailsPatients.firstNameParent}/>
                                       </div>
                                       <div className="form-group" >
                                           <label htmlFor="name">שם משפחה הורה:</label>
                                           <input type="text" name="name" id="nameParent" onChange={e=>setDetailsPatients({...detailsPatients,lastNameParent:e.target.value})} value={detailsPatients.lastNameParent}/>
                                       </div>
                                       <div className="form-group">
                                           <label htmlFor="email">איימיל של הורה:</label>
                                           <input type="email" name="email" id="email" onChange={e=>setDetailsPatients({...detailsPatients,email:e.target.value})} value={detailsPatients.email}/>
                                       </div>

                                       <input type="submit" value="מטופל חדש"/>
                                   </form>
               <form onSubmit={submitNewTherapist}>
                   <h2>
                       מטפל בית ספרי
                   </h2>
                   <div className="form-group" >
                       <label htmlFor="firstName">שם פרטי:</label>
                       <input type="text" name="firstName" id="firstName" onChange={e=>setDetailsTherapist({...detailsTherapist,firstName:e.target.value})} value={detailsTherapist.firstName}/>
                   </div>
                   <div className="form-group" >
                       <label htmlFor="lastName">שם משפחה:</label>
                       <input type="text" name="lastName" id="lastName" onChange={e=>setDetailsTherapist({...detailsTherapist,lastName:e.target.value})} value={detailsTherapist.lastName} />
                   </div>
                   <div className="form-group">
                       <label htmlFor="email">איימיל:</label>
                       <input type="email" name="email" id="email" onChange={e=>setDetailsTherapist({...detailsTherapist,email:e.target.value})} value={detailsTherapist.email} />
                   </div>
                   <div className="form-group">
                       <label htmlFor="jobs">תפקידים</label>
                       <input type="jobs" name="jobs" id="jobs" onChange={e=>setDetailsTherapist({...detailsTherapist,jobs:e.target.value})} value={detailsTherapist.jobs}/>
                   </div>
                   <input type="submit" value="מטפל בית ספרי הוספה"/>
               </form>
           </div>




    )
}