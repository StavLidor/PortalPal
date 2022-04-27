import {Button, Form, Row, Col, Container, ButtonGroup, Grid} from 'react-bootstrap'
import React, {useEffect, useState, useCallback, useContext} from "react";
import firebaseApp, {signIn, signUp, signOutCurrentUser, getCurrentUser} from '../../firebase'
// import {setDisplayLoginForm} from "./Authenticate.js";

function SignUp({setDisplayLoginForm})  {
    //Users Fields:

    //     email: string
    // firstName: string
    // lastName: string
    // jobs: [] (therapist only)
    // license only external therapist
    // titles: [parent / therapist / admin]
    // institute: string (admin only)
    // institutes: {1: ...patients.  external:...patients.} (therapist only)
    // childrenIds: [] (parent only)
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",jobs:[], license: "",titles:['מטפל'] ,email: "", password: "",institute:"", institutes: {external: []},
        childrenIds:[]
    });
    const onSignUp = async e => {
        e.preventDefault()
        console.log(userDetails)
        await signUp(userDetails)
    }

    return (<div className='login'>
        <Form
            onSubmit={onSignUp}>
            <Container className="w-auto" fluid="sm">
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className="text-center" style={{width: "100%"}}>צור חשבון מטפל חדש</Form.Label>
                    <Row>
                        <Col>
                            שם פרטי:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='firstName'
                                          onChange={e => setUserDetails({...userDetails, firstName: e.target.value})}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            שם משפחה:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='lastName'
                                          onChange={e => setUserDetails({...userDetails, lastName: e.target.value})}/>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            אימייל:
                        </Col>
                        <Col md="auto">
                            <Form.Control type='email' placeholder='toko@gmail.com' id='email'
                                          onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            סיסמה:
                        </Col>
                        <Col md="auto">
                            <Form.Control type='password' placeholder='סיסמה' id='password'
                                          onChange={e => setUserDetails({
                                              ...userDetails,
                                              password: e.target.value
                                          })}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            מספר רישיון:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='license'
                                          onChange={e => setUserDetails({...userDetails, license: e.target.value})}/>
                        </Col>
                    </Row>

                </Form.Group>
                <Row className="p-1" md="10">
                    <ButtonGroup className="gap-4">
                        <Button className="rounded-3" size="md" onClick={onSignUp}>צור חשבון</Button>
                        <Button className="rounded-3" variant="outline-primary" size="md"
                                onClick={() => setDisplayLoginForm(true)}>התחבר עם חשבון קיים</Button>
                    </ButtonGroup>
                </Row>

            </Container>
        </Form>
    </div>)
}

export default SignUp
