import React, {useEffect, useState} from "react"
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query, updateDoc,
    where
} from "firebase/firestore";
import {auth, db, updateIDDoc} from "../../firebase";

import firebase from "firebase/compat/app"
import {Button, Collapse, Modal, Form, Row, Col, Accordion} from "react-bootstrap";
import {Plus, Pencil, Trash} from 'react-bootstrap-icons';


function PatientExercises({patient, therapist, type}) {
    const [exercisesData, setExercisesData] = useState([])
    const [open, setOpen] = useState(false)
    const [empty, editEmpty] = useState(false)

    const [newExercise, setNewExercise] = useState({
        until: '',
        description: '',
        // patient: patient,
        place: '',
        // therapist: therapist
    })
    // const [messages, setMessages] = useState({
    //     until: '',
    //     description: '',
    //     // patient: patient,
    //     place: '',
    // })
    // const [addExercise, setAddExercise] = useState(false)

    useEffect(async () => {
        //console.log('useEffect')
        const q = query(collection(db, "patients/" + patient + "/therapists/" + therapist + "/exercises"), orderBy("createdAt", "desc"))
        if (type === 'parent') {
            console.log('allDetailsExercises222')

            const arr = []
            getDocs(q).then((querySnapshot) => {
                if (querySnapshot.docs.length === 0) {
                    editEmpty(true)
                } else {
                    editEmpty(false)
                }
                querySnapshot.forEach((doc) => {
                    arr.push({...doc.data(), id: doc.id})
                    console.log('id', doc.id)
                    // if (doc.data().client === id){
                    //
                    // }
                    console.log("ARR: ", arr)


                });
                if (arr.length === 0) {
                    editEmpty(true)
                }
                setExercisesData(arr)
            })
        } else {
            return onSnapshot(
                q,
                (querySnapshot) => {
                    let data = []
                    if (querySnapshot.docs.length === 0) {
                        editEmpty(true)
                    } else {
                        editEmpty(false)
                    }
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)

                        data.push({...doc.data(), id: doc.id})

                    ))
                    console.log("DATA: ", data)
                    if (data.length === 0) {
                        editEmpty(true)
                    }
                    setExercisesData(data)

                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })
        }
    }, [])

    const checkData = (setMessages, exercise) => {
        const messagesSubmit = {
            until: '',
            description: '',
            // patient: patient,
            place: '',
        }
        // e.preventDefault()
        console.log(exercise.until === "")
        if (exercise.until === "") {
            messagesSubmit.until = 'הכנס תאריך סיום'
        }
        if (!exercise.description.trim()) {
            messagesSubmit.description = 'הכנס תיאור תרגיל'
        }
        if (!exercise.place.trim()) {
            messagesSubmit.place = 'הכנס מקום תרגיל'
        }
        setMessages(messagesSubmit)
        console.log(messagesSubmit)
        if (!messagesSubmit.until.trim() && !messagesSubmit.description.trim() && !messagesSubmit.place.trim()) {
            return true
        }
        return false
    }
    const handleOnSubmit = async (setMessages) => {
        if (checkData(setMessages, newExercise)) {
            newExercise.until = firebase.firestore.Timestamp.fromDate(new Date(newExercise.until))
            await addDoc(collection(db, "patients/" + patient + "/therapists/" + therapist + '/exercises'), {
                ...newExercise,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date())
                //createdAt: firebase.firestore.Timestamp.fromDate(new Date(newExercise.createdAt)),
                // until: firebase.firestore.Timestamp.fromDate(new Date(newExercise.until))
            })
            return true
        }
        console.log('false')
        return false
        // const docRef = await addDoc(collection(db, "exercises"),
        //     { ...newExercise,createdAt:firebase.firestore.FieldValue.serverTimestamp()})

    }
    const handleDelete = async docId => {
        await deleteDoc(doc(collection(db, "patients"), patient, "therapists", therapist, 'exercises',
            docId))
        // await deleteDoc(doc(db, "exercises", docId))
    }
    const handleUpdate = async (docId, data, setMessages) => {
        console.log("dataaaaaaaaaaaa:", data)
        console.log("dataaaaaaaaaaaa until:", data.until)
        if (!checkData(setMessages, data)) {
            return false
        }
        // await updateIDDoc(docId, "exercises", data)
        await updateDoc(doc(collection(db, "patients"), patient, "therapists", therapist, 'exercises',
            docId), data
            //     {
            //     ...data,
            //     // createdAt: firebase.firestore.FieldValue.serverTimestamp()
            //     // until: firebase.firestore.Timestamp.fromDate(new Date(data.until))
            //     until: firebase.firestore.Timestamp.fromDate(new Date(data.until))
            // }
        )
        return true
    }

    // console.log(new Date(exercisesData[0].createdAt.seconds * 1000).getYear() + '-'+new Date(exercisesData[0].createdAt.seconds * 1000).getMonth()+ '-'+new Date(exercisesData[0].createdAt.seconds * 1000).getDay())
    // console.log(exercisesData[0].createdAt.toDate().getMonth())
    // console.log(exercisesData[0].until.toDate().getFullYear() + '-' + (exercisesData[0].until.toDate().getMonth() + 1) + '-' + exercisesData[0].until.toDate().getDate())
    return (
        <div>
            <Row className='p-2 align-content-start'>
                <div style={{width: 'auto'}}>
                    <Form.Label className='fs-2' style={{fontWeight: 'bold'}}>רשימת תרגילים</Form.Label></div>
                <div style={{width: 'auto', alignSelf: "center"}}>
                    <AddExerciseDialog type={type} setNewExercise={setNewExercise} newExercise={newExercise}
                                       handleOnSubmit={handleOnSubmit}/>
                </div>
            </Row>
            {empty && exercisesData.length === 0 &&
            <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>כרגע, לא קיימים תרגילים.</Form.Label>
            </Row>}
            {!empty && exercisesData.length === 0 &&
            <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>טוען...</Form.Label> </Row>}
            <Accordion className='justify-content-center' style={{width: '70%'}} alwaysOpen={true}>
                {
                    exercisesData.map((e, i) => (
                            // <>

                            <Accordion.Item eventKey={e.id}>
                                <Accordion.Header>
                                    {e.createdAt !== null && new Date(e.createdAt.seconds * 1000).toLocaleDateString() + ' ' + e.description}
                                    &nbsp;&nbsp;
                                    {/*{e.createdAt.toDate().toUTCString() + e.place}*/}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Col>
                                        {/*<Row>*/}
                                        {/*    <Form.Text>*/}
                                        {/*        שם:*/}
                                        {/*        &nbsp;*/}
                                        {/*        שם חובהההה*/}
                                        {/*    </Form.Text>*/}
                                        {/*</Row>*/}

                                        <Row>
                                            <Form.Text>
                                                תאריך יצירה:
                                                &nbsp;
                                                {new Date(e.createdAt.seconds * 1000).toLocaleDateString()}
                                            </Form.Text>
                                        </Row>

                                        <Row>
                                            <Form.Text>
                                                תאריך סיום:
                                                &nbsp;
                                                {new Date(e.until.seconds * 1000).toLocaleDateString()}
                                            </Form.Text>
                                        </Row>


                                        <Row>
                                            <Form.Text>
                                                תיאור:
                                                &nbsp;
                                                {e.description}
                                            </Form.Text>
                                        </Row>
                                        <Row>
                                            <Form.Text>
                                                מקום:
                                                &nbsp;
                                                {e.place}
                                            </Form.Text>
                                        </Row>
                                        {(type === 'therapist') &&
                                        <Row className='justify-content-end w-10'>
                                            <Col md={1}>
                                                <EditExerciseDialog exerciseData={e} handleUpdate={handleUpdate}/>
                                            </Col>
                                            <Col md={1}>
                                                <DeleteExerciseDialog handleDelete={handleDelete} exerciseID={e.id}/>
                                            </Col>
                                        </Row>}
                                    </Col>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    )
                }
            </Accordion>
        </div>
    )

}

