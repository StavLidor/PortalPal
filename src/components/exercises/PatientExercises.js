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
import Message from "../chats/message";
import Exercise from "./Exercise";
import Datetime from "react-datetime";
import firebase from "firebase/compat/app"
import {Route, Routes, Link} from "react-router-dom";
import ViewMeetingSummaries from "../../meetingSummaries/viewMeetingSummaries/ViewMeetingSummaries";
import ViewExercise from "./ViewExercise";
import {Button, Collapse, Modal, Form, Row, Col, Accordion} from "react-bootstrap";
import {render} from "@testing-library/react";
import ReactDOM from 'react-dom'


function PatientExercises({patient, therapist, type}) {
    const [exercisesData, setExercisesData] = useState([])
    const [open, setOpen] = useState(false);
    const [newExercise, setNewExercise] = useState({
        until: '',
        description: '',
        // patient: patient,
        place: '',
        // therapist: therapist
    })
    // const [addExercise, setAddExercise] = useState(false)
    useEffect(async () => {
        //console.log('useEffect')
        const q = query(collection(db, "patients/" + patient + "/therapists/" + therapist + "/exercises"), orderBy("createdAt", "desc"))
        if (type === 'parent') {
            console.log('allDetailsExercises222')

            const arr = []
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    arr.push({...doc.data(), id: doc.id})
                    console.log('id', doc.id)
                    // if (doc.data().client === id){
                    //
                    // }
                    console.log(arr)
                    setExercisesData(arr)

                });
            })
        } else {
            return onSnapshot(
                q,
                (querySnapshot) => {
                    let data = []
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)

                        data.push({...doc.data(), id: doc.id})

                    ))
                    setExercisesData(data)
                    console.log(data)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })
        }
    }, [])


    const handleOnSubmit = async e => {
        // e.preventDefault()
        newExercise.until = firebase.firestore.Timestamp.fromDate(new Date(newExercise.until))
        await addDoc(collection(db, "patients/" + patient + "/therapists/" + therapist + '/exercises'), {
            ...newExercise,
            // createdAt: firebase.firestore.FieldValue.serverTimestamp()
            createdAt: firebase.firestore.Timestamp.fromDate(new Date(newExercise.createdAt))
        })
        // const docRef = await addDoc(collection(db, "exercises"),
        //     { ...newExercise,createdAt:firebase.firestore.FieldValue.serverTimestamp()})

    }
    const handleDelete = async docId => {
        await deleteDoc(doc(collection(db, "patients"), patient, "therapists", therapist, 'exercises',
            docId))
        // await deleteDoc(doc(db, "exercises", docId))
    }
    const handleUpdate = async (docId, data) => {
        // await updateIDDoc(docId, "exercises", data)
        await updateDoc(doc(collection(db, "patients"), patient, "therapists", therapist, 'exercises',
            docId),
            {
            ...data,
            // createdAt: firebase.firestore.FieldValue.serverTimestamp()
            until: firebase.firestore.Timestamp.fromDate(new Date(data.until))
        }
        )
    }

    // console.log(new Date(exercisesData[0].createdAt.seconds * 1000).getYear() + '-'+new Date(exercisesData[0].createdAt.seconds * 1000).getMonth()+ '-'+new Date(exercisesData[0].createdAt.seconds * 1000).getDay())
    // console.log(exercisesData[0].createdAt.toDate().getMonth())
    // console.log(exercisesData[0].until.toDate().getFullYear() + '-' + (exercisesData[0].until.toDate().getMonth() + 1) + '-' + exercisesData[0].until.toDate().getDate())
    return (
        <div>
            {/*<h3>תירגוליישן</h3>*/}
            <Row className='p-2'>
                <Col>
                    <Form.Label style={{fontWeight: 'bold'}}>רשימת תרגילים</Form.Label>
                </Col>
                <Col md='4'>
                    <AddExerciseDialog type={type} setNewExercise={setNewExercise} newExercise={newExercise}
                                       handleOnSubmit={handleOnSubmit}/>
                </Col>
            </Row>

            <Accordion>
                {
                    exercisesData.map((e, i) => (
                            // <>

                            <Accordion.Item eventKey={i.toString()}>
                                <Accordion.Header>
                                    {new Date(e.createdAt.seconds * 1000).toLocaleDateString() + ' ' + e.place}
                                    &nbsp;&nbsp;
                                    {/*{e.createdAt.toDate().toUTCString() + e.place}*/}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Col>
                                        <Row>
                                            <Form.Text>
                                                שם:
                                                &nbsp;
                                                שם חובהההה
                                            </Form.Text>
                                        </Row>

                                        <Row>
                                            <Form.Text>
                                                תאריך יצירה:
                                                &nbsp;
                                                {new Date(e.createdAt.seconds * 1000).toLocaleDateString()}
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
                                        <Row className='justify-content-end'>
                                            <Col md={2}>
                                                <EditExerciseDialog exerciseData={e} handleUpdate={handleUpdate}/>
                                            </Col>
                                            <Col md={2}>
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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {(type === 'therapist') && <Button variant="outline-dark" onClick={handleShow}>
                הוסף תרגיל
            </Button>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>הוספת תרגיל חדש</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form><Col>
                        <Row>
                            <Form.Group controlId="start_date">
                                <Form.Label>תאריך יצירה</Form.Label>
                                <Form.Control
                                    type="date"
                                    autoFocus
                                    onChange={e => setNewExercise({...newExercise, createdAt: e.target.value})}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group controlId="end_date">
                                <Form.Label>תאריך סיום</Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={e => setNewExercise({...newExercise, until: e.target.value})}

                                />
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
                            </Form.Group>
                        </Row>

                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        בטל
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        handleOnSubmit()
                    }}>
                        שמור
                    </Button>
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
            <Button variant="outline-dark" onClick={handleShow}>
                מחק
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>מחיקת תרגיל</Modal.Title>
                </Modal.Header>
                האם אתה בטוח שברצונך למחוק את תרגיל זה?
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                        handleDelete(exerciseID)
                    }}>
                        כן
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>
                ערוך
            </Button>

            <Modal show={show} onHide={()=> {
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
                                        (()=>{
                                            let year = new Date(newExerciseData.createdAt.seconds * 1000).getFullYear()
                                            let month = new Date(newExerciseData.createdAt.seconds * 1000).getMonth() + 1
                                            let day = new Date(newExerciseData.createdAt.seconds * 1000).getDate()

                                            let dateString = year.toString() + '-'
                                            if(month < 10){
                                                dateString+='0'
                                            }
                                            dateString+=month.toString() + '-'
                                            if(day < 10){
                                                dateString+='0'
                                            }
                                            dateString+=day.toString()
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
                                        (()=>{
                                            let year = new Date(newExerciseData.until.seconds * 1000).getFullYear()
                                            let month = new Date(newExerciseData.until.seconds * 1000).getMonth() + 1
                                            let day = new Date(newExerciseData.until.seconds * 1000).getDate()

                                            let dateString = year.toString() + '-'
                                            if(month < 10){
                                                dateString+='0'
                                            }
                                            dateString+=month.toString() + '-'
                                            if(day < 10){
                                                dateString+='0'
                                            }
                                            dateString+=day.toString()
                                            return dateString
                                        })()}
                                    // value={(new Date(exerciseData.createdAt.seconds * 1000).getFullYear().toString() + '-' + (new Date(exerciseData.createdAt.seconds * 1000).getMonth() + 1).toString() + '-' + new Date(exerciseData.createdAt.seconds * 1000).getDate().toString()).toString()}

                                    onChange={e => setNewExerciseData({...newExerciseData, until: e.target.value})}

                                />
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
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group

                                controlId="place"
                            >
                                <Form.Label>מיקום</Form.Label>
                                <Form.Control type='text'
                                              value={newExerciseData.place}
                                              onChange={e => setNewExerciseData({...newExerciseData, place: e.target.value})}
                                />
                            </Form.Group>
                        </Row>

                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                        setNewExerciseData(exerciseData)
                        handleClose()
                    }}>
                        בטל
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        console.log(newExerciseData)
                        handleUpdate(newExerciseData.id, newExerciseData)
                        setNewExerciseData({
                            ...newExerciseData,
                            until: firebase.firestore.Timestamp.fromDate(new Date(newExerciseData.until))
                        })
                    }}>
                        שמור שינויים
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}