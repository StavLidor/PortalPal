import React, {useEffect, useState, useCallback, useContext} from "react";
import {auth, detailsPatient, detailsWorks, getDocCurrentUser, resetPassword, updatesCurrentUser} from "../../firebase"
import {Button, Form, Row, Col, Container, ButtonGroup, Grid} from 'react-bootstrap'
import {Redirect, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseApp, {signIn, signUp, signOutCurrentUser, getCurrentUser} from '../../firebase'
import {AuthContext} from "./Auth.js";

import App from "../../App";
import {signUser} from "../../pepole/users/user";
import {signInWithEmailAndPassword} from "firebase/auth";

function Login() {

    const [userDetails, setUserDetails] = useState({email: "", password: "", type: "therapist", institute: "external"});
    //
    // useEffect(()=>{
    //     const unsubscribe= auth.onAuthStateChanged(async user => {
    //         if (user) {
    //             console.log('user',user.uid)
    //             const p=Promise.resolve(user.uid)
    //             p.then(id => {
    //                 setIsMovePage(true)
    //                 setUser(id)
    //             })
    //
    //             resolver(await getDocCurrentUser())
    //
    //         } else {
    //             setIsMovePage(false)
    //             setInfo({id:'',firstName:'',lastName:'',students_arr:[],myDoc:'',emailCurrent:'',
    //                 passwordCurrent:'',institutionNumber:'',works:[]})
    //         }
    //     })
    //     return unsubscribe
    // },[])

    const onLogin = async e => {
        e.preventDefault()
        const form = e.currentTarget
        console.log(userDetails)
        await signIn(userDetails.email, userDetails.password)
        // if (userDetails.email !== '' && userDetails.password !== '') {
        //     try {
        //         const res = await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
        //         if (res!=null){
        //
        //         }
        //         //TODO: check null?
        //         return true
        //     } catch (err) {
        //         console.log(err)
        //         return false
        //     }
        // }
    }


    return (
        <div className='login'>
            <Form onSubmit={onLogin}>
                <Container className="w-auto" fluid="sm">
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-center" style={{width: "100%"}}>התחברות</Form.Label>
                        {/*<Container fluid="md">*/}
                        <Row>
                            <Col>
                                אימייל:
                            </Col>
                            <Col md="7">
                                <Form.Control type='email' placeholder='toko@gmail.com' id='email'
                                              onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                סיסמה:
                            </Col>
                            <Col md="7">
                                <Form.Control type='password' placeholder='סיסמה' id='password'
                                              onChange={e => setUserDetails({
                                                  ...userDetails,
                                                  password: e.target.value
                                              })}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                תפקיד:
                            </Col>
                            <Col md="7">
                                <Form.Select id='type'
                                             onChange={e => setUserDetails({...userDetails, type: e.target.value})}>
                                    <option style={{fontSize: 18}} id='title1'>מטפל</option>
                                    <option style={{fontSize: 18}} id='title2'>הורה</option>
                                    <option style={{fontSize: 18}} id='title3'>ניהול</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                מוסד:
                            </Col>
                            <Col md="7">
                                <Form.Select id='institute' onChange={e => setUserDetails({
                                    ...userDetails,
                                    institute: e.target.value
                                })}>
                                    <option style={{fontSize: 18}} id='ins1'>1</option>
                                    <option style={{fontSize: 18}} id='ins2'>2</option>
                                    <option style={{fontSize: 18}} id='ins3'>3</option>
                                    <option style={{fontSize: 18}} id='ins4'>חיצוני</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Row className="p-1" md="10">
                        <ButtonGroup className="gap-4">
                            <Button className="rounded-3" size="md" onClick={onLogin}>התחבר</Button>
                            <Button className="rounded-3" variant="outline-primary" size="md">הירשם</Button>
                        </ButtonGroup>
                    </Row>
                    <Row>

                        <Form.Text>שכחתי סיסמה...</Form.Text>
                    </Row>
                </Container>

            </Form>
        </div>

    )
}

export default Login;