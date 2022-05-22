import React, {useState} from "react";
import {addExternal} from "./firebase";
import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";

export function ContactUs() {
    const [details, setDetails] = useState({
        name:"",email:"",subject:"",content:""
    })
    const [messages, setMessages] = useState({
        name:"",email:"",subject:"",content:""
    })


    return (
        <div className='AddTypeExternalTherapist'>
            <Form
                /*onSubmit={onSignUp}*/ className="needs-validation" noValidate>
                <Container className="w-auto" fluid="sm">
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label for="validationDefault01" className="text-center" style={{width: "100%"}}>צור קשר</Form.Label>
                        <Row>
                            <Col>
                                שם:
                            </Col>
                            <Col md="auto">
                                <Form.Control id='validationDefault01' required
                                              onChange={e => setDetails({...details, name: e.target.value})}/>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.name}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                אימייל:
                            </Col>
                            <Col md="auto">
                                <Form.Control id='validationDefault01' required type='email' placeholder='toko@gmail.com'
                                              onChange={e => setDetails({...details, email: e.target.value})}/>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.email}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                נושא:
                            </Col>
                            <Col md="auto">
                                <Form.Control id='validationDefault01' required
                                              onChange={e => setDetails({...details, subject: e.target.value})}/>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.subject}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                תוכן פניה:
                            </Col>
                            <Col md="auto">
                                <Form.Control id='validationDefault01' required
                                              onChange={e => setDetails({...details, content: e.target.value})}/>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.content}
                                </div>
                            </Col>
                        </Row>

                    </Form.Group>
                    <Row className="p-1" md="10">
                        <ButtonGroup className="gap-4">
                            <Button className="rounded-3" variant="outline-primary" size="md"
                                    /*onClick={}*/>שלח</Button>
                        </ButtonGroup>
                    </Row>
                </Container>
            </Form>
        </div>)
}
