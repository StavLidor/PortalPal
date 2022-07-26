import React, {useEffect, useState, useCallback, useContext} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {Col, ListGroup, Row, Form, Container, Button, ButtonGroup} from "react-bootstrap";
import {auth, db} from "../../firebase";
import {addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import firebase from "firebase/compat/app";


function Chat({otherUser, patient, isActive}) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const handleOnChange = e => {
        setNewMessage(e.target.value)

    }
    // add message to the firebase
    const sendMessage = async e => {
        e.preventDefault()
        const message=newMessage
        setNewMessage('')
        if (message.trim()) {
            const docRef = await addDoc(collection(db, "messages"), {
                text: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                senderAndReceiver: {sender: auth.currentUser.uid, receiver: otherUser.id},
                patient: patient
            })

        }
    }

    // when open this component
    useEffect(() => {
        // get all message of this user to otherUser 'about the current patient
        const unsubscribe = query(collection(db, "messages"),
            where('patient', '==', patient), where("senderAndReceiver", 'in',
                [{receiver: auth.currentUser.uid, sender: otherUser.id},
                    {sender: auth.currentUser.uid, receiver: otherUser.id}]), orderBy("createdAt", "asc"), limit(100),
        )

        return onSnapshot(
            unsubscribe,
            (querySnapshot) => {

                let data = []
                querySnapshot.forEach((doc) => (

                    data.push({...doc.data(), id: doc.id})

                ))
                setMessages(data)

            },
            (error) => {
                //  Handle errors!
            })
    }, [])

    return (
        <div className="maincontainer">
                        <div class="px-4 py-2 chat-box bg-white m-3 p-1">
                            {/*<Container>*/}
                            <Col>
                {messages.map(message => (
                    <Row className="media w-50 mb-1 ">
                        {/*<Container style={{width: "75%"}}>*/}
                        <Row className="p-1 justify-content-start">
                            <Col md="1">
                                <img
                                    src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                                    alt="user"
                                    width="35" className="rounded-circle"/>
                            </Col>
                            <Col md="7">
                                <Form.Text className="p-2 m-3" style={{fontSize: 10}}>
                                    {
                                        (() => {
                                            if (message.senderAndReceiver.sender === auth.currentUser.uid) {
                                                return "אני"
                                            }
                                            return otherUser.firstName + ' ' + otherUser.lastName

                                        })()}

                                </Form.Text>
                            </Col>
                        </Row>
                        {/*</Container>*/}
                        <div className="media-body ml-3">
                            <div className=/*"bg-light rounded py-2 px-3 mb-2"*/{(() => {
                                if (message.senderAndReceiver.sender === auth.currentUser.uid) {
                                    return "bg-secondary rounded py-2 px-3 mb-2"
                                }
                                return "bg-light rounded py-2 px-3 mb-2"

                            })()}>
                                <p className=/*"text-small mb-0 text-muted"*/
                                       {(() => {
                                           if (message.senderAndReceiver.sender === auth.currentUser.uid) {
                                               return "text-small mb-0 text-white"
                                           }
                                           return "text-small mb-0 text-muted"

                                       })()}
                                >{message.text}
                                </p>
                            </div>
                            <p style={{fontSize: 11}}
                               className="small text-muted">{message.createdAt?.toDate().toString()}</p>
                        </div>
                    </Row>

                ))}
                            </Col>

                        </div>
            {isActive==='active' && <div className="px-2 py-1 bg-white m-3 p-1">
                     <ButtonGroup className="w-100 align-items-center">
                        <Form.Control onChange={handleOnChange} type="text" value={newMessage}
                                      placeholder="הקלד הודעה..."
                                      aria-describedby="button-addon2"
                                      class="form-control rounded-0 border-0 py-4 bg-light"
                        style={{width:"100%",height:'50px'}}/>

                        <Button onClick={sendMessage} className="rounded-3 m-2" size="md"
                                variant="success" style={{width:"80px",height:'50px'}}>שלח</Button>
                    </ButtonGroup>
            </div>}
        </div>
    )

}

export default Chat