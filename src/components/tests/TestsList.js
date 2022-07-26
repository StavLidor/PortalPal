import {Accordion, Button, ButtonGroup, Col, Container, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2';
import firebase from "firebase/compat/app";
import {Pencil, Plus, Trash} from "react-bootstrap-icons";
import {auth, db} from "../../firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where
} from "firebase/firestore";

/*component of test according category or all test list and all in plot view*/
function TestsList({patientId, type, category = null}) {
    const [testsList, setTestsList] = useState([])
    const [dates, setDates] = useState([])
    const [scores, setScores] = useState((() => {
        // if ask for only one category need only his score
        if (category)
            return []
        // if not ask for category need to show all
        return {['קשר בין אישי']: [], ['שיח קבוצתי']: [], ['שמירת קשר עין']: [], ['אקדמי']: []}
    })())
    const [empty, editEmpty] = useState(false)

    useEffect(async () => {
        let q
        let therapistIDForSession = auth.currentUser.uid
        if (category) {
            // ask only the category that ask
            q = query(collection(db, "patients/" + patientId + "/therapists/" + therapistIDForSession + "/tests"),
                where('category', '==', category), orderBy("executionDate", "desc"))
        } else {
            // ask for all category
            q = query(collection(db, "patients/" + patientId + "/therapists/" + therapistIDForSession + "/tests"),
                where('status', '==', 'done'), orderBy("executionDate", "asc"))
        }

        return onSnapshot(
            q,
            (querySnapshot) => {
                let tests = []
                let datesArr = []
                let scoresArr = []
                let scoresDic = {['קשר בין אישי']: [], ['שיח קבוצתי']: [], ['שמירת קשר עין']: [], ['אקדמי']: []}
                if (querySnapshot.docs.length === 0) {
                    editEmpty(true)
                } else {
                    editEmpty(false)
                }
                querySnapshot.forEach((doc) => {
                        tests.push({...doc.data(), id: doc.id})
                        if (category) {
                            // add the tests of the category
                            if (doc.data().status === 'done') {
                                datesArr.push(new Date(doc.data().executionDate.seconds * 1000).toLocaleDateString())
                                scoresArr.push(doc.data().score)
                            }

                        } else {
                            // add according the category to dic
                            scoresDic[doc.data().category].push(doc.data().score)
                        }
                    }
                )
                setDates(datesArr.reverse())
                if (category) {
                    // set the things need for one category
                    setTestsList(tests)
                    setScores(scoresArr.reverse())
                } else {
                    // set the thing that need for show plot of all category
                    setScores(scoresDic)
                }

            },
            (error) => {

            })

    }, [])
    /*check the data of the test is ok*/
    const checkData = (setMessages, test) => {
        const messagesSubmit = {
            description: '',
            executionDate: '',
            difficulty: '',
            score: '', summary: ''
        }
        if (test.executionDate === "") {
            messagesSubmit.executionDate = 'הכנס תאריך ביצוע'
        }
        if (test.difficulty === "") {
            messagesSubmit.difficulty = 'הכנס קושי'
        }
        if (!test.description.trim()) {
            messagesSubmit.description = 'הכנס תיאור מבחן'
        }

        if (test.status === 'done') {
            if (!test.summary.trim()) {
                messagesSubmit.summary = 'הכנס סיכום מבחן'
            }
            if (!test.score.trim()) {

                messagesSubmit.score = 'הכנס ניקוד מבחן'
            }
        }
        setMessages(messagesSubmit)
        if (!messagesSubmit.executionDate.trim() && !messagesSubmit.description.trim() && !messagesSubmit.summary.trim()
            && !messagesSubmit.summary.trim() && !messagesSubmit.score.trim()) {
            return true
        }
        return false
    }
    /*add the data of the test to firebase*/
    const handleOnSubmit = async (newTest, setMessages) => {
        if (!checkData(setMessages, newTest)) {
            return false
        }
        // if the data is ok add the test
        await addDoc(collection(db, "patients/" + patientId + "/therapists/" + auth.currentUser.uid + "/tests"), {
                ...newTest, category: category
            }
        )
        return true

    }
    /*delete the test from the firebase*/
    const handleDelete = async docId => {

        await deleteDoc(doc(collection(db, "patients"), patientId, "therapists", auth.currentUser.uid, 'tests',
            docId))
    }
    /*update the test to firebase*/
    const handleUpdate = async (docId, data, setMessages) => {
        if (!checkData(setMessages, data))
            return false
        await updateDoc(doc(collection(db, "patients"), patientId, "therapists", auth.currentUser.uid, 'tests',
            docId), data
        )
        return true
    }
    return (

        (category) ? (
            <>
                <Row className='p-2 align-content-start'>
                    <div style={{width: 'auto'}}>
                        <Form.Label className='fs-2'
                                    style={{fontWeight: 'bold'}}>{"מבחנים בתחום" + " " + category}</Form.Label></div>
                    <div style={{width: 'auto', alignSelf: "center"}}>
                        {type === 'therapist' && <AddTestDialog category={category} handleOnSubmit={handleOnSubmit}/>}
                    </div>
                </Row>
                {empty && testsList.length === 0 &&
                <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>כרגע, לא קיימים
                    מבחנים.</Form.Label> </Row>}
                {!empty && testsList.length === 0 &&
                <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>טוען...</Form.Label> </Row>}
                <Container className='align-items-center' style={{width: '70%'}}>

                    <br/>
                    <br/>

                    <Accordion alwaysOpen={true}>
                        {
                            testsList.map((t, i) => (
                                    <Accordion.Item eventKey={t.id}>
                                        <Accordion.Header>
                                            {t.description + ', ' + new Date(t.executionDate.seconds * 1000).toLocaleDateString()}
                                            &nbsp;&nbsp;
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Col>
                                                <Row>
                                                    <Form.Text>
                                                        תיאור המבחן:
                                                        &nbsp;
                                                        {t.description}
                                                    </Form.Text>
                                                </Row>

                                                <Row>
                                                    <Form.Text>
                                                        תאריך ביצוע:
                                                        &nbsp;
                                                        {new Date(t.executionDate.seconds * 1000).toLocaleDateString()}
                                                    </Form.Text>
                                                </Row>
                                                <Row>
                                                    <Form.Text>
                                                        {(t.status === 'done') ? (<div>בוצע</div>) : (<div>לא בוצע</div>)
                                                        }
                                                    </Form.Text>
                                                </Row>
                                                {t.status === 'done' && <>
                                                    <Row>
                                                        <Form.Text>
                                                            תוכן:
                                                            &nbsp;
                                                            {t.summary}
                                                        </Form.Text>
                                                    </Row>
                                                    <Row>
                                                        <Form.Text>
                                                            ניקוד:
                                                            &nbsp;
                                                            {t.score}
                                                        </Form.Text>
                                                    </Row>

                                                </>}

                                                {(type === 'therapist') &&
                                                <Row className='justify-content-end w-10'>
                                                    <Col md={1}>
                                                        <EditTestDialog testData={t} handleUpdate={handleUpdate}
                                                                        category={category}/>
                                                    </Col>
                                                    <Col md={1}>
                                                        <DeleteTestDialog handleDelete={handleDelete} testID={t.id}/>
                                                    </Col>
                                                </Row>}
                                            </Col>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            )
                        }
                    </Accordion>
                    <br/>
                    <br/>

                    {testsList.length > 0 && <Bar type="bar" data={{
                        labels: dates,
                        datasets: [
                            {
                                label: 'ציון',
                                data: scores,
                                backgroundColor: 'rgb(54, 162, 235)',
                            },
                        ],
                    }}options={{
                        scales: {
                            y: {
                                title: {
                                    font: {
                                        size: 16,
                                    },
                                    display: true,
                                    text: 'ניקוד למבחן'
                                },
                            },
                            x: {
                                title: {
                                    font: {
                                        size: 16,
                                    },
                                    display: true,
                                    text: 'תאריך מבחן'
                                },
                            }
                        },
                    }}
                    />}
                </Container></>) : (
            // ['קשר בין אישי']:[],['שיח קבוצתי']:[],['שמירת קשר עין']:[],['אקדמי']:[]
            <>

                {(Math.max(scores['אקדמי'].length, scores['שמירת קשר עין'].length,
                    scores['שיח קבוצתי'].length, scores['קשר בין אישי'].length) > 0) ? (
                    <Container className='align-items-center' style={{width: '70%'}}>
                        <Bar type="bar" data={{
                            labels: [...Array(Math.max(scores['אקדמי'].length, scores['שמירת קשר עין'].length,
                                scores['שיח קבוצתי'].length, scores['קשר בין אישי'].length)).keys()],
                            datasets: [
                                {
                                    label: 'אקדמי',
                                    data: scores['אקדמי'],
                                    backgroundColor: 'rgb(54, 162, 235)',
                                },
                                {
                                    label: 'שמירת קשר עין',
                                    data: scores['שמירת קשר עין'],
                                    backgroundColor: 'rgb(235,54,138)',
                                },
                                {
                                    label: 'שיח קבוצתי',
                                    data: scores['שיח קבוצתי'],
                                    backgroundColor: 'rgb(223,235,54)',
                                },
                                {
                                    label: 'קשר בין אישי',
                                    data: scores['קשר בין אישי'],
                                    backgroundColor: 'rgb(54,229,235)',
                                },
                            ],
                        }} options={{
                            scales: {
                                y: {
                                    title: {
                                        font: {
                                            size: 16,
                                        },
                                        display: true,
                                        text: 'ניקוד למבחן'
                                    },
                                },
                                x: {
                                    title: {
                                        font: {
                                            size: 16,
                                        },
                                        display: true,
                                        text: 'מספר מבחן'
                                    },
                                }
                            },
                        }}/>
                    </Container>) : (empty) ? (
                        <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>לא קיימים
                            מבחנים.</Form.Label> </Row>) :
                    <Row className='p-2 align-content-start'> <Form.Label className='fs-4'>טוען...</Form.Label> </Row>
                }

            </>)

    )

}

export default TestsList
/* dialog of add Test*/
function AddTestDialog({category, handleOnSubmit})
{

    const [show, setShow] = useState(false)
    const [load, setLoad] = useState(false)
    const [messages, setMessages] = useState({
        description: '',
        executionDate: '',
        difficulty: '',
        score: '', summary: ''
    })
    const handleClose = () => {
        setShow(false)
        setMessages({
            description: '',
            executionDate: '',
            difficulty: '',
            score: '', summary: ''
        })
        setNewTest({

            description: '',
            executionDate: '',
            status: 'not done',
            difficulty: '',
            score: '', summary: ''
        })
    }
    const handleShow = () => setShow(true);
    const [newTest, setNewTest] = useState({

        description: '',
        executionDate: '',
        status: 'not done',
        difficulty: '',
        score: '', summary: ''
    })


    return (
        <div>
            <Button id="addTest" variant="outline-dark" onClick={handleShow}><Plus className="m-1"/>
                הוסף מבחן
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{"הוספת מבחן " + category} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Col>
                        <Row>
                            <Form.Group controlId="date">
                                <Form.Label id="criteria_for_adding_test">תאריך ביצוע</Form.Label>

                                <Form.Control
                                    type="date"
                                    autoFocus
                                    onChange={e => setNewTest(
                                        {
                                            ...newTest,
                                            executionDate: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))
                                        }
                                    )}
                                />

                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.executionDate}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="description">
                                <Form.Label id="criteria_for_adding_test">תיאור מבחן</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setNewTest({...newTest, description: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.description}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="difficulty">
                                <Form.Label id="criteria_for_adding_test">קושי</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={e => setNewTest({...newTest, difficulty: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.difficulty}
                            </div>
                        </Row>
                        <Row>
                            <Form.Label id="criteria_for_adding_test">סטטוס</Form.Label>
                            {/*<Col>*/}
                            {/*    סטטוס*/}
                            {/*</Col>*/}
                            <Col md="auto">
                                <Form.Select id='status' /*disabled={userDetails.type === 'parent'}*/
                                             onChange={e => {
                                                 if (e.target.value === "not done") {
                                                     setNewTest({
                                                         ...newTest,
                                                         status: e.target.value,
                                                         summary: "",
                                                         score: ""
                                                     })

                                                 } else {
                                                     setNewTest({
                                                         ...newTest,
                                                         status: e.target.value,

                                                     })
                                                 }
                                             }}>
                                    <option style={{fontSize: 18}} id='ins4' value="not done">לא בוצע</option>
                                    <option style={{fontSize: 18}} id='ins1' value="done">בוצע</option>

                                </Form.Select>
                            </Col>
                        </Row>
                        {newTest.status === 'done' &&
                        <>
                            <Row>
                                <Form.Group controlId="summary">
                                    <Col><Form.Label id="criteria_for_adding_test">סיכום מפגש</Form.Label></Col>
                                    <Col>
                                <textarea style={{fontSize: 18, width: "460px"}}
                                          type="text"
                                          onChange={e => setNewTest({...newTest, summary: e.target.value})}

                                />
                                    </Col>

                                </Form.Group>
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.summary}
                                </div>
                            </Row>
                            <Row>
                                <Form.Group controlId="score">
                                    <Form.Label id="criteria_for_adding_test">ניקוד</Form.Label>
                                    <Form.Control
                                        type="number"
                                        onChange={e => setNewTest({...newTest, score: e.target.value})}

                                    />
                                </Form.Group>
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.score}
                                </div>
                            </Row>
                        </>
                        }
                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        בטל
                    </Button>
                    {
                        (load) ? (
                            <Button variant="success">
                                טוען...
                            </Button>
                        ) : (
                            <Button variant="success" onClick={async () => {
                                setLoad(true)

                                if (await handleOnSubmit(newTest, setMessages)) {
                                    handleClose()
                                }
                                setLoad(false)
                            }}>
                                שמור שינויים
                            </Button>
                        )
                    }

                </Modal.Footer>
            </Modal>
        </div>
    )
}
/* dialog of delete Test*/
function DeleteTestDialog(
{
    handleDelete, testID
}
)
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}><Trash/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>מחיקת מבחן</Modal.Title>
                </Modal.Header>
                <Modal.Body>האם אתה בטוח שברצונך למחוק את מבחן זה?</Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        handleClose()
                        handleDelete(testID)
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

