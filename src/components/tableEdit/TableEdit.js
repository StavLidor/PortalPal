

import React, { useState, Fragment,useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"
import "./tableEdit.css"
import CsvFile from "./CsvFile"


export default  function TableEdit({add,update,deleteObj,emptyDetails,emptyEditDetails,data,HebrewNames,inputsView,requeredId,find}) {

    const [detailsNew,setDetailsNew] = useState(emptyDetails);
    const [contacts, setContacts] = useState([])

    // const [detailsTherapist,setDetailsTherapist]=useState({firstName:"",lastName:"",email:"",jobs:"",institutes:[data.institutionNumber]})
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState(emptyEditDetails)
    useEffect(()=>{
        const p1 = Promise.resolve(data)
        p1.then(arr=> {
            setContacts(arr)
        })


    },[])
    // useEffect(()=>{
    //     setModifyContacts(contacts)
    //     console.log('Modify',modifyContacts)
    //
    // },contacts)

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
    const handleDeleteClick = async (contactId) => {
        const newContacts = [...contacts];
        console.log(contacts)
        const index = contacts.findIndex((contact) => contact.id === contactId);
        if (await deleteObj(contactId)) {
            newContacts.splice(index, 1)
            setContacts(newContacts)
        }


    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault()
        const editedContact = editFormData
        console.log('editedContact', editFormData)

        if(await update(editContactId, editedContact)){
            const newContacts = [...contacts];
            const index = contacts.findIndex((contact) => contact.id === editContactId);
            newContacts[index] = editedContact
            setContacts(newContacts)
            setEditContactId(null)
        }
    };
    const addNews =allDetails => {
        //console.log('new patinet for csv')

        let i=0
        let count=0
        const newContacts = [...contacts]
        console.log('length allDetails',allDetails.length)
        allDetails.map(async (details) => {

            // const newContacts = [...contacts]
            const promiseId=await add(details)
            const p = Promise.resolve(promiseId)
            let modifyContacts =((flag)=>{
                count++
                if (flag){
                    console.log('add',i,promiseId)
                    console.log('count',count)
                    newContacts[contacts.length+i]={...details,id:promiseId}
                }

                if(count == allDetails.length){
                    setContacts(newContacts)
                }
            })

            console.log(i,'NUMBER')
            p.then(async id => {

                console.log('SEEEEEEEEC', id, i)
                if(id){
                    modifyContacts(true)
                    console.log('BEFORE ADD C')

                    // addToContacts({...details,id:id})
                    console.log('AFTER ADD C',contacts)

                }
                else {
                    modifyContacts(false)
                    console.log(false)
                }

            })
            i++
            console.log()


            }


        )
            //setContacts(newContacts)
    }
    const remove =allDetails => {
        //console.log('new patinet for csv')
        const newContacts = [...contacts]

        let count=0
        allDetails.map(async (details) => {
            let modifyContacts =((flag)=> {
                count++
                //console.log('modifyContacts',flag)
                if (flag) {
                    const index = contacts.findIndex((contact) => contact.id === id)
                    newContacts.splice(index, 1)
                }
                if(count == allDetails.length){
                    setContacts(newContacts)
                }
            })
            let id=""
            if(requeredId){
                id=details.id
            }
            else {
                id= await find(details)
            }
            const p = Promise.resolve(id)
            p.then(async id => {
                deleteObj(id).then((flag)=>{
                    modifyContacts(flag)
                    if(flag){

                    }
                })
            })
            }

        )
    }
    const addToContacts=(details)=>{
        const newContacts = [...contacts]
        newContacts[contacts.length]= details
        setContacts(newContacts)
    }
    const submitAdd = (event) => {
        event.preventDefault();
        const p=Promise.resolve(add(detailsNew))
        p.then(async id => {
            if(id){
                const index = contacts.findIndex((contact) => contact.id === detailsNew.id)
                if(index<0){
                    addToContacts({...detailsNew,id:id})
                }
                else {
                    // mybe can not change the informtion need to think about
                    //newContacts[index] = detailsNew
                }

            }
        })
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