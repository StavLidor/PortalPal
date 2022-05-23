import {Button, ButtonGroup, Col, Container, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import TableData from "./components/tableEdit/TableData";

import {resetPassword, signIn, signUp} from "./firebase"
import {validateEmail} from "./useFunction"

export function ForgotPasswordDialog({showDialog, setShowDialog,}) {
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState('')
    const [message,setMessage]=useState('')

    const onFormSubmit = async () => {

        if (validateEmail(email) !== null) {
            if(!await resetPassword(email)){
                setMessage("לא קיים חשבון עם האימייל הזה")
                return false
            }
            await resetPassword(email)
            return true
        }
        else {
            setMessage("אנא הזן אימייל תקין")
            return false
        }

    }

    return (
        <div>
            <Modal show={showDialog} onHide={() => {
                setShowDialog(false)
            }}>
                <Modal.Header>
                    <Modal.Title>איפוס סיסמה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className=" needs-validation" noValidate>
                        <Container className="w-auto" fluid="sm">
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label for="validationDefault01" className="text-center" style={{width: "100%",fontSize:18}}>הכנס
                                    את כתובת האימייל של החשבון שאת סיסמתו תרצה לאפס.</Form.Label>
                                <Row>
                                    <Col>
                                        אימייל:
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control className="" type='email' placeholder='email@gmail.com'
                                                      id='validationDefault01'
                                                      required onChange={e => setEmail(e.target.value)}/>
                                        <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                            {message}
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Col>
                   <Form.Label>{feedback}</Form.Label>
                    </Col>
                    <Col md={3}>
                    {feedback ==='' && <Button variant="primary" onClick={async () => {
                        if (await onFormSubmit()) {
                            setFeedback('נשלח אליך אימייל לאיפוס סיסמה!')
                        }

                    }}>
                        בצע איפוס
                    </Button>}
                        </Col>
                    <Col md={2}>
                    <Button variant="secondary" onClick={() => {
                        setShowDialog(false)
                    }
                    }>
                        בטל
                    </Button>
                        </Col>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ForgotPasswordDialog