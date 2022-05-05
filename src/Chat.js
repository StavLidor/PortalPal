import React, {useEffect, useState, useCallback, useContext} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// import DiscussionBoard from 'react-discussion-board'

//import 'react-discussion-board/dist/index.css'

import './chat.css'
import HomePage from "./pages/home/HomePage";
import {Link} from "react-router-dom";
import {Col, ListGroup, Row, Form, Container, Button, ButtonGroup} from "react-bootstrap";
import {auth, db, getUserConnections} from "./firebase";
import {addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import firebase from "firebase/compat/app";
import Message from "./components/chats/message";

// import Button from "react-bootstrap/Button";

function Chat({otherUser, patient}) {
    console.log("otherUser", otherUser.id)
    console.log("patient", patient)
    console.log("user", auth.currentUser.uid)
    const [messages, setMessages] = useState([])
    const [talkers, setTalkers] = useState([])
    const [therapists, setTherapists] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const handleOnChange = e => {
        setNewMessage(e.target.value)

    }

    const sendMessage = async e => {
        e.preventDefault()
        if (newMessage.trim()) {
            const docRef = await addDoc(collection(db, "messages"), {
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                senderAndReceiver: {sender: auth.currentUser.uid, receiver: otherUser.id},
                patient: patient
            })
            setNewMessage('')
        }
    }


    useEffect(() => {
        const unsubscribe = query(collection(db, "messages"),
            where('patient', '==', patient), where("senderAndReceiver", 'in',
                [{receiver: auth.currentUser.uid, sender: otherUser.id},
                    {sender: auth.currentUser.uid, receiver: otherUser.id}]), orderBy("createdAt", "asc"), limit(100),
        )
        console.log("unsubscribe", unsubscribe)

        return onSnapshot(
            unsubscribe,
            (querySnapshot) => {

                let data = []
                querySnapshot.forEach((doc) => (
                    // console.log(doc)

                    data.push({...doc.data(), id: doc.id})

                ))
                console.log("DATA: ", data)
                setMessages(data)

            },
            (error) => {
                // TODO: Handle errors!
                console.log('error!!', error)
            })
        // console.log('blb')
        // const querySnapshot = await getDocs(unsubscribe)
        // let data = []
        // querySnapshot.forEach((doc) => (
        //     // console.log(doc)
        //
        //     data.push({...doc.data(), id: doc.id})
        //
        // ))
        //
        // console.log('data', data)
        // setMessages(data)
        // return unsubscribe


    }, [])

    return (
        <div className="maincontainer">
            <div class="container py-5 px-4">

                <div class="row rounded-lg overflow-hidden shadow">

                    <div class="col-12 px-0">
                        <div class="px-4 py-5 chat-box bg-white">


                            {messages.map(message => (
                                <div className="media w-50 mb-3">
                                    {/*<Container style={{width: "75%"}}>*/}
                                    <Row>
                                        <Col md="2">
                                            <img
                                                src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                                                alt="user"
                                                width="50" className="rounded-circle"/>
                                        </Col>
                                        <Col md="4" className="text-center p-2 m-2">
                                            <Form.Text>
                                                {
                                                    (() => {
                                                        if (message.senderAndReceiver.sender === auth.currentUser.uid) {
                                                            return "אני"
                                                        }
                                                        return otherUser.firstName + otherUser.lastName

                                                    })()}

                                            </Form.Text>
                                        </Col>
                                    </Row>
                                    {/*</Container>*/}
                                    <div className="media-body ml-3">
                                        <div className=/*"bg-light rounded py-2 px-3 mb-2"*/{(() => {
                                            if (message.senderAndReceiver.sender === auth.currentUser.uid) {
                                                return "bg-primary rounded py-2 px-3 mb-2"
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
                                </div>

                            ))}

                            <Container className="h-auto">
                                <Form  action="#" class="bg-light">
                                    {/*<div class="input-group">*/}
                                    <Container className="bottom-100">
                                    <ButtonGroup >
                                        {/*<Col>*/}
                                            <Form.Control onChange={handleOnChange} type="text" value={newMessage}
                                                          placeholder="Type a message"
                                                          aria-describedby="button-addon2"
                                                          class="form-control rounded-0 border-0 py-4 bg-light"/>
                                    {/*</Col>*/}

                                        {/*<div class="input-group-append">*/}
                                        {/*<Col>*/}
                                            <Button onClick={sendMessage} className=" rounded-3 m-2" size="md"
                                                    variant="outline-primary">שלח</Button>
                                        {/*</Col>*/}

                                        {/*</div>*/}
                                    </ButtonGroup>
                                    </Container>
                                    {/*    /!*<i*!/*/}
                                    {/*    /!*class="fa fa-paper-plane"></i>*!/*/}
                                    {/*</Button>*/}

                                    {/*</div>*/}
                                </Form>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Chat