export default PatientExercises


function AddExerciseDialog({setNewExercise, newExercise, handleOnSubmit, type}) {
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false)
    const [messages, setMessages] = useState({
        until: '',
        description: '',
        // patient: patient,
        place: '',
    })
    const handleClose = () => {
        setShow(false)
        setMessages({
            until: '',
            description: '',
            // patient: patient,
            place: '',
        })
        setNewExercise({
            until: '',
            description: '',
            // patient: patient,
            place: '',
        })
    };
    const handleShow = () => setShow(true);

    return (
        <>
            {(type === 'therapist') && <Button variant="outline-dark" onClick={handleShow}><Plus className="m-1"/>
                הוסף תרגיל
            </Button>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>הוספת תרגיל חדש</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className="needs-validation" noValidate><Col>
                        {/*<Row>*/}
                        {/*    <Form.Group controlId="start_date">*/}
                        {/*        <Form.Label for="validationDefault01">תאריך יצירה</Form.Label>*/}
                        {/*        <Form.Control id='validationDefault01'*/}
                        {/*                      type="date"*/}
                        {/*            autoFocus*/}
                        {/*            onChange={e => setNewExercise({...newExercise, createdAt: e.target.value})}*/}
                        {/*        />*/}
                        {/*    </Form.Group>*/}
                        {/*</Row>*/}

                        <Row>
                            <Form.Group controlId="end_date">
                                <Form.Label>תאריך סיום</Form.Label>
                                <Form.Control id='validationDefault01'
                                              type="date"
                                              onChange={e => setNewExercise({...newExercise, until: e.target.value})}

                                />
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.until}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group

                                controlId="description"
                            >
                                <Form.Label>תיאור</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                              onChange={e => setNewExercise({
                                                  ...newExercise,
                                                  description: e.target.value
                                              })}
                                />
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.description}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group

                                controlId="place"
                            >
                                <Form.Label>מיקום</Form.Label>
                                <Form.Control type='text'
                                              onChange={e => setNewExercise({...newExercise, place: e.target.value})}
                                />
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.place}
                                </div>
                            </Form.Group>
                        </Row>

                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        בטל
                    </Button>
                    {(load) ? (
                        <Button variant="success">
                            טוען...
                        </Button>
                    ) : (
                        <Button variant="success" onClick={async () => {
                            setLoad(true)
                            const flag = handleOnSubmit(setMessages)
                            console.log('flag', flag)
                            if (await flag) {
                                handleClose()
                            } else {
                                console.log('FALSEE')
                            }
                            setLoad(false)

                        }}>
                            שמור שינויים
                        </Button>
                    )}

                </Modal.Footer>
            </Modal>
        </>
    );
}


