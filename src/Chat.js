import React, {useEffect, useState, useCallback, useContext} from "react"
import ScrollToBottom, {useSticky, useScrollToBottom} from 'react-scroll-to-bottom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// import DiscussionBoard from 'react-discussion-board'

//import 'react-discussion-board/dist/index.css'

// import './chat.css'
import HomePage from "./pages/home/HomePage";
import {Link} from "react-router-dom";
import {Col, ListGroup, Row, Form, Container, Button, ButtonGroup} from "react-bootstrap";
import {auth, db, getUserConnections} from "./firebase";
import {addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import firebase from "firebase/compat/app";
import Message from "./components/chats/message";

// import Button from "react-bootstrap/Button";

function Chat({otherUser, patient, isActive}) {
    // console.log("otherUser", otherUser.id)
    // console.log("patient", patient)
    // console.log("user", auth.currentUser.uid)
    const [messages, setMessages] = useState([])
    const [talkers, setTalkers] = useState([])
    const [therapists, setTherapists] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const handleOnChange = e => {
        setNewMessage(e.target.value)

    }

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


    useEffect(() => {
        const unsubscribe = query(collection(db, "messages"),
            where('patient', '==', patient), where("senderAndReceiver", 'in',
                [{receiver: auth.currentUser.uid, sender: otherUser.id},
                    {sender: auth.currentUser.uid, receiver: otherUser.id}]), orderBy("createdAt", "asc"), limit(100),
        )
        // console.log("unsubscribe", unsubscribe)

        return onSnapshot(
            unsubscribe,
            (querySnapshot) => {

                let data = []
                querySnapshot.forEach((doc) => (
                    // console.log(doc)

                    data.push({...doc.data(), id: doc.id})

                ))
                // console.log("DATA: ", data)
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
            {/*<div class="container py-5 px-4">*/}

                {/*<div class="row rounded-lg overflow-hidden shadow">*/}

                    {/*<div class="col-12 px-0">*/}
                        <div class="px-4 py-2 chat-box bg-white m-3 p-1">
                            {/*<Container>*/}
                            <Col>
                            {/*<Row className="mb-3">*/}
{/*<ScrollToBottom>*/}
    {/*{(() => {*/}
    {/*    const scrollToBottom = useScrollToBottom()*/}
    {/*    const [sticky] = useSticky()*/}

    {/*    return (*/}
    {/*        <React.Fragment>*/}
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
                    </Row>

                ))}
                {/*</Row>*/}
                {/*{!sticky && <button onClick={scrollToBottom}>Click me to scroll to bottom</button>}*/}

            {/*</React.Fragment>*/}
    {/*)*/}
    {/*})()}*/}
{/*</ScrollToBottom>*/}


                            </Col>

                        </div>
            {isActive==='active' && <div className="px-2 py-1 bg-white m-3 p-1">
            {/*<Row className="w-auto">*/}
                {/*<Form action="#" class="bg-light">*/}
                    {/*<div class="input-group">*/}

                     <ButtonGroup className="w-100">
                        {/*<Col>*/}
                        <Form.Control onChange={handleOnChange} type="text" value={newMessage}
                                      placeholder="הקלד הודעה..."
                                      aria-describedby="button-addon2"
                                      class="form-control rounded-0 border-0 py-4 bg-light"
                        style={{width:"100%"}}/>
                        {/*</Col>*/}

                        {/*<div class="input-group-append">*/}
                        {/*<Col>*/}
                        <Button onClick={sendMessage} className="rounded-3 m-2" size="md"
                                variant="outline-primary">שלח</Button>
                        {/*</Col>*/}

                        {/*</div>*/}
                    </ButtonGroup>
                    {/*    /!*<i*!/*/}
                    {/*    /!*class="fa fa-paper-plane"></i>*!/*/}
                    {/*</Button>*/}

                    {/*</div>*/}
                {/*</Form>*/}

                {/*</Container>*/}
            {/*</Row>*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>*/}
            </div>}
        </div>
    )

}

export default Chat