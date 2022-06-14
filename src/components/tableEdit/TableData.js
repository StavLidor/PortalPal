import React, {useState, Fragment, useEffect} from "react"
import "react-datepicker/dist/react-datepicker.css"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"
import "./tableData.css"
import {Button, Form, Row, Col, Container, ButtonGroup, Table, Grid, Modal} from 'react-bootstrap'
import firebase from "firebase/compat/app";
import AddThroughCsvFile from "./AddThroughCsvFile";
import { Plus} from 'react-bootstrap-icons';
import ToCsvFile from "./ToCsvFile";


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
                                      columnsInfoViewTable
                                      , table, getTable,optionIds,tableOptionIds,isEmptyTable,
                                      isReloadTable
                                  }) {


    const [detailsNew, setDetailsNew] = useState(emptyDetails)
    const [messages, setMessages] = useState({

    })
    const [contacts, setContacts] = useState([])
    const [addSomeone, setAddSomeone] = useState(false)
    const [addOrRemoveBatch, setAddOrRemoveBatch] = useState(false)
    const [contactTable, setContactTable] = useState(null)
    const [show, setShow] = useState(false)
    const [load,setLoad]=useState(false)
    const closeDialog = () => setAddSomeone(false)
    const handleShow = () => setShow(true)


    // const [detailsTherapist,setDetailsTherapist]=useState({firstName:"",lastName:"",email:"",jobs:"",institutes:[data.institutionNumber]})
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState(emptyEditDetails
        // function () {
        //     if (toEdit) {
        //         return emptyEditDetails
        //     }
        //     return null
        // }()
    )
    useEffect(() => {
        const p1 = Promise.resolve(data)
        p1.then(arr => {
            setContacts(arr)
        })


    }, [data])
    // useEffect(()=>{
    //     setModifyContacts(contacts)
    //
    // },contacts)

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value
        const newFormData = {...editFormData}
        newFormData[fieldName] = fieldValue
        if (event.target.type === 'date') {
            newFormData[fieldName] = firebase.firestore.Timestamp.fromDate(new Date(fieldValue))
        }
        // const newFormData = {...editFormData}
        // newFormData[fieldName] = fieldValue
        setEditFormData(newFormData)
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
        const index = contacts.findIndex((contact) => contact.id === contactId)
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

        if (await update(editContactId, editedContact)) {
            // const newContacts = [...contacts];
            // const index = contacts.findIndex((contact) => contact.id === editContactId);
            // newContacts[index] = editedContact
            // setContacts(newContacts)
            setEditContactId(null)
        }
        setEditContactId(null)
    };
    const addNews = allDetails => {

        let i = 0
        let count = 0
        const newContacts = [...contacts]
        allDetails.map(async (details) => {

                // const newContacts = [...contacts]
                const promiseId = await add(details,((messages)=>{

                }))
                const p = Promise.resolve(promiseId)
                let modifyContacts = ((flag) => {
                    count++
                    if (flag) {
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

                p.then(async id => {

                    if (id) {
                        modifyContacts(true)

                        // addToContacts({...details,id:id})

                    } else {
                        modifyContacts(false)
                    }

                })
                i++


            }
        )
        //setContacts(newContacts)
    }
    const remove = allDetails => {
        const newContacts = [...contacts]

        let count = 0
        allDetails.map(async (details) => {
                let modifyContacts = ((flag) => {
                    count++
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
        setLoad(true)
        const p = Promise.resolve(add(detailsNew, setMessages))
        p.then(async id => {
            if (id) {
                const index = contacts.findIndex((contact) => contact.id === detailsNew.id)
                if (index < 0) {
                    // if (typeof (id) == "string") {
                    //     addToContacts({...detailsNew, id: id})
                    // } else {
                    //     addToContacts(Object.assign({}, detailsNew, id))
                    // }
                    // setEditContactId(null);
                    setLoad(false)
                    setDetailsNew(emptyDetails)
                    setAddSomeone(false)

                } else {
                    // mybe can not change the informtion need to think about
                    //newContacts[index] = detailsNew
                }

            }
        })

    };

    return (
        <div>

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
                                    {contact !== undefined  && editContactId === contact.id ? (
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
                                                updateTable={updateTable}
                                                addTable={addTable} /*deleteObj={deleteObj}*/
                                                deleteObjTable={deleteObjTable}
                                                emptyDetailsTable={emptyDetailsTable} emptyEditDetailsTable={emptyEditDetailsTable}
                                                /*data={table/*contactTable[tableName]}*/
                                                HebrewNames={HebrewNamesTable} columnsInfoViewTable={columnsInfoViewTable}
                                                contact={contact}
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                                columnsInfo={columnsInfoView}
                                                requiredId={requiredId}
                                                table={table}
                                                getTable={getTable}
                                                tableOptionIds={tableOptionIds}
                                                isEmptyTable={isEmptyTable}
                                                isReloadTable={isReloadTable}
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


            {addSomeone && <Modal show={addSomeone} onHide={()=>{
                setDetailsNew(emptyDetails)
                setMessages(emptyDetails)
                setAddSomeone(false)
            }}>
                <Modal.Header>
                    <Modal.Title style={{fontWeight:"bold", fontSize:35}}>{"הוספת " + type + " חדש"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="needs-validation" noValidate>
                        <Col>
                            <Row>
                                {requiredId &&
                                    (optionIds!== undefined)?(
                                    <Form.Label style={{fontSize:20}}>תעודת זהות:
                                            <Form.Select  type="text" name="type" id="type"
                                                    onChange={e => setDetailsNew({
                                                    ...detailsNew,
                                                    id: e.target.value
                                                })}
                                                    value={detailsNew.id}>
                                                {
                                                    optionIds.map((op) => (
                                                    // <option value={op}>{op}</option>
                                                    <option style={{fontSize: 18}} value={op.id}>{op.id+" "+op.information}</option>

                                                    ))
                                                }
                                            </Form.Select>
                                    </Form.Label>
                                    ):(requiredId)?(<div className="form-group">

                                    <Form.Label style={{fontSize:20}} for="validationDefault01" htmlFor="id">תעודת זהות:</Form.Label>
                                    <Form.Control id='validationDefault01' required type="text" name="id"
                                    onChange={e => setDetailsNew({...detailsNew, id: e.target.value})}
                                    value={detailsNew.id}/>
                                    </div>):<div></div>

                                }
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.id}
                                </div>
                                {columnsInfoView.map((i) => (
                                    i.add &&
                                    <div className="form-group">
                                        {'options' in i &&
                                        <Form.Label style={{fontSize:20}}>{i.label}
                                            <Form.Select  type="text" name="type" id="type"
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
                                            <Form.Label style={{fontSize:20}} for="validationDefault01" htmlFor="name">{i.label}</Form.Label>
                                            <Form.Control id='validationDefault01' required
                                                autoFocus
                                                type={i.type}
                                                // required={i.required}
                                                // placeholder={i.placeholder}
                                                /*id={i.name}*/
                                                name={i.name}
                                                value={detailsNew[i.name]}
                                                onChange={e => setDetailsNew({...detailsNew, [i.name]: e.target.value})}
                                            ></Form.Control>
                                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                                {messages[i.name]}
                                            </div>

                                        </div>
                                        }
                                    </div>
                                ))}

                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setAddSomeone(false)
                        setDetailsNew(emptyDetails)
                        setMessages(emptyDetails)}}>
                        בטל
                    </Button>
                    {
                        (!load)?(
                            <Button variant="success" onClick={() => {
                                // setAddSomeone(false)
                                submitAddDialog()
                            }}>
                                שמור
                            </Button>
                        ):(
                            <Button variant="success" >
                                טוען...
                            </Button>
                        )

                    }

                </Modal.Footer>
            </Modal>}
            <Row>
            <Col md={"auto"} className="gap-1" >
                <Row>
                <Button className="m-2 p-2" style={{fontWeight: "bold",width:'100%'}} variant="outline-primary" onClick={() => {
                    setAddSomeone(true)
                }}><Plus style={{fontSize: 20}}/> {"הוסף " + type + " חדש"}</Button>
                </Row>

                 <Row><Button className="m-2 p-2" style={{fontWeight: "bold",width:'100%'}} variant="outline-primary" onClick={() => {
                    setAddOrRemoveBatch(true)
                }}>{"הוסף או הסר מקבץ"}</Button></Row>


                <Row ><ToCsvFile col={columnsInfoView} list={contacts} style={{width:'100%'}} /></Row>
            </Col>

            </Row>
            {addOrRemoveBatch && <AddThroughCsvFile addBatch={addOrRemoveBatch} setAddBatch={setAddOrRemoveBatch} add={addNews} remove={remove}/>}





        </div>
    )
}