function DeleteExerciseDialog({handleDelete, exerciseID}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                <Trash></Trash>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>מחיקת תרגיל</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    האם אתה בטוח שברצונך למחוק את תרגיל זה?</Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose()
                        handleDelete(exerciseID)
                    }}>
                        כן
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        לא, אל תמחק
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

function EditExerciseDialog({handleUpdate, exerciseData}) {
    const [show, setShow] = useState(false);
    const [newExerciseData, setNewExerciseData] = useState(exerciseData);
    const [messages, setMessages] = useState({
        until: '',
        description: '',
        // patient: patient,
        place: '',
    })
    const handleClose = () => {
        setShow(false)
        setMessages({
            until: '',
            description: '',
            // patient: patient,
            place: '',
        })
    };
    const handleShow = () => setShow(true);
    useEffect(() => {
        setNewExerciseData(exerciseData)
    }, [exerciseData])

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>
                <Pencil></Pencil>
            </Button>

            <Modal show={show} onHide={() => {
                setNewExerciseData(exerciseData)
                handleClose()
            }}>
                <Modal.Header>
                    <Modal.Title>עריכת תרגיל קיים</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Col>
                        <Row>
                            <Form.Group controlId="start_date">
                                <Form.Label>תאריך יצירה</Form.Label>
                                <Form.Control
                                    type="date"
                                    autoFocus
                                    disabled
                                    defaultValue={
                                        (() => {
                                            let year = new Date(newExerciseData.createdAt.seconds * 1000).getFullYear()
                                            let month = new Date(newExerciseData.createdAt.seconds * 1000).getMonth() + 1
                                            let day = new Date(newExerciseData.createdAt.seconds * 1000).getDate()

                                            let dateString = year.toString() + '-'
                                            if (month < 10) {
                                                dateString += '0'
                                            }
                                            dateString += month.toString() + '-'
                                            if (day < 10) {
                                                dateString += '0'
                                            }
                                            dateString += day.toString()
                                            return dateString
                                        })()}
                                    onChange={e => setNewExerciseData({...newExerciseData, createdAt: e.target.value})}
                                />

                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="end_date">
                                <Form.Label>תאריך סיום</Form.Label>
                                <Form.Control
                                    type="date"
                                    // console.log(exercisesData[0].createdAt.toDate().getMonth())

                                    // value={(exerciseData.until.toDate().getFullYear() + '-' + (exerciseData.until.toDate().getMonth() + 1) + '-' + exerciseData.until.toDate().getDate()).toString()}
                                    // value={new Date(exerciseData.createdAt.seconds * 1000).getFullYear().toString() + '-' + (new Date(exerciseData.createdAt.seconds * 1000).getMonth() + 1).toString() + '-' + new Date(exerciseData.createdAt.seconds * 1000).getDate().toString()}
                                    defaultValue={
                                        (() => {
                                            let year = new Date(newExerciseData.until.seconds * 1000).getFullYear()
                                            let month = new Date(newExerciseData.until.seconds * 1000).getMonth() + 1
                                            let day = new Date(newExerciseData.until.seconds * 1000).getDate()

                                            let dateString = year.toString() + '-'
                                            if (month < 10) {
                                                dateString += '0'
                                            }
                                            dateString += month.toString() + '-'
                                            if (day < 10) {
                                                dateString += '0'
                                            }
                                            dateString += day.toString()
                                            return dateString
                                        })()}
                                    // value={(new Date(exerciseData.createdAt.seconds * 1000).getFullYear().toString() + '-' + (new Date(exerciseData.createdAt.seconds * 1000).getMonth() + 1).toString() + '-' + new Date(exerciseData.createdAt.seconds * 1000).getDate().toString()).toString()}

                                    onChange={e => setNewExerciseData({
                                        ...newExerciseData,
                                        until: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))
                                    })}

                                />
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.until}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group

                                controlId="description"
                            >
                                <Form.Label>תיאור</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                              value={newExerciseData.description}
                                              onChange={e => setNewExerciseData({
                                                  ...newExerciseData,
                                                  description: e.target.value
                                              })}
                                />
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.description}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group

                                controlId="place"
                            >
                                <Form.Label>מיקום</Form.Label>
                                <Form.Control type='text'
                                              value={newExerciseData.place}
                                              onChange={e => setNewExerciseData({
                                                  ...newExerciseData,
                                                  place: e.target.value
                                              })}
                                />
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.place}
                                </div>
                            </Form.Group>
                        </Row>

                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setNewExerciseData(exerciseData)
                        handleClose()
                    }}>
                        בטל
                    </Button>
                    <Button variant="success" onClick={async () => {

                        console.log("new: ", newExerciseData)
                        console.log("newExerciseData.until: ", newExerciseData.until)
                        if (await handleUpdate(newExerciseData.id, newExerciseData, setMessages)) {
                            handleClose()
                        }
                        setNewExerciseData(
                            newExerciseData
                            // {
                            //     ...newExerciseData,
                            //     until: firebase.firestore.Timestamp.fromDate(new Date(newExerciseData.until))
                            // }
                        )
                    }}>
                        שמור שינויים
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}