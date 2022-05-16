import {
    Button,
    Collapse,
    Form,
    Row,
    Col,
    Container,
    ButtonGroup,
    Grid,
    Nav,
    ListGroup,
    Accordion, Modal
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {auth, db} from "../../firebase";
import {addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc} from "firebase/firestore";
import firebase from "firebase/compat/app";
import { Pencil,Plus,Trash} from 'react-bootstrap-icons';

function SessionsList({patientId, therapistId = null, type}) {
    const [sessionsData, setSessionsData] = useState([])
    const [open, setOpen] = useState(false);
    const [newSession, setNewSession] = useState({
        title: '',
        summary: '',
        date: ''
    })
    useEffect(async () => {
        console.log('useEffect')
        let q
        let therapistIDForSession = (() => {
            if (type === 'parent')
                return therapistId
            return auth.currentUser.uid
        })()
        q = query(collection(db, "patients/" + patientId + "/therapists/" + therapistIDForSession + "/sessions"), orderBy("date", "desc"))
        console.log("q: ", q)
        if (type === 'parent') {
            console.log('allDetailsMeetings222')

            const sessions = []
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    sessions.push({...doc.data(), id: doc.id})
                    console.log('id', doc.id)
                    // if (doc.sessionsData().client === id){
                    //
                    // }
                    setSessionsData(sessions)

                });
            })

        } else {
            return onSnapshot(
                q,
                (querySnapshot) => {
                    let sessions = []
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)

                        sessions.push({...doc.data(), id: doc.id})

                    ))
                    console.log("sessions: ", sessions)
                    setSessionsData(sessions)
                    console.log("sessionsData: ", sessionsData)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })
        }

    }, [])

    const handleOnSubmit = async e => {
        console.log("new session: " ,newSession)
        console.log("path:" ,"patients/" + patientId + "/therapists/" + auth.currentUser.uid + '/sessions')
        // e.preventDefault()
        // newSession.until = firebase.firestore.Timestamp.fromDate(new Date(newSession.until))
        await addDoc(collection(db, "patients/" + patientId + "/therapists/" + auth.currentUser.uid + '/sessions'), newSession
        //     {
        //     ...newSession,
        //     // createdAt: firebase.firestore.FieldValue.serverTimestamp()
        //     // createdAt: firebase.firestore.Timestamp.fromDate(new Date(newSession.createdAt)),
        //     // until: firebase.firestore.Timestamp.fromDate(new Date(newExercise.until))
        // }
        )
        // const docRef = await addDoc(collection(db, "exercises"),
        //     { ...newExercise,createdAt:firebase.firestore.FieldValue.serverTimestamp()})

    }
    const handleDelete = async docId => {
        await deleteDoc(doc(collection(db, "patients"), patientId, "therapists", auth.currentUser.uid, 'sessions',
            docId))
        // await deleteDoc(doc(db, "exercises", docId))
    }
    const handleUpdate = async (docId, data) => {
        console.log("dataaaaaaaaaaaa:" , data)

        // await updateIDDoc(docId, "exercises", data)
        await updateDoc(doc(collection(db, "patients"), patientId, "therapists", auth.currentUser.uid, 'sessions',
            docId),data
            //     {
            //     ...data,
            //     // createdAt: firebase.firestore.FieldValue.serverTimestamp()
            //     // until: firebase.firestore.Timestamp.fromDate(new Date(data.until))
            //     until: firebase.firestore.Timestamp.fromDate(new Date(data.until))
            // }
        )
    }

    return (
        <div>
            <Row className='p-2'>
                <Col>
                    <Form.Label style={{fontWeight: 'bold'}}>סיכומי טיפולים</Form.Label>
                </Col>
                <Col md='4'>
                    <AddSessionDialog type={type} setNewSession={setNewSession} newSession={newSession}
                                       handleOnSubmit={handleOnSubmit}/>
                </Col>
            </Row>
            {/*// sessionsData.map((s)=>(*/}
            <Accordion>
                {
                    sessionsData.map((s, i) => (
                            // <>

                            <Accordion.Item eventKey={s.id}>
                                <Accordion.Header>
                                    {s.title+ ', ' +new Date(s.date.seconds * 1000).toLocaleDateString()}
                                    &nbsp;&nbsp;
                                    {/*{e.createdAt.toDate().toUTCString() + e.place}*/}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Col>
                                        <Row>
                                            <Form.Text>
                                                נושא המפגש:
                                                &nbsp;
                                                {s.title}
                                            </Form.Text>
                                        </Row>

                                        <Row>
                                            <Form.Text>
                                                תאריך:
                                                &nbsp;
                                                {/*{s.date}*/}
                                                {new Date(s.date.seconds * 1000).toLocaleDateString()}
                                            </Form.Text>
                                        </Row>

                                        <Row>
                                            <Form.Text>
                                                תוכן:
                                                &nbsp;
                                                {s.summary}
                                                {/*{new Date(e.createdAt.seconds * 1000).toLocaleDateString()}*/}
                                            </Form.Text>
                                        </Row>

                                        {(type === 'therapist') &&
                                        <Row className='justify-content-end w-10'>
                                            <Col className="m-1" md={1}>
                                                <EditSessionDialog sessionData={s} handleUpdate={handleUpdate}/>
                                            </Col>
                                            <Col className="m-1" md={1}>
                                                <DeleteSessionDialog handleDelete={handleDelete} sessionID={s.id}/>
                                            </Col>
                                        </Row>}
                                    </Col>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    )
                }
            </Accordion>
            {/*// <>*/}
            {/*// <Button*/}
            {/*//     onClick={() => setOpen(!open)}*/}
            {/*//     aria-controls="example-collapse-text"*/}
            {/*//     aria-expanded={open}*/}
            {/*// >*/}
            {/*//     {s.date.toDate().toUTCString() + s.title}*/}
            {/*// </Button>*/}
            {/*//*/}
            {/*//*/}
            {/*//     <Collapse in={open}>*/}
            {/*//         <div id="example-collapse-text">*/}
            {/*//             {s.date.toDate().toUTCString()}*/}
            {/*//             {s.title}*/}
            {/*//             {s.summary}*/}
            {/*//         </div>*/}
            {/*//     </Collapse>*/}
            {/*// </>*/}

            {/*// }*/}
        </div>
    )
}

