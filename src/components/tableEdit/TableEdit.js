

import React, { useState, Fragment,useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"
import "./tableEdit.css"
import CsvFile from "./CsvFile"


export default  function TableEdit({add,update,deleteObj,emptyDetails,emptyEditDetails,data,HebrewNames,inputsView,requeredId,find}) {

    const [detailsNew,setDetailsNew] = useState(emptyDetails);
    const [contacts, setContacts] = useState([]);
    // const [detailsTherapist,setDetailsTherapist]=useState({firstName:"",lastName:"",email:"",jobs:"",institutes:[data.institutionNumber]})
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState(emptyEditDetails)
    useEffect(()=>{
        const p1 = Promise.resolve(data)
        p1.then(arr=> {
            setContacts(arr)
        })


    },[])
    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData)
        console.log(editFormData,'e1')
    };
    const handleCancelClick = () => {
        setEditContactId(null);
    };
    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id)
        setEditFormData(contact)
    };
    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];
        console.log(contacts)
        const index = contacts.findIndex((contact) => contact.id === contactId);
        deleteObj(contactId)
        newContacts.splice(index, 1)
        setContacts(newContacts)

    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault()
        const editedContact = editFormData
        console.log('editedContact',editFormData)
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact) => contact.id === editContactId);
        newContacts[index] = editedContact
        setContacts(newContacts)
        setEditContactId(null)
        update(editContactId,editedContact)
    };
    const addNews =allDetails => {
        //console.log('new patinet for csv')
        const newContacts = [...contacts]
        let i=0
        allDetails.map(async (details) => {
                newContacts[contacts.length+i] = details
                i++
                await add(details)
            }

        )
        setContacts(newContacts)
    }
    const remove =allDetails => {
        //console.log('new patinet for csv')
        const newContacts = [...contacts]
        const removeIndexs=[]
        allDetails.map(async (details) => {
            let id=""
            if(requeredId){
                id=details.id
            }
            else {
                id= await find(details)
                // const p=Promise.resolve(id)
                // p.then(async id => {
                //     if(id){
                //         handleDeleteClick(id)
                //     }
                // })
            }
            const index = contacts.findIndex((contact) => contact.id === id)
            removeIndexs.push(index)
            console.log(index)
            await deleteObj(id)

            }

        )
        removeIndexs.map((i)=>{
            newContacts.splice(i, 1)
        })
        setContacts(newContacts)
    }
    const addToContacts=(details)=>{
        const newContacts = [...contacts]
        newContacts[contacts.length]= details
        setContacts(newContacts)
    }
    const submitAdd = (event) => {
        event.preventDefault();
        if(!requeredId){
            const p=Promise.resolve(add(detailsNew))
            p.then(async id => {
                if(id){
                    addToContacts({...detailsNew,id:id})
                }
            })
        }
        else {
            const index = contacts.findIndex((contact) => contact.id === detailsNew.id)
            if(index<0){

                add(detailsNew)
                addToContacts(detailsNew)
            }
            else {
                // mybe can not change the informtion need to think about
                //newContacts[index] = detailsNew
            }

        }
        setEditContactId(null);
        setDetailsNew(emptyDetails)
    };
    return (
           <div>
               <CsvFile addNews={addNews} remove={remove}/>
               {/*<input type="file" name="learnCSV" accept="text/csv"/>*/}
           {contacts.length > 0  &&

                           <div className="secretary">
                               <form onSubmit={handleEditFormSubmit}>
                               <table>
                                   <thead>
                                   <tr>
                                       {HebrewNames.map((n) => (

                                           <th>{n}</th>
                                       ))}

                                   </tr>
                                   </thead>
                                   <tbody>

                                   {

                                        contacts.map((contact) => (
                                           <Fragment>
                                               { contact!==undefined && editContactId === contact.id ? (
                                                   <EditableRow
                                                       contact={contact}
                                                       editFormData={editFormData}
                                                       handleEditFormChange={handleEditFormChange}
                                                       handleCancelClick={handleCancelClick}
                                                       inputs={inputsView}
                                                       requeredId={requeredId}

                                                   />
                                               ) : (contact!==undefined)?(
                                                   <ReadOnlyRow
                                                       contact={contact}
                                                       handleEditClick={handleEditClick}
                                                       handleDeleteClick={handleDeleteClick}
                                                       // namesFiled={['firstName','lastName','dateOfBirth',
                                                       //     'city','street','buildingNumber']}
                                                       namesFiled={Object.keys(emptyDetails)}
                                                       requeredId={requeredId}
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
                       <form onSubmit={submitAdd} >
                                       <h2>
                                           חדש
                                       </h2>
                           {requeredId &&
                               <div className="form-group">
                                   <label htmlFor="id">תעודות זהות:</label>
                                   <input type="number" name="id" id="id" onChange={e=>setDetailsNew({...detailsNew,id:e.target.value})} value={detailsNew.id}/>
                               </div>
                           }

                           {
                               inputsView.map((i) => (
                                   <div className="form-group">
                                       <label htmlFor="name">{i.label}</label>
                                       <input
                                           type={i.type}
                                           // required={i.required}
                                           // placeholder={i.placeholder}
                                           id={i.name}
                                           name={i.name}
                                           value={detailsNew[i.name]}
                                           onChange={e=>setDetailsNew({...detailsNew,[i.name]:e.target.value})}
                                       ></input>
                                   </div>
                               ))
                           }

                                       <input type="submit" value="הוסף"/>
                                   </form>

           </div>
    )
}