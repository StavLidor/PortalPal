import React, {useState, Fragment, useEffect} from "react"
import "react-datepicker/dist/react-datepicker.css"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"
import "./tableEdit.css"
import CsvFile from "./CsvFile"
import {updatesPatients} from "../../firebase";
import {Button, Form, Row, Col, Container, ButtonGroup, Table, Grid, Modal} from 'react-bootstrap'
import firebase from "firebase/compat/app";
import AddThroughCsvFile from "./AddThroughCsvFile";


export default function TableData({
                                      type,
                                      add,
                                      update,
                                      deleteObj,
                                      emptyDetails,
                                      emptyEditDetails, data
                                      , HebrewNames, columnsInfoView, requiredId, find,
                                      addTable,
                                      updateTable,
                                      deleteObjTable,
                                      emptyDetailsTable,
                                      emptyEditDetailsTable
                                      , HebrewNamesTable,
                                      columnsInfoViewTable, toEdit, toAdd
                                      , table, getTable/*addDetails,addDetailsTable*/
                                  }) {


    const [detailsNew, setDetailsNew] = useState(emptyDetails);
    const [contacts, setContacts] = useState([])
    const [addSomeone, setAddSomeone] = useState(false)
    const [addOrRemoveBatch, setAddOrRemoveBatch] = useState(false)
    const [contactTable, setContactTable] = useState(null)
    const [show, setShow] = useState(false);
    const closeDialog = () => setAddSomeone(false);
    const handleShow = () => setShow(true);


    // const [detailsTherapist,setDetailsTherapist]=useState({firstName:"",lastName:"",email:"",jobs:"",institutes:[data.institutionNumber]})
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState(
        function () {
            if (toEdit) {
                return emptyEditDetails
            }
            return null
        }()
    )
    useEffect(() => {
        console.log("DATAAAAA:", data)
        const p1 = Promise.resolve(data)
        p1.then(arr => {
            setContacts(arr)
        })


    }, [data])
    // useEffect(()=>{
    //     setModifyContacts(contacts)
    //     console.log('Modify',modifyContacts)
    //
    // },contacts)
    const handleOpen = (event, contact) => {
        event.preventDefault()
        if (contactTable === null) {
            setContactTable(contact)
            getTable(contact)
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
    const handleClose = (event, contact) => {
        event.preventDefault()
        if (contact.id === contactTable.id) {
            setContactTable(null)
            getTable(null)
        }

    }
    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value
        const newFormData = {...editFormData}
        newFormData[fieldName] = fieldValue
        if (event.target.type === 'date') {
            newFormData[fieldName] = firebase.firestore.Timestamp.fromDate(new Date(fieldValue))
        }
        console.log(fieldName, fieldValue)
        // const newFormData = {...editFormData}
        // newFormData[fieldName] = fieldValue
        setEditFormData(newFormData)
        console.log(editFormData, 'e1')
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
        const index = contacts.findIndex((contact) => contact.id === contactId)
        console.log("IDDDDDDDDDDDDDD: ", contacts[index])
        if (await deleteObj(contacts[index]/*contactId*/)) {
            // newContacts.splice(index, 1)
            if (contactTable && contactId === contactTable.id) {
                setContactTable(null)
            }
            // setContacts(newContacts)
        }
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault()
        const editedContact = editFormData
        console.log('editedContact', editFormData)

        if (await update(editContactId, editedContact)) {
            const newContacts = [...contacts];
            const index = contacts.findIndex((contact) => contact.id === editContactId);
            newContacts[index] = editedContact
            // setContacts(newContacts)
            setEditContactId(null)
        }
    };
    const addNews = allDetails => {
        //console.log('new patinet for csv')

        let i = 0
        let count = 0
        const newContacts = [...contacts]
        console.log('length allDetails', allDetails.length)
        allDetails.map(async (details) => {

                // const newContacts = [...contacts]
                const promiseId = await add(details)
                const p = Promise.resolve(promiseId)
                let modifyContacts = ((flag) => {
                    count++
                    if (flag) {
                        console.log('add', i, promiseId)
                        console.log('count', count)
                        if (typeof (promiseId) == "string") {
                            newContacts[contacts.length + i] = {...details, id: promiseId}
                        } else {
                            newContacts[contacts.length + i] = Object.assign({}, detailsNew, promiseId)
                        }
                    }

                    if (count === allDetails.length) {
                        // setContacts(newContacts)
                    }
                })

                console.log(i, 'NUMBER')
                p.then(async id => {

                    console.log('SEEEEEEEEC', id, i)
                    if (id) {
                        modifyContacts(true)
                        console.log('BEFORE ADD C')

                        // addToContacts({...details,id:id})
                        console.log('AFTER ADD C', contacts)

                    } else {
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
    const remove = allDetails => {
        //console.log('new patinet for csv')
        const newContacts = [...contacts]

        let count = 0
        allDetails.map(async (details) => {
                let modifyContacts = ((flag) => {
                    count++
                    //console.log('modifyContacts',flag)
                    if (flag) {
                        const index = contacts.findIndex((contact) => contact.id === id)
                        if (id === contactTable.id) {
                            setContactTable(null)
                        }
                        newContacts.splice(index, 1)
                    }
                    if (count === allDetails.length) {
                        // setContacts(newContacts)
                    }
                })
                let id = ""
                if (requiredId) {
                    id = details.id
                } else {
                    id = await find(details)
                }
                const p = Promise.resolve(id)
                p.then(async id => {
                    const index = contacts.findIndex((contact) => contact.id === id)
                    deleteObj(contacts[index]).then((flag) => {
                        modifyContacts(flag)
                        if (flag) {

                        }
                    })
                })
            }
        )
    }
    const addToContacts = (details) => {
        const newContacts = [...contacts]
        newContacts[contacts.length] = details
        // setContacts(newContacts)
    }
    const submitAddDialog = () => {
        console.log("hereeeeeeeeeee")
        const p = Promise.resolve(add(detailsNew))
        p.then(async id => {
            if (id) {
                const index = contacts.findIndex((contact) => contact.id === detailsNew.id)
                if (index < 0) {
                    if (typeof (id) == "string") {
                        addToContacts({...detailsNew, id: id})
                        console.log(detailsNew)
                    } else {
                        addToContacts(Object.assign({}, detailsNew, id))
                    }
                } else {
                    // mybe can not change the informtion need to think about
                    //newContacts[index] = detailsNew
                }

            }
        })
        setEditContactId(null);
        setDetailsNew(emptyDetails)
    };
    const submitAdd = (event) => {
        event.preventDefault();
        const p = Promise.resolve(add(detailsNew))
        p.then(async id => {
            if (id) {
                const index = contacts.findIndex((contact) => contact.id === detailsNew.id)
                if (index < 0) {
                    if (typeof (id) == "string") {
                        addToContacts({...detailsNew, id: id})
                        console.log(detailsNew)
                    } else {
                        addToContacts(Object.assign({}, detailsNew, id))
                    }
                } else {
                    // mybe can not change the informtion need to think about
                    //newContacts[index] = detailsNew
                }

            }
        })
        setEditContactId(null);
        setDetailsNew(emptyDetails)
    };
    console.log("type", type)

    return (
        <div>
            {/*{toAdd && <CsvFile addNews={addNews} remove={remove}/>}*/}
            {/*{toAdd && <AddThroughCsvFile/>}*/}

            {/*<input type="file" name="learnCSV" accept="text/csv"/>*/}
            {contacts.length > 0 &&

            <div className="secretary">
                <form onSubmit={handleEditFormSubmit}>
                    <Table className="table-responsive" striped bordered hover size="md">
                        <thead>
                        <tr>
                            {HebrewNames.map((n) => (
                                <th style={{fontSize: 20}} className="text-center align-baseline p-1">{n}</th>
                            ))}

                        </tr>
                        </thead>
                        <tbody>

                        {
                            contacts.map((contact) => (
                                <Fragment>
                                    {contact !== undefined && toEdit && editContactId === contact.id ? (
                                        <EditableRow
                                            contact={contact}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                            columnsInfo={columnsInfoView}
                                            requiredId={requiredId}
                                            table={table}

                                        />
                                    ) : (contact !== undefined) ? (

                                            <ReadOnlyRow
                                                contact={contact}
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                                // namesFiled={['firstName','lastName','dateOfBirth',
                                                //     'city','street','buildingNumber']}
                                                columnNames={Object.keys(emptyDetails)}
                                                columnsInfo={columnsInfoView}
                                                requiredId={requiredId}
                                                toEdit={toEdit}
                                                table={table}

                                                handleOpen={
                                                    function () {
                                                        if (table !== undefined && contactTable == null) {
                                                            return handleOpen
                                                        }
                                                        return null
                                                    }
                                                    ()

                                                }
                                                handleClose={
                                                    function () {
                                                        if (table !== undefined && contactTable == null || table !== undefined &&
                                                            contact.id == contactTable.id) {
                                                            return handleClose
                                                        }
                                                        return null
                                                    }
                                                    ()
                                                }
                                            />

                                        ) :
                                        <div>

                                        </div>}
                                </Fragment>
                            ))}
                        </tbody>
                    </Table>
                </form>

            </div>
            }
            {<Button onClick={() => {
                console.log("show dialog")
                setAddSomeone(true)
            }}>{"הוסף " + type + " חדש"}</Button>}
            {addSomeone && <Modal show={addSomeone} onHide={()=>setAddSomeone(false)}>
                <Modal.Header>
                    <Modal.Title>{"הוסף " + type + " חדש"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Row>
                                {requiredId &&
                                <div className="form-group">
                                    <Form.Label htmlFor="id">תעודות זהות:</Form.Label>
                                    <Form.Control type="text" name="id" id="id"
                                                  onChange={e => setDetailsNew({...detailsNew, id: e.target.value})}
                                                  value={detailsNew.id}/>
                                </div>
                                }
                                {columnsInfoView.map((i) => (
                                    i.add &&
                                    <div className="form-group">
                                        {'options' in i &&
                                        <Form.Label>{i.label}
                                            <Form.Select type="text" name="type" id="type"
                                                         onChange={e => setDetailsNew({
                                                             ...detailsNew,
                                                             [i.name]: e.target.value
                                                         })}
                                                         value={detailsNew[i.name]}>
                                                {
                                                    i.options.map((op) => (
                                                        // <option value={op}>{op}</option>
                                                        <option style={{fontSize: 18}} value={op}>{op}</option>

                                                    ))


                                                }
                                            </Form.Select>
                                        </Form.Label>
                                            // </label>

                                        }
                                        {!('options' in i) &&
                                        <div>
                                            <Form.Label htmlFor="name">{i.label}</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                type={i.type}
                                                // required={i.required}
                                                // placeholder={i.placeholder}
                                                id={i.name}
                                                name={i.name}
                                                value={detailsNew[i.name]}
                                                onChange={e => setDetailsNew({...detailsNew, [i.name]: e.target.value})}
                                            ></Form.Control>

                                        </div>
                                        }
                                    </div>
                                ))}

                            </Row>
                            {/*<Row>*/}
                            {/*    <Form.Group controlId="summary">*/}
                            {/*        <Form.Label>סיכום מפגש</Form.Label>*/}
                            {/*        <Form.Control*/}
                            {/*            type="text"*/}
                            {/*            onChange={e => setNewSession({...newSession, summary: e.target.value})}*/}

                            {/*        />*/}
                            {/*    </Form.Group>*/}
                            {/*</Row>*/}
                            {/*<Row>*/}
                            {/*    <Form.Group controlId="title">*/}
                            {/*        <Form.Label>כותרת</Form.Label>*/}
                            {/*        <Form.Control*/}
                            {/*            type="text"*/}
                            {/*            onChange={e => setNewSession({...newSession, title: e.target.value})}*/}

                            {/*        />*/}
                            {/*    </Form.Group>*/}
                            {/*</Row>*/}


                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddSomeone(false)}>
                        בטל
                    </Button>
                    <Button variant="primary" onClick={() => {
                        // handleClose()
                        // handleOnSubmit()
                        setAddSomeone(false)
                        submitAddDialog()
                    }}>
                        שמור
                    </Button>
                </Modal.Footer>
            </Modal>}
            <tr>
                <br/>
                {<Button onClick={() => {
                    console.log("show dialog")
                    setAddOrRemoveBatch(true)
                }}>{"הוסף או חסר מקבץ"}</Button>}
            </tr>
            {addOrRemoveBatch && <AddThroughCsvFile addBatch={addOrRemoveBatch} setAddBatch={setAddOrRemoveBatch} add={addNews} remove={remove}/>}
            {/*{toAdd && addSomeone &&*/}
            {/*<form onSubmit={submitAdd}>*/}
            {/*    <h2>*/}
            {/*        חדש*/}
            {/*    </h2>*/}
            {/*    {requiredId &&*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="id">תעודות זהות:</label>*/}
            {/*        <input type="number" name="id" id="id"*/}
            {/*               onChange={e => setDetailsNew({...detailsNew, id: e.target.value})}*/}
            {/*               value={detailsNew.id}/>*/}
            {/*    </div>*/}
            {/*    }*/}


            {/*    {columnsInfoView.map((i) => (*/}
            {/*        i.add &&*/}
            {/*        <div className="form-group">*/}

            {/*            {'options' in i &&*/}
            {/*            <label>:{i.label}*/}
            {/*                <select type="text" name="type" id="type"*/}
            {/*                        onChange={e => setDetailsNew({...detailsNew, [i.name]: e.target.value})}*/}
            {/*                        value={detailsNew[i.name]}>*/}
            {/*                    {*/}
            {/*                        i.options.map((op) => (*/}
            {/*                            <option value={op}>{op}</option>*/}
            {/*                        ))*/}


            {/*                    }*/}

            {/*                </select>*/}

            {/*            </label>*/}

            {/*            }*/}
            {/*            {!('options' in i) &&*/}
            {/*            <div>*/}
            {/*                <label htmlFor="name">{i.label}</label>*/}
            {/*                <input*/}
            {/*                    type={i.type}*/}
            {/*                    // required={i.required}*/}
            {/*                    // placeholder={i.placeholder}*/}
            {/*                    id={i.name}*/}
            {/*                    name={i.name}*/}
            {/*                    value={detailsNew[i.name]}*/}
            {/*                    onChange={e => setDetailsNew({...detailsNew, [i.name]: e.target.value})}*/}
            {/*                ></input>*/}
            {/*            </div>*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    ))}*/}


            {/*    <input type="submit" value="הוסף"/>*/}
            {/*</form>*/}

            {/*}*/}
            <Fragment>
                {contactTable &&
                <div>


                    <div>{contactTable.id}</div>
                    <TableData type="תלמיד"
                               add={addTable} deleteObj={deleteObjTable}
                               emptyDetails={emptyDetailsTable} emptyEditDetails={emptyEditDetailsTable}
                               data={table/*contactTable[tableName]*/}
                               HebrewNames={HebrewNamesTable} columnsInfoView={columnsInfoViewTable} requiredId={true}
                               toEdit={false} toAdd={true}
                        /*addDetails={addDetailsTable}*//>
                </div>


                }
            </Fragment>


        </div>
    )
}