function EditTestDialog(
{
    handleUpdate, testData, category
}
)
{
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState({
        description: '',
        executionDate: '',
        difficulty: '',
        score: '', summary: ''
    })
    const [newTestData, setNewTestData] = useState(testData);
    const handleClose = () => {
        setShow(false)
        setMessages({
            description: '',
            executionDate: '',
            difficulty: '',
            score: '', summary: ''
        })
    }

    const handleShow = () => setShow(true);
    useEffect(() => {
        setNewTestData(testData)
    }, [testData])

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}><Pencil/>
            </Button>

            <Modal show={show} onHide={() => {
                setNewTestData(testData)
                handleClose()
            }}>
                <Modal.Header>
                    <Modal.Title> {
                        "עריכת מבחן קיים בתחום: "
                        + category}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Col>
                        <Row>
                            <Form.Group controlId="date">
                                <Form.Label id="criteria_for_adding_test">תאריך ביצוע</Form.Label>
                                <Form.Control
                                    type="date"
                                    defaultValue={
                                        (() => {
                                            let year = new Date(newTestData.executionDate.seconds * 1000).getFullYear()
                                            let month = new Date(newTestData.executionDate.seconds * 1000).getMonth() + 1
                                            let day = new Date(newTestData.executionDate.seconds * 1000).getDate()

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

                                    onChange={e => setNewTestData(
                                        {
                                            ...newTestData,
                                            executionDate: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))
                                        }
                                    )}
                                />

                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.executionDate}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="description">
                                <Form.Label id="criteria_for_adding_test">תיאור מבחן</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newTestData.description}
                                    onChange={e => setNewTestData({...newTestData, description: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.description}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="difficulty">
                                <Form.Label id="criteria_for_adding_test">קושי</Form.Label>
                                <Form.Control
                                    value={newTestData.difficulty}
                                    type="number"
                                    onChange={e => setNewTestData({...newTestData, difficulty: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                {messages.difficulty}
                            </div>
                        </Row>
                        <Row>
                            <Form.Label id="criteria_for_adding_test">סטטוס:</Form.Label>
                            <Col md="auto">
                                <Form.Select id='status' /*disabled={userDetails.type === 'parent'}*/
                                             onChange={e => {
                                                 if (e.target.value === "not done") {
                                                     setNewTestData({
                                                         ...newTestData,
                                                         status: e.target.value,
                                                         summary: "",
                                                         score: ""
                                                     })

                                                 } else {
                                                     setNewTestData({
                                                         ...newTestData,
                                                         status: e.target.value,

                                                     })
                                                 }
                                             }}
                                             value={newTestData.status}>

                                    <option style={{fontSize: 18}} id='ins4' value="not done">לא בוצע</option>
                                    <option style={{fontSize: 18}} id='ins1' value="done">בוצע</option>

                                </Form.Select>
                            </Col>
                        </Row>
                        {newTestData.status === 'done' &&
                        <>
                            <Row>
                                <Form.Group controlId="summary">
                                    <Col><Form.Label id="criteria_for_adding_test">סיכום תרגיל</Form.Label></Col>
                                    <Col>
                                <textarea style={{fontSize: 18, width: "460px"}}
                                          type="text"
                                          value={newTestData.summary}
                                          onChange={e => setNewTestData({...newTestData, summary: e.target.value})}

                                />
                                    </Col>

                                </Form.Group>
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.summary}
                                </div>
                            </Row>
                            <Row>
                                <Form.Group controlId="score">
                                    <Form.Label id="criteria_for_adding_test">ניקוד</Form.Label>
                                    <Form.Control
                                        type="number"
                                        alue={newTestData.score}
                                        value={newTestData.score}
                                        onChange={e => setNewTestData({...newTestData, score: e.target.value})}

                                    />
                                </Form.Group>
                                <div style={{fontSize: 10, color: "red"}} id="invalid-feedback">
                                    {messages.score}
                                </div>
                            </Row></>}
                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setNewTestData(testData)
                        handleClose()
                    }}>
                        בטל
                    </Button>
                    <Button variant="success" onClick={async () => {

                        if (await handleUpdate(newTestData.id, newTestData, setMessages)) {
                            setNewTestData(newTestData)
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

