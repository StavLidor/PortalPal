

import React, { useState, Fragment,useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"
import "./tableEdit.css"
import CsvFile from "./CsvFile"
import {updatesPatients} from "../../firebase";


export default  function TableEdit({
                       add,
                       update,
                       deleteObj,
                       emptyDetails,
                       emptyEditDetails,data
                                       ,HebrewNames,inputsView,requeredId,find,
                                       addTable,
                                       updateTable,
                                       deleteObjTable,
                                       emptyDetailsTable,
                                       emptyEditDetailsTable
                                       ,HebrewNamesTable,
                                       inputsViewTable,toEdit, toAdd
                            ,table}) {





    const [detailsNew,setDetailsNew] = useState(emptyDetails);
    const [contacts, setContacts] = useState([])
    const [contactTable,setContactTable]=useState(null)

    // const [detailsTherapist,setDetailsTherapist]=useState({firstName:"",lastName:"",email:"",jobs:"",institutes:[data.institutionNumber]})
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState(
        function (){
            if(toEdit){
                return emptyEditDetails
            }
            return null
        }()
    )
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
    const handleOpen=(event,contact)=>{
        event.preventDefault()
        if (contactTable === null){
            setContactTable(contact)
        }
        // if(contact.id !== contactTable.id){
        //     //setContactTable(null)
        //     // handleClose(event,contactTable)
        //     // console.log('1',contactTable)
        //     setContactTable(null)
        //     //handleOpen(event,contact)
        //     //setContactTable(contact)
        //     //console.log('2',contactTable)
        //     //setContactTable(contact)
        //     // setInterval(function() {
        //     //     setContactTable(contact)
        //     //     //call $.ajax here
        //     // }, 1); //5 seconds
        //     //setContactTable(contact)
        //
        // }

        // console.log('OPENN',contact.id)
    }
    const handleClose=(event,contact)=>{
        event.preventDefault()
        if(contact.id === contactTable.id)
            setContactTable(null)
    }
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
            if(contactId === contactTable.id){
                setContactTable(null)
            }
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
                    if(id === contactTable.id){
                        setContactTable(null)
                    }
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
               {toAdd && <CsvFile addNews={addNews} remove={remove}/>}

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
                                               { contact!==undefined && editContactId === contact.id && toEdit ? (
                                                   <EditableRow
                                                       contact={contact}
                                                       editFormData={editFormData}
                                                       handleEditFormChange={handleEditFormChange}
                                                       handleCancelClick={handleCancelClick}
                                                       inputs={inputsView}
                                                       requeredId={requeredId}
                                                       table={table}

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
                                                       toEdit={toEdit}
                                                       table={table}

                                                       handleOpen={
                                                           function (){
                                                               if(table !== undefined && contactTable == null){
                                                                   return handleOpen
                                                               }
                                                               return null
                                                                       }
                                                                       ()

                                                                }
                                                       handleClose={
                                                           function (){
                                                               if(table !== undefined && contactTable == null ||table !== undefined &&
                                                                    contact.id == contactTable.id){
                                                                   return handleClose
                                                               }
                                                               return  null
                                                           }
                                                           ()
                                                       }
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
               {toAdd &&
                   <form onSubmit={submitAdd}>
                       <h2>
                           חדש
                       </h2>
                       {requeredId &&
                           <div className="form-group">
                               <label htmlFor="id">תעודות זהות:</label>
                               <input type="number" name="id" id="id"
                                      onChange={e => setDetailsNew({...detailsNew, id: e.target.value})}
                                      value={detailsNew.id}/>
                           </div>
                       }


                       {inputsView.map((i) => (
                       <div className="form-group">
                           <label htmlFor="name">{i.label}</label>
                           <input
                               type={i.type}
                               // required={i.required}
                               // placeholder={i.placeholder}
                               id={i.name}
                               name={i.name}
                               value={detailsNew[i.name]}
                               onChange={e => setDetailsNew({...detailsNew, [i.name]: e.target.value})}
                           ></input>
                       </div>
                       ))}


                       <input type="submit" value="הוסף"/>
                   </form>

               }
               <Fragment>
               {contactTable &&
                   <div>



                       <div>{contactTable.id}</div>
                       <TableEdit add ={addTable} update ={updateTable} deleteObj={deleteObjTable}
                                  emptyDetails={emptyDetailsTable} emptyEditDetails={emptyEditDetailsTable} data={table(contactTable)/*contactTable[tableName]*/}
                                  HebrewNames={HebrewNamesTable} inputsView={inputsViewTable}  requeredId={true}
                                  toEdit={false} toAdd={true}/>
                   </div>


               }
               </Fragment>


           </div>
    )
}