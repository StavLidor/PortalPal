import React, {useState} from "react";
import {Button, Form, Row, Col, Container, ButtonGroup} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import {signIn} from '../../firebase'
import {validateEmail} from "../../useFunction"




function Login({login, setDisplayLoginForm}) {
    //TODO: delete default values.
    const [userDetails, setUserDetails] = useState({
        email: "toko1010@gmail.com",
        password: "123456",
        type: "therapist",
        institute: 1
    })
    const [messages, setMessages] = useState({
        email: "",
        password: "",
    })
    const [msg, setMsg] = useState('')//TODO: make sure default values are correct

    const onLogin = async e => {

        e.preventDefault()
        // setMessages({email: "",
        //     password: ""})
        console.log(userDetails)
        // console.log("TYPEEEEEE: ", validateEmail(userDetails.email) )
        // if (validateEmail(userDetails.email)) {
        //     $result.text(email + ' is valid :)');
        //     $result.css('color', 'green');
        // } else {
        //     $result.text(email + ' is not valid :(');
        //     $result.css('color', 'red');
        // }
        // return false;
        if (validateEmail(userDetails.email) !== null) {
            let result = await signIn(userDetails.email, userDetails.password)
            if(result === false){
                setMessages({email:"",password:"לא נמצא התאמה בין הסיסמא למייל,אנא נסה שנית"})
            }
            else{
                login(userDetails.type, userDetails.institute, result)
            }

        } else {
            //setMsg("אנא הזן אימייל תקין")
            //console.log("MSG: ", msg)
            setMessages({password:"",email:"אנא הזן אימייל תקין"})

        }


    }

    const changeForm = e => {
        e.preventDefault()
        setDisplayLoginForm(false)
    }


    return (
        <div className='login'>
            <Form  className=" needs-validation" noValidate>
                <Container className="w-auto" fluid="sm">
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label for="validationDefault01" className="text-center" style={{width: "100%"}}>התחברות</Form.Label>
                        <Row>
                            <Col>
                                אימייל:
                            </Col>
                            <Col md="auto">
                                <Form.Control  className="" type='email' placeholder='toko@gmail.com' id='validationDefault01'
                                           required  onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>
                                <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                    {messages.email}
                                </div>
                            </Col>
                        </Row>
                        {/*<Row>*/}
                        {/*    /!*<div className="col-md-3">*!/*/}
                        {/*    <label htmlFor="validationServer05" className="form-label">Zip</label>*/}
                        {/*    <input type="email" className="form-control is-invalid" id="validationServer05"*/}
                        {/*           aria-describedby="validationServer05Feedback" required/>*/}
                        {/*    {(msg!=='') && <div id="validationServer05Feedback" className="invalid-feedback">*/}
                        {/*        {msg}*/}
                        {/*    </div>}*/}
                        {/*    /!*</div>*!/*/}
                        {/*</Row>*/}

                        <Row>
                            <Col>
                                סיסמה:
                            </Col>
                            {/*<Col md="auto">*/}
                            {/*    <Form.Control type='password' placeholder='סיסמה' id='password'*/}
                            {/*                  onChange={e => setUserDetails({*/}
                            {/*                      ...userDetails,*/}
                            {/*                      password: e.target.value*/}
                            {/*                  })}/>*/}
                            {/*</Col>*/}
                            <Col md="auto">
                                <Form.Control  className="" type='password' placeholder='סיסמה' id='validationDefault01'
                                               required  onChange={e => setUserDetails({
                                    ...userDetails,
                                    password: e.target.value
                                })}/>
                                {/*{(msg!=='') && <div class="invalid-feedback" >*/}
                                {/*    {msg}*/}
                                {/*</div>}*/}
                                {/*<div style={{fontSize: 10,color: "red"}} id="invalid-feedback">*/}
                                {/*    {messages.password}*/}
                                {/*</div>*/}
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                תפקיד:
                            </Col>
                            <Col md="auto">
                                <Form.Select id='type'
                                             onChange={e => setUserDetails({...userDetails, type: e.target.value})}>
                                    <option style={{fontSize: 18}} id='title1' value="therapist">מטפל</option>
                                    <option style={{fontSize: 18}} id='title2' value="parent">הורה</option>
                                    <option style={{fontSize: 18}} id='title3' value="admin">ניהול</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                מוסד:
                            </Col>
                            <Col md="auto">
                                <Form.Select id='institute' /*disabled={userDetails.type === 'parent'}*/
                                             onChange={e => setUserDetails({
                                                 ...userDetails,
                                                 institute: e.target.value
                                             })}>
                                    <option style={{fontSize: 18}} id='ins1' value={1}>1</option>
                                    <option style={{fontSize: 18}} id='ins2'>2</option>
                                    <option style={{fontSize: 18}} id='ins3'>3</option>
                                    <option style={{fontSize: 18}} id='ins4' value="external">חיצוני</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Row className="p-1" md="10">
                        <ButtonGroup className="gap-4">
                            <Button className="rounded-3" size="md" onClick={onLogin}>התחבר</Button>
                            <Button className="rounded-3" variant="outline-primary" size="md"
                                    onClick={changeForm}>הירשם</Button>
                        </ButtonGroup>
                    </Row>
                    <Row>

                        <Form.Text style={{fontSize:16,}}>שכחתי סיסמה...</Form.Text>
                    </Row>
                    <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                        {messages.password}
                    </div>
                </Container>

            </Form>
        </div>
    )
}

export default Login;