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
import {Pencil, Plus, Trash} from 'react-bootstrap-icons';

function SessionsList({patientId, therapistId = null, type}) {

    const [sessionsData, setSessionsData] = useState([])
    const [open, setOpen] = useState(false)
    const [empty, editEmpty] = useState(false)

    const [newSession, setNewSession] = useState({
        title: '',
        summary: '',
        date: ''
    })
    // function expand() {
    //     $('.collapse').collapse('show');
    // }
    // function collapse() {
    //     $('.collapse').collapse('hide');
    // }
    const checkData = (setMessages, session) => {
        console.log(session)
        const messagesSubmit = {
            title: '',
            summary: '',
            date: ''
        }
        // e.preventDefault()
        console.log(session.date === "")
        if (session.date === "") {
            messagesSubmit.date = 'הכנס תאריך מפגש'
        }
        if (!session.title.trim()) {
            messagesSubmit.title = 'הכנס כותרת פגישה'
        }
        if (!session.summary.trim()) {
            messagesSubmit.summary = 'הכנס סיכום פגישה'
        }
        setMessages(messagesSubmit)
        console.log(messagesSubmit)
        if (!messagesSubmit.date.trim() && !messagesSubmit.title.trim() && !messagesSubmit.summary.trim()) {
            return true
        }
        return false
    }
    useEffect(async () => {
        console.log('Empty', empty)
        // editEmpty(false)
        console.log('useEffect')
        let q
        let therapistIDForSession = (() => {
            if (type === 'parent')
                return therapistId
            return auth.currentUser.uid
        })()
        if (therapistIDForSession === '') {
            return
        }
        q = query(collection(db, "patients/" + patientId + "/therapists/" + therapistIDForSession + "/sessions"), orderBy("date", "desc"))
        console.log("q: ", q)
        if (type === 'parent') {
            console.log('allDetailsMeetings222')

            const sessions = []
            getDocs(q).then((querySnapshot) => {
                if (querySnapshot.docs.length === 0) {
                    editEmpty(true)
                } else {
                    editEmpty(false)
                }
                querySnapshot.forEach((doc) => {
                    sessions.push({...doc.data(), id: doc.id})
                    console.log('id', doc.id)
                    // if (doc.sessionsData().client === id){
                    //
                    // }


                });

                setSessionsData(sessions)

            })

        } else {
            return onSnapshot(
                q,
                (querySnapshot) => {
                    if (querySnapshot.docs.length === 0) {
                        editEmpty(true)
                    } else {
                        editEmpty(false)
                    }
                    let sessions = []
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)

                        sessions.push({...doc.data(), id: doc.id})

                    ))
                    console.log("sessions: ", sessions)
                    setSessionsData(sessions)
                    // if(sessionsData.length === 0){
                    //     editEmpty(true)
                    // }
                    console.log("sessionsData: ", sessionsData)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })
        }

    }, [therapistId])

    const handleOnSubmit = async (setMessages) => {
        if (!checkData(setMessages, newSession))
            return false
        console.log("new session: ", newSession)
        console.log("path:", "patients/" + patientId + "/therapists/" + auth.currentUser.uid + '/sessions')
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
        return true

    }
    const handleDelete = async docId => {
        await deleteDoc(doc(collection(db, "patients"), patientId, "therapists", auth.currentUser.uid, 'sessions',
            docId))
        // await deleteDoc(doc(db, "exercises", docId))
    }
    const handleUpdate = async (docId, data, setMessages) => {
        if (!checkData(setMessages, data))
            return false
        console.log("dataaaaaaaaaaaa:", data)

        // await updateIDDoc(docId, "exercises", data)
        await updateDoc(doc(collection(db, "patients"), patientId, "therapists", auth.currentUser.uid, 'sessions',
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

    return (
        <div>
            <Row className='p-2 align-content-start'>
                <div style={{width: 'auto'}}>
                    <Form.Label className='fs-2' style={{fontWeight: 'bold'}}>סיכומי טיפולים</Form.Label>
                </div>

                <div style={{width: 'auto', alignSelf: "center"}}>
                    <AddSessionDialog type={type} setNewSession={setNewSession} newSession={newSession}
                                      handleOnSubmit={handleOnSubmit}/>
                    {/*<Button  variant="outline-dark"*/}
                    {/*         onclick={expand}><Plus className= "m-1"/>*/}
                    {/*    פתח את כל פגישות*/}
                    {/*</Button>*/}
                    {/*<Button  variant="outline-dark"  onclick={collapse}><Plus className= "m-1"/>*/}
                    {/*    סגור את כל פגישות*/}
                    {/*</Button>*/}
                </div>
            </Row>
            {empty && sessionsData.length === 0 &&
            <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>
                כרגע, לא קיימים סיכומי טיפולים.</Form.Label> </Row>}
            {!empty && sessionsData.length === 0 &&
            <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>טוען...</Form.Label> </Row>}
            <br/>

            {/*// sessionsData.map((s)=>(*/}
            <Accordion className='justify-content-center' style={{width: '70%'}} alwaysOpen={true}

            >

                {
                    sessionsData.map((s, i) => (
                            // <>
                            <Accordion.Item eventKey={s.id}>
                                <Accordion.Header>
                                    {s.title + ', ' + new Date(s.date.seconds * 1000).toLocaleDateString()}
                                    &nbsp;&nbsp;
                                    {/*{e.createdAt.toDate().toUTCString() + e.place}*/}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Col>
                                        <Row>
                                            <Form.Label>
                                                נושא המפגש:
                                                &nbsp;
                                                {s.title}
                                            </Form.Label>
                                        </Row>

                                        <Row>
                                            <Form.Label>
                                                תאריך:
                                                &nbsp;
                                                {/*{s.date}*/}
                                                {new Date(s.date.seconds * 1000).toLocaleDateString()}
                                            </Form.Label>
                                        </Row>

                                        <Row>
                                            <Form.Label>
                                                תוכן:
                                                &nbsp;
                                                {s.summary}
                                                {/*{new Date(e.createdAt.seconds * 1000).toLocaleDateString()}*/}
                                            </Form.Label>
                                        </Row>

                                        {(type === 'therapist') &&
                                        <Row className='justify-content-end w-10'>
                                            <Col md={1}>
                                                <EditSessionDialog sessionData={s} handleUpdate={handleUpdate}/>
                                            </Col>
                                            <Col md={1}>
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
        </div>
    )
}

export default SessionsList

function AddSessionDialog({setNewSession, newSession, handleOnSubmit, type}) {
    const [messages, setMessages] = useState({
        title: '',
        summary: '',
        date: ''
    })
    const [show, setShow] = useState(false)
    const [load, setLoad] = useState(false)
    const handleClose = () => {
        setShow(false)
        setMessages({
            title: '',
            summary: '',
            date: ''
        })
        setNewSession({
            title: '',
            summary: '',
            date: ''
        })
    }

    const handleShow = () => setShow(true);

    return (
        <>
            {(type === 'therapist') && <Button variant="outline-dark" onClick={handleShow}><Plus className="m-1"/>
                הוסף טיפול
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
                                        {
                                            ...newSession,
                                            date: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))
                                        }
                                    )}
                                />

                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.date}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="title">
                                <Form.Label>כותרת</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setNewSession({...newSession, title: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.title}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="summary">
                                <Col><Form.Label>סיכום מפגש</Form.Label></Col>
                                <Col>
                                <textarea style={{width: "460px"}}
                                          type="text"
                                          onChange={e => setNewSession({...newSession, summary: e.target.value})}

                                />
                                </Col>

                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.summary}
                            </div>
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
                            if (await handleOnSubmit(setMessages)) {
                                handleClose()
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


function DeleteSessionDialog({handleDelete, sessionID}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}><Trash/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>מחיקת תרגיל</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    האם אתה בטוח שברצונך למחוק את תרגיל זה?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose()
                        handleDelete(sessionID)
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

function EditSessionDialog({handleUpdate, sessionData}) {
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState({
        title: '',
        summary: '',
        date: ''
    })
    const [newSessionData, setNewSessionData] = useState(sessionData);
    const handleClose = () => {
        setShow(false)
        setMessages({
            title: '',
            summary: '',
            date: ''
        })
    }
    const handleShow = () => setShow(true);
    useEffect(() => {
        setNewSessionData(sessionData)
    }, [sessionData])

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}><Pencil/>
            </Button>

            <Modal show={show} onHide={() => {
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
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.title}
                            </div>
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
                                        (() => {
                                            let year = new Date(newSessionData.date.seconds * 1000).getFullYear()
                                            let month = new Date(newSessionData.date.seconds * 1000).getMonth() + 1
                                            let day = new Date(newSessionData.date.seconds * 1000).getDate()

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

                                    onChange={e => setNewSessionData({
                                        ...newSessionData,
                                        date: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))
                                    })}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.date}
                            </div>
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
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.summary}
                            </div>
                        </Row>

                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setNewSessionData(sessionData)
                        handleClose()
                    }}>
                        בטל
                    </Button>
                    <Button variant="success" onClick={async () => {

                        console.log("new: ", newSessionData)
                        console.log("newExerciseData.until: ", newSessionData.date)
                        if (await handleUpdate(newSessionData.id, newSessionData, setMessages)) {
                            setNewSessionData(newSessionData)
                            handleClose()
                        }
                    }}>
                        שמור שינויים
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}