export default SessionsList

function AddSessionDialog({setNewSession, newSession, handleOnSubmit, type}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {(type === 'therapist') && <Button  variant="outline-dark" onClick={handleShow}><Plus className= "m-1"/>
                הוסף מפגש
            </Button>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>הוספת מפגש חדש</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form><Col>
                        <Row>
                            <Form.Group controlId="date">
                                <Form.Label>תאריך</Form.Label>
                                <Form.Control
                                    type="date"
                                    autoFocus
                                    onChange={e => setNewSession(
                                        {...newSession, date: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))}
                                    )}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="summary">
                                <Form.Label>סיכום מפגש</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setNewSession({...newSession, summary: e.target.value})}

                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="title">
                                <Form.Label>כותרת</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setNewSession({...newSession, title: e.target.value})}

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
                    <Button variant="success" onClick={() => {
                        handleClose()
                        handleOnSubmit()
                    }}>
                         שמור שינויים
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


function DeleteSessionDialog({handleDelete, sessionID}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}><Trash/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>מחיקת תרגיל</Modal.Title>
                </Modal.Header>
                האם אתה בטוח שברצונך למחוק את תרגיל זה?
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                        handleDelete(sessionID)
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

function EditSessionDialog({handleUpdate, sessionData}) {
    const [show, setShow] = useState(false);
    const [newSessionData, setNewSessionData] = useState(sessionData);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}><Pencil/>
            </Button>

            <Modal show={show} onHide={()=> {
                setNewSessionData(sessionData)
                handleClose()
            }}>
                <Modal.Header>
                    <Modal.Title>עריכת מפגש קיים</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Col>
                        <Row>
                            <Form.Group
                                controlId="title"
                            >
                                <Form.Label>כותרת</Form.Label>
                                <Form.Control type='text' rows={3}
                                              value={newSessionData.title}
                                              onChange={e => setNewSessionData({
                                                  ...newSessionData,
                                                  title: e.target.value
                                              })}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="end_date">
                                <Form.Label>תאריך</Form.Label>
                                <Form.Control
                                    type="date"
                                    // console.log(exercisesData[0].createdAt.toDate().getMonth())

                                    // value={(exerciseData.until.toDate().getFullYear() + '-' + (exerciseData.until.toDate().getMonth() + 1) + '-' + exerciseData.until.toDate().getDate()).toString()}
                                    // value={new Date(exerciseData.createdAt.seconds * 1000).getFullYear().toString() + '-' + (new Date(exerciseData.createdAt.seconds * 1000).getMonth() + 1).toString() + '-' + new Date(exerciseData.createdAt.seconds * 1000).getDate().toString()}
                                    defaultValue={
                                        (()=>{
                                            let year = new Date(newSessionData.date.seconds * 1000).getFullYear()
                                            let month = new Date(newSessionData.date.seconds * 1000).getMonth() + 1
                                            let day = new Date(newSessionData.date.seconds * 1000).getDate()

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

                                    onChange={e => setNewSessionData({...newSessionData, date: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))})}

                                />
                            </Form.Group>
                        </Row>


                        <Row>
                            <Form.Group

                                controlId="description"
                            >
                                <Form.Label>תוכן</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                              value={newSessionData.summary}
                                              onChange={e => setNewSessionData({
                                                  ...newSessionData,
                                                  summary: e.target.value
                                              })}
                                />
                            </Form.Group>
                        </Row>

                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                        setNewSessionData(sessionData)
                        handleClose()
                    }}>
                        בטל
                    </Button>
                    <Button variant="success" onClick={() => {
                        handleClose()
                        console.log("new: ", newSessionData)
                        console.log("newExerciseData.until: ", newSessionData.date)
                        handleUpdate(newSessionData.id, newSessionData)
                        setNewSessionData(
                            newSessionData
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