import {Button, Form, Row, Col, Container, ButtonGroup, Grid} from 'react-bootstrap'
import React, {useEffect, useState, useCallback, useContext} from "react";
import firebaseApp, {signIn, signUp, signOutCurrentUser, getCurrentUser} from '../../firebase'
// import {setDisplayLoginForm} from "./Authenticate.js"
import {validateEmail} from "../../useFunction"

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
        lastName: "",jobs:[], license: "",titles:['therapist'] ,email: "", password: "",institute:"", institutes: {external: []},
        childrenIds:{}
    })
    const [messages, setMessages] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        license: ""
    })
    const onSignUp = async e => {
        e.preventDefault()
        const messagesUpdate={
            firstName: "",
            lastName: "",
            email: "",
            password: "",license: ""}
        //setMessages(messages)
        if(!userDetails.firstName.trim()){
            messagesUpdate.firstName ='אנא,הכנס שם פרטי'
        }
        if(!userDetails.license.trim()){
            messagesUpdate.license ='אנא,הכנס מספר רישיון'
        }
         if(!userDetails.lastName.trim()){
             messagesUpdate.lastName ='אנא,הכנס שם משפחה'
        }
         if(userDetails.password.length<6){
             messagesUpdate.password ='אנא,הכנס סיסמא באורך 6 לפחות'
        }
        if(!validateEmail(userDetails.email)){
            messagesUpdate.email ='אנא,הכנס מייל חוקי'
        }

        setMessages(messagesUpdate)
        if(messagesUpdate.firstName==='' && messagesUpdate.lastName==='' &&
            messagesUpdate.password===''&& messagesUpdate.email==='' &&
            messagesUpdate.license===''){
            if(await signUp(userDetails)){
                setDisplayLoginForm(true)
            }
            else {
                messagesUpdate.email ='קיים חשבון עם מייל זה'
            }
        }
    }

    return (<div className='login'>
        <Form
            /*onSubmit={onSignUp}*/  className="needs-validation" noValidate>
            <Container className="w-auto" fluid="sm">
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label  for="validationDefault01" className="text-center" style={{width: "100%"}}>צור חשבון מטפל חדש</Form.Label>
                    <Row>
                        <Col className='fs-5'>
                            שם פרטי:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='validationDefault01' required
                                          onChange={e => setUserDetails({...userDetails, firstName: e.target.value})}/>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.firstName}
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='fs-5'>
                            שם משפחה:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='validationDefault01' required
                                          onChange={e => setUserDetails({...userDetails, lastName: e.target.value})}/>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.lastName}
                            </div>
                        </Col>
                    </Row>


                    <Row>
                        <Col className='fs-5'>
                            אימייל:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='validationDefault01' required type='email' placeholder='example@gmail.com'
                                          onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.email}
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='fs-5'>
                            סיסמה:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='validationDefault01' required type='password' placeholder='סיסמה'
                                          onChange={e => setUserDetails({
                                              ...userDetails,
                                              password: e.target.value
                                          })}

                            />
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.password}
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='fs-5'>
                            מספר רישיון:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='license'
                                          onChange={e => setUserDetails({...userDetails, license: e.target.value})}/>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.license}
                            </div>
                        </Col>
                    </Row>

                </Form.Group>
                <Row className="p-1" md="10">
                    <ButtonGroup className="gap-4">
                        <Button className="rounded-3" size="md" onClick={onSignUp} variant="secondary" id='default-button-darker-static'>צור חשבון</Button>
                        <Button className="rounded-3" variant="outline-secondary" size="md" id='default-button-darker'
                                onClick={() => setDisplayLoginForm(true)}>התחבר עם חשבון קיים</Button>
                    </ButtonGroup>
                </Row>

            </Container>
        </Form>
    </div>)
}

export default SignUp
