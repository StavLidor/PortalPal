import {Accordion, Button, ButtonGroup, Col, Container, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Bar, Scatter, Bubble,Line, Radar} from 'react-chartjs-2';
import TableData from "./components/tableEdit/TableData";

import firebase from "firebase/compat/app";
import {Pencil, Plus, Trash} from "react-bootstrap-icons";
import {auth, db} from "./firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where
} from "firebase/firestore";
// import {max} from "moment";

function TestsList({patientId, therapistId = null, type,category = null}) {
    const [testsList, setTestsList] = useState([])
    const [dates, setDates] = useState([])
    const [scores, setScores] = useState((()=>{
        if(category)
            return []
        return {['קשר בין אישי']:[],['שיח קבוצתי']:[],['שמירת קשר עין']:[],['אקדמי']:[]}
    })())
    // const data2 = {
    //     labels: dates,
    //     datasets: [
    //         {
    //             label: 'ציון',
    //             data: scores,
    //             backgroundColor: 'rgb(54, 162, 235)',
    //         },
    //         // {
    //         //     label: 'כשלונות',
    //         //     data: failures,
    //         //     backgroundColor: 'rgb(255, 99, 132)',
    //         // },
    //     ],
    // }
    useEffect(async () => {
        console.log('useEffect')
        let q
        let therapistIDForSession = (() => {
            if (type === 'parent')
                return therapistId
            return auth.currentUser.uid
        })()
        if(category){
            q = query(collection(db, "patients/" + patientId + "/therapists/" + therapistIDForSession + "/tests"),
                /*where('status','==','done'),*/
                where('category','==',category),orderBy("executionDate", "desc"))
        }
        else{
            q = query(collection(db, "patients/" + patientId + "/therapists/" + therapistIDForSession + "/tests"),
                where('status','==','done')/*,
                orderBy("category", "desc")*/,orderBy("executionDate", "asc"))
        }

        console.log("q: ", q)
        if (type === 'parent') {
           // console.log('allDetailsMeetings222')

            const tests = []
            let datesArr=[]
            let scoresArr=[]
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    tests.push({...doc.data(), id: doc.id})
                    datesArr.push(new Date(doc.data().executionDate.seconds * 1000).toLocaleDateString())
                    scoresArr.push(doc.data().score)
                    console.log('id', doc.id)
                    // if (doc.sessionsData().client === id){
                    //
                    // }


                });
                setTestsList(tests)
                setDates(datesArr.reverse())
                setScores(scoresArr.reverse())
            })

        } else {
            return onSnapshot(
                q,
                (querySnapshot) => {
                    let tests = []
                    let datesArr=[]
                    let scoresArr=[]
                    let scoresDic={['קשר בין אישי']:[],['שיח קבוצתי']:[],['שמירת קשר עין']:[],['אקדמי']:[]}
                    querySnapshot.forEach((doc) => {
                            tests.push({...doc.data(), id: doc.id})
                            if(category){
                                if(doc.data().status ==='done'){
                                    datesArr.push(new Date(doc.data().executionDate.seconds * 1000).toLocaleDateString())
                                    scoresArr.push(doc.data().score)
                                }

                            }
                            else{
                                scoresDic[doc.data().category].push(doc.data().score)
                            }

                    }

                        // console.log(doc)



                    )
                    setDates(datesArr.reverse())
                    console.log("tests: ", tests)
                    if(category){
                        setTestsList(tests)
                        setScores(scoresArr.reverse())
                    }
                    else{
                        setScores(scoresDic)
                    }

                    //console.log("sessionsData: ", sessionsData)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })
        }

    }, [])
    const checkData=(setMessages,test)=>{
        //console.log(session)
        const messagesSubmit={ description: '',
            executionDate: '',
            difficulty:'',
            score:'',summary:''}
        // e.preventDefault()
        //console.log(session.date ==="")
        if(test.executionDate ===""){
            messagesSubmit.executionDate='הכנס תאריך ביצוע'
        }
        if(test.difficulty ===""){
            messagesSubmit.difficulty='הכנס קושי'
        }
        if(!test.description.trim()){
            messagesSubmit.description='הכנס תיאור מבחן'
        }

        if(test.status === 'done'){
            if(!test.summary.trim()){
                messagesSubmit.summary='הכנס סיכום מבחן'
            }
            if(!test.score.trim()){
                // TODO: chack if it can be int
                messagesSubmit.score='הכנס ניקוד מבחן'
            }
        }
        setMessages(messagesSubmit)
        console.log(messagesSubmit)
        if(!messagesSubmit.executionDate.trim() && !messagesSubmit.description.trim()&& !messagesSubmit.summary.trim()
        &&!messagesSubmit.summary.trim() && !messagesSubmit.score.trim()){
            return true
        }
        return false
    }
    const handleOnSubmit = async (newTest,setMessages) => {
        console.log('ADDDDDDDDDDD')
        if(!checkData(setMessages,newTest)){
            return false
        }

       // console.log("new session: " ,newSession)
       console.log("path:" ,"patients/" + patientId + "/therapists/" + auth.currentUser.uid + '/tests')
        // e.preventDefault()
        // newSession.until = firebase.firestore.Timestamp.fromDate(new Date(newSession.until))
        await addDoc(collection(db, "patients/" + patientId + "/therapists/" + auth.currentUser.uid + "/tests"), {
            ...newTest,category:category
            }
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
        await deleteDoc(doc(collection(db, "patients"), patientId, "therapists", auth.currentUser.uid, 'tests',
            docId))
        // await deleteDoc(doc(db, "exercises", docId))
    }
    const handleUpdate = async (docId, data,setMessages) => {
        if(!checkData(setMessages,data))
            return false
        // await updateIDDoc(docId, "exercises", data)
        await updateDoc(doc(collection(db, "patients"), patientId, "therapists", auth.currentUser.uid, 'tests',
                docId),data
        )
        return true
    }
    return (

        (category)?(
            <Container className='align-items-center' style={{width:'70%'}}>
            <Row className='p-2 align-content-start'>
                <div style={{width:'auto'}}>
                    <Form.Label className='fs-2' style={{fontWeight: 'bold'}}>{"מבחנים של"+" "+category}</Form.Label></div>
                <div style={{width:'auto',alignSelf:"center"}}>
                    {type === 'therapist' && <AddTestDialog  category={category} handleOnSubmit={handleOnSubmit}/>}
                </div>
            </Row>
                <br/>
                <br/>
            <Accordion alwaysOpen={true}>
                {
                    testsList.map((t, i) => (
                            <Accordion.Item eventKey={t.id}>
                                <Accordion.Header>
                                    {t.description+ ', ' +new Date(t. executionDate.seconds * 1000).toLocaleDateString()}
                                    &nbsp;&nbsp;
                                    {/*{e.createdAt.toDate().toUTCString() + e.place}*/}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Col>
                                        <Row>
                                            <Form.Text>
                                                תיאור המבחן:
                                                &nbsp;
                                                {t. description}
                                            </Form.Text>
                                        </Row>

                                        <Row>
                                            <Form.Text>
                                                תאריך ביצוע:
                                                &nbsp;
                                                {/*{s.date}*/}
                                                {new Date(t.executionDate.seconds * 1000).toLocaleDateString()}
                                            </Form.Text>
                                        </Row>
                                        <Row>
                                            <Form.Text>
                                                {(t.status === 'done')?(<div>בוצע</div>):(<div>לא בוצע</div>)
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

                                        </> }

                                        {(type === 'therapist') &&
                                            <Row className='justify-content-end w-10'>
                                                <Col className="m-1" md={1}>
                                                    <EditTestDialog testData={t}  handleUpdate={handleUpdate}
                                                    category={category}/>
                                                </Col>
                                                <Col className="m-1" md={1}>
                                                    <DeleteTestDialog handleDelete={handleDelete} testID={t.id} />
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

            <Bar type="bar" data={ {
                labels: dates,
                datasets: [
                    {
                        label: 'ציון',
                        data: scores,
                        backgroundColor: 'rgb(54, 162, 235)',
                    },
                ],
            }}  />
            </Container>):(
            // ['קשר בין אישי']:[],['שיח קבוצתי']:[],['שמירת קשר עין']:[],['אקדמי']:[]
            <Container className='align-items-center' style={{width:'70%'}}>
            <Bar type="bar" data={ {
                labels:[...Array(Math.max(scores['אקדמי'].length,scores['שמירת קשר עין'].length,
                    scores['שיח קבוצתי'].length,scores['קשר בין אישי'].length)).keys()],
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
            }}  />
            </Container>
        )

    )

}
export default TestsList
function AddTestDialog({category,handleOnSubmit}) {
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState('')
    const [show, setShow] = useState(false)
    const [messages,setMessages]=useState({
        description: '',
        executionDate: '',
        difficulty:'',
        score:'',summary:''
    })
    const handleClose = () => {setShow(false)
        setMessages({description: '',
            executionDate: '',
            difficulty:'',
            score:'',summary:''})
        setNewTest({

            description: '',
            executionDate: '',
            status: 'not done',
            difficulty:'',
            score:'',summary:''
        })
    }
    const handleShow = () => setShow(true);
    const [newTest, setNewTest] = useState({

        description: '',
        executionDate: '',
        status: 'not done',
        difficulty:'',
        score:'',summary:''
    })



    return (
        <div>
            <Button  variant="outline-dark" onClick={handleShow}><Plus className= "m-1"/>
                הוסף מבחן
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{"הוספת מבחן "+category} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Col>
                        <Row>
                            <Form.Group controlId="date">
                                <Form.Label>תאריך ביצוע</Form.Label>

                                <Form.Control
                                    type="date"
                                    autoFocus
                                    onChange={e => setNewTest(
                                        {...newTest, executionDate: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))}
                                    )}
                                />

                            </Form.Group>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.executionDate}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="description">
                                <Form.Label>תיאור מבחן</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={e => setNewTest({...newTest, description: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.description}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="difficulty">
                                <Form.Label>קושי</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={e => setNewTest({...newTest, difficulty: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.difficulty}
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                סטטוס:
                            </Col>
                            <Col md="auto">
                                <Form.Select id='status' /*disabled={userDetails.type === 'parent'}*/
                                             onChange={e => {
                                                 if(e.target.value === "not done"){
                                                     setNewTest({
                                                         ...newTest,
                                                         status: e.target.value,
                                                         summary:"",
                                                         score:""
                                                     })

                                                 }
                                                 else{
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
                                    <Col><Form.Label>סיכום מפגש</Form.Label></Col>
                                    <Col>
                                <textarea style={{width:"460px"}}
                                          type="text"
                                          onChange={e => setNewTest({...newTest, summary: e.target.value})}

                                />
                                    </Col>

                                </Form.Group>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.summary}
                                </div>
                            </Row>
                            <Row>
                                <Form.Group controlId="score">
                                    <Form.Label>ניקוד</Form.Label>
                                    <Form.Control
                                        type="number"
                                        onChange={e => setNewTest({...newTest, score: e.target.value})}

                                    />
                                </Form.Group>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
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
                    <Button variant="success" onClick={async () => {

                        if (await handleOnSubmit(newTest,setMessages)) {
                            handleClose()
                        }
                    }}>
                        שמור שינויים
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
function DeleteTestDialog({handleDelete, testID}) {
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
                האם אתה בטוח שברצונך למחוק את מבחן זה?
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                        handleDelete(testID)
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
function EditTestDialog({handleUpdate, testData,category}) {
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState({
        description: '',
        executionDate: '',
        difficulty:'',
        score:'',summary:''
    })
    const [newTestData, setNewTestData] = useState(testData);
    const handleClose = () => {setShow(false)
        setMessages({ description: '',
            executionDate: '',
            difficulty:'',
            score:'',summary:''})}

    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}><Pencil/>
            </Button>

            <Modal show={show} onHide={()=> {
                setNewTestData(testData)
                handleClose()
            }}>
                <Modal.Header>
                    <Modal.Title> {
                        "עריכת מבחן קיים בתחום "
                    +category}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Col>
                        <Row>
                            <Form.Group controlId="date">
                                <Form.Label>תאריך ביצוע</Form.Label>
                                <Form.Control
                                    type="date"
                                    defaultValue={
                                        (()=>{
                                            let year = new Date(newTestData.executionDate.seconds * 1000).getFullYear()
                                            let month = new Date(newTestData.executionDate.seconds * 1000).getMonth() + 1
                                            let day = new Date(newTestData.executionDate.seconds * 1000).getDate()

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

                                    onChange={e => setNewTestData(
                                        {...newTestData, executionDate: firebase.firestore.Timestamp.fromDate(new Date(e.target.value))}
                                    )}
                                />

                            </Form.Group>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.executionDate}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="description">
                                <Form.Label>תיאור מבחן</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newTestData.description}
                                    onChange={e => setNewTestData({...newTestData, description: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.description}
                            </div>
                        </Row>
                        <Row>
                            <Form.Group controlId="difficulty">
                                <Form.Label>קושי</Form.Label>
                                <Form.Control
                                    value={newTestData.difficulty}
                                    type="text"
                                    onChange={e => setNewTestData({...newTestData, difficulty: e.target.value})}

                                />
                            </Form.Group>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.difficulty}
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                סטטוס:
                            </Col>
                            <Col md="auto">
                                <Form.Select id='status' /*disabled={userDetails.type === 'parent'}*/
                                             onChange={e => {
                                                 if(e.target.value === "not done"){
                                                     setNewTestData({
                                                         ...newTestData,
                                                         status: e.target.value,
                                                         summary:"",
                                                         score:""
                                                     })

                                                 }
                                                 else{
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
                                    <Col><Form.Label>סיכום תרגיל</Form.Label></Col>
                                    <Col>
                                <textarea style={{width:"460px"}}
                                          type="text"
                                          value={newTestData.summary}
                                          onChange={e => setNewTestData({...newTestData, summary: e.target.value})}

                                />
                                    </Col>

                                </Form.Group>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.summary}
                                </div>
                            </Row>
                            <Row>
                                <Form.Group controlId="score">
                                    <Form.Label>ניקוד</Form.Label>
                                    <Form.Control
                                        type="text"
                                        alue={newTestData.score}
                                        value={newTestData.score}
                                        onChange={e => setNewTestData({...newTestData, score: e.target.value})}

                                    />
                                </Form.Group>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.score}
                                </div>
                            </Row></>}
                    </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                        setNewTestData(testData)
                        handleClose()
                    }}>
                        בטל
                    </Button>
                    <Button variant="success" onClick={async () => {

                        console.log("new: ", newTestData)
                        console.log("newExerciseData.until: ", newTestData.date)
                        if (await handleUpdate(newTestData.id, newTestData, setMessages))

                        {
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

