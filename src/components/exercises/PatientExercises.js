import React, {useEffect, useState} from "react"
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query, updateDoc,
} from "firebase/firestore";
import { db} from "../../firebase";

import firebase from "firebase/compat/app"
import {Button, Modal, Form, Row, Col, Accordion} from "react-bootstrap";
import {Plus, Pencil, Trash} from 'react-bootstrap-icons';


function PatientExercises({patient, therapist, type}) {
    const [exercisesData, setExercisesData] = useState([])
    const [empty, editEmpty] = useState(false)

    const [newExercise, setNewExercise] = useState({
        until: '',
        description: '',
        place: '',
    })
    // on load component
    useEffect(async () => {
        const q = query(collection(db, "patients/" + patient + "/therapists/" + therapist + "/exercises"), orderBy("createdAt", "desc"))
        if (type === 'parent') {

            const arr = []
            // only view the exercises
            getDocs(q).then((querySnapshot) => {
                if (querySnapshot.docs.length === 0) {
                    editEmpty(true)
                } else {
                    editEmpty(false)
                }
                querySnapshot.forEach((doc) => {
                    arr.push({...doc.data(), id: doc.id})
                });
                if (arr.length === 0) {
                    editEmpty(true)
                }
                setExercisesData(arr)
            })
        } else {
            // can change the exercise,remove and add therefore onSnapshot
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

                        data.push({...doc.data(), id: doc.id})

                    ))
                    if (data.length === 0) {
                        editEmpty(true)
                    }
                    setExercisesData(data)

                },
                (error) => {
                    // TODO: Handle errors!
                })
        }
    }, [])
    /*check the details of the exercise is ok*/
    const checkData = (setMessages, exercise) => {
        const messagesSubmit = {
            until: '',
            description: '',
            place: '',
        }
        if (exercise.until === "") {
            messagesSubmit.until = '???????? ?????????? ????????'
        }
        if (!exercise.description.trim()) {
            messagesSubmit.description = '???????? ?????????? ??????????'
        }
        if (!exercise.place.trim()) {
            messagesSubmit.place = '???????? ???????? ??????????'
        }
        setMessages(messagesSubmit)
        if (!messagesSubmit.until.trim() && !messagesSubmit.description.trim() && !messagesSubmit.place.trim()) {
            return true
        }
        return false
    }
    /*submit to add the new exercises */
    const handleOnSubmit = async (setMessages) => {
        if (checkData(setMessages, newExercise)) {
            newExercise.until = firebase.firestore.Timestamp.fromDate(new Date(newExercise.until))
            await addDoc(collection(db, "patients/" + patient + "/therapists/" + therapist + '/exercises'), {
                ...newExercise,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date())
            })
            return true
        }
        return false

    }
    /*delete exercise */
    const handleDelete = async docId => {
        await deleteDoc(doc(collection(db, "patients"), patient, "therapists", therapist, 'exercises',
            docId))
    }
    /*update exercise */
    const handleUpdate = async (docId, data, setMessages) => {
        if (!checkData(setMessages, data)) {
            return false
        }
        await updateDoc(doc(collection(db, "patients"), patient, "therapists", therapist, 'exercises',
            docId), data
        )
        return true
    }

    return (
        <div>
            <Row className='p-2 align-content-start'>
                <div style={{width: 'auto'}}>
                    <Form.Label className='fs-2' style={{fontWeight: 'bold'}}>?????????? ??????????????</Form.Label></div>
                <div style={{width: 'auto', alignSelf: "center"}}>
                    <AddExerciseDialog type={type} setNewExercise={setNewExercise} newExercise={newExercise}
                                       handleOnSubmit={handleOnSubmit}/>
                </div>
            </Row>
            {empty && exercisesData.length === 0 &&
            <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>????????, ???? ???????????? ??????????????.</Form.Label>
            </Row>}
            {!empty && exercisesData.length === 0 &&
            <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>????????...</Form.Label> </Row>}
            <Accordion className='justify-content-center' style={{width: '70%'}} alwaysOpen={true}>
                {
                    exercisesData.map((e, i) => (
                            // <>

                            <Accordion.Item eventKey={e.id}>
                                <Accordion.Header>
                                    {e.createdAt !== null && new Date(e.createdAt.seconds * 1000).toLocaleDateString() + ' ' + e.description}
                                    &nbsp;&nbsp;
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Col>

                                        <Row>
                                            <Form.Text>
                                                ?????????? ??????????:
                                                &nbsp;
                                                {new Date(e.createdAt.seconds * 1000).toLocaleDateString()}
                                            </Form.Text>
                                        </Row>

                                        <Row>
                                            <Form.Text>
                                                ?????????? ????????:
                                                &nbsp;
                                                {new Date(e.until.seconds * 1000).toLocaleDateString()}
                                            </Form.Text>
                                        </Row>


                                        <Row>
                                            <Form.Text>
                                                ??????????:
                                                &nbsp;
                                                {e.description}
                                            </Form.Text>
                                        </Row>
                                        <Row>
                                            <Form.Text>
                                                ????????:
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

/* dialog of add Exercise*/
function AddExerciseDialog({setNewExercise, newExercise, handleOnSubmit, type}) {
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false)
    const [messages, setMessages] = useState({
        until: '',
        description: '',
        place: '',
    })
    const handleClose = () => {
        setShow(false)
        setMessages({
            until: '',
            description: '',
            place: '',
        })
        setNewExercise({
            until: '',
            description: '',
            place: '',
        })
    };
    const handleShow = () => setShow(true);

    return (
        <>
            {(type === 'therapist') && <Button variant="outline-dark" onClick={handleShow}><Plus className="m-1"/>
                ???????? ??????????
            </Button>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>?????????? ?????????? ??????</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className="needs-validation" noValidate><Col>

                        <Row>
                            <Form.Group controlId="end_date">
                                <Form.Label>?????????? ????????</Form.Label>
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
                                <Form.Label>??????????</Form.Label>
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
                                <Form.Label>??????????</Form.Label>
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
                        ??????
                    </Button>
                    {(load) ? (
                        <Button variant="success">
                            ????????...
                        </Button>
                    ) : (
                        <Button variant="success" onClick={async () => {
                            setLoad(true)
                            const flag = handleOnSubmit(setMessages)
                            if (await flag) {
                                handleClose()
                            } else {
                            }
                            setLoad(false)

                        }}>
                            ???????? ??????????????
                        </Button>
                    )}

                </Modal.Footer>
            </Modal>
        </>
    );
}

/* dialog of delete Exercise*/
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
                    <Modal.Title>?????????? ??????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ?????? ?????? ???????? ?????????????? ?????????? ???? ?????????? ?????</Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose()
                        handleDelete(exerciseID)
                    }}>
                        ????
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        ????, ???? ????????
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
/* dialog of edit Exercise*/
function EditExerciseDialog({handleUpdate, exerciseData}) {
    const [show, setShow] = useState(false);
    const [newExerciseData, setNewExerciseData] = useState(exerciseData);
    const [messages, setMessages] = useState({
        until: '',
        description: '',
        place: '',
    })
    const handleClose = () => {
        setShow(false)
        setMessages({
            until: '',
            description: '',
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
                    <Modal.Title>?????????? ?????????? ????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Col>
                        <Row>
                            <Form.Group controlId="start_date">
                                <Form.Label>?????????? ??????????</Form.Label>
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
                                <Form.Label>?????????? ????????</Form.Label>
                                <Form.Control
                                    type="date"
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
                                <Form.Label>??????????</Form.Label>
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
                                <Form.Label>??????????</Form.Label>
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
                        ??????
                    </Button>
                    <Button variant="success" onClick={async () => {

                        if (await handleUpdate(newExerciseData.id, newExerciseData, setMessages)) {
                            handleClose()
                        }
                        setNewExerciseData(
                            newExerciseData
                        )
                    }}>
                        ???????? ??????????????
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}