import {Col, Form, Row, Button, ButtonGroup, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {auth, authAdd, updatesCurrentUser} from "../../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {ArrowRight, Pencil,Person} from 'react-bootstrap-icons';
import {validateEmail} from "../../useFunction";

export function MyProfile({userDetails}) {
    const [showChangeEmailDialog, setShowChangeEmailDialog] = useState(false)
    const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
    const [edit, setEdit] = useState(false)
    const [messagesEdit, setMessagesEdit] = useState({firstName:'',lastName:'',email:'',password:''})
    const [editDetails, setEditDetails] = useState({
        firstName: userDetails.firstName, lastName: userDetails.lastName, email: userDetails.email,
        lastPassword: "", newPassword1: "", newPassword2: "", newEmail1: "", newEmail2: ""
    })
    const [editPassword, setEditPassword] = useState(false)

    useEffect(() => {
        setEditDetails({
            firstName: userDetails.firstName, lastName: userDetails.lastName, email: userDetails.email,
            lastPassword: "", newPassword1: "", newPassword2: "", newEmail1: "", newEmail2: ""
        })
    }, [userDetails])
    const changeEmail = () => {
        setShowChangeEmailDialog(true)

    }
    const changePassword = () => {
        setShowChangePasswordDialog(true)
    }

    const changePasswordHandler = async () => {
        // e.preventDefault()
        // let data = {}
        // for (const [key, value] of Object.entries(editDetails)) {
        //     if (key in userDetails && value !== userDetails[key])
        //         data[key] = value
        // }
        // let flag = false
        if (editDetails.newPassword1 !== editDetails.newPassword2) {
            setMessagesEdit({...messagesEdit,password: 'סיסמאות לא זהות'})
            return false
        }
        if (editDetails.newPassword1.length < 6) {
            setMessagesEdit({...messagesEdit,password: 'סיסמא צרכה להיות מעל 6 תווים '})
            return false
        }
        let flag=false

        try {

            await signInWithEmailAndPassword(authAdd, userDetails.email, editDetails.lastPassword)
            // ensure the new password
            const password = {password: editDetails.newPassword1}
            // setEditDetails({...editDetails, password: editDetails.newPassword1})
            if(await updatesCurrentUser(password)){
                flag = true
                if(messagesEdit.password.trim()){
                    setMessagesEdit({...messagesEdit,password: ''})
                }
            }

        } catch (e) {
            setMessagesEdit({...messagesEdit,password: 'סיסמא ישנה אינה תקנית '})
        } finally {
            await authAdd.signOut()
        }
        return flag
        // if (editPassword &&
        //     editDetails.newPassword.length > 5) {
        //     data['password'] = editDetails.newPassword
        //     flag = true
        // }
        // await updatesCurrentUser(data)
        // if(await updatesCurrentUser(data)){
        //     if(flag){
        //         details.password=editDetails.newPassword
        //     }
        //     for (const [key, value] of Object.entries(editDetails)) {
        //         if(key in details && value!==details[key])
        //             details[key]=value
        //     }
        //     //setData(details)
        //     setIsEdit(false)
        // }
        // else{
        //     setEditDetails({firstName:details.firstName,lastName:details.lastName,email:details.email,
        //         lastPassword:"",newPassword:""})
        // }

    }

    const changeEmailHandler = async () => {
        if (editDetails.newEmail1 !== editDetails.newEmail2) {
            setMessagesEdit({...messagesEdit,email: 'מיילים לא זהים'})
            return false
        }
        if(!validateEmail(editDetails.newEmail1)){
            setMessagesEdit({...messagesEdit,email: 'אנא,הכנס מייל תקין'})
            return false
        }
        try {
            // ensure the new password
            const email = {email: editDetails.newEmail1}
            // setEditDetails({...editDetails, password: editDetails.newPassword1})
            if(await updatesCurrentUser(email)){
                if(messagesEdit.email.trim()){
                    setMessagesEdit({...messagesEdit,email: ''})
                }
                return true
            }
            return false

        } catch (e) {
        }
    }

    const changeDetailsHandler = async () => {

        let data = {}
        for (const [key, value] of Object.entries(editDetails)) {

            if (key in userDetails && value !== userDetails[key]){
                data[key] = value
                // if(!data[key].trim()){
                //     messages[key]=''
                // }
            }

        }
        if( Object.keys(data).length === 0){

            return true
        }
        const messages={firstName:'',lastName:'',email: '',password:''}
        if('firstName' in data && !data.firstName.trim()){
            messages.firstName ='אנא,הכנס שם פרטי'
        }
        if('lastName' in data &&!data.lastName.trim()){
            messages.lastName ='אנא,הכנס שם משפחה'
        }
        setMessagesEdit(messages)
        if(messages.firstName.trim()||messages.lastName.trim()){
            return false
        }
        if(await updatesCurrentUser(data)){
            return true
        }

        return false
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formEmail">
                    <Row className="justify-content-lg-between " style={{width: "100%"}}>
                        <Col md={12}>
                            <Row className="justify-content-around">
                                <Col md={1}><Person className="m-1"/></Col>
                                <Col><Form.Label md={10} className="m-1" style={{fontWeight: "bold"}}>
                                    החשבון שלי
                                </Form.Label></Col>

                            </Row>
                        </Col>
                    </Row>
                    <br/>

                    <Row>
                        <Col style={{fontSize: 20}}>
                            שם פרטי:
                        </Col>
                        {edit === false && <Col style={{fontSize: 20}} md={7}>
                            {userDetails.firstName}
                        </Col>}
                        {edit && <div>
                            <Row>
                                <Col>
                                    <Form.Control onChange={e => setEditDetails({
                                        ...editDetails,
                                        firstName: e.target.value
                                    })} defaultValue={userDetails.firstName}/>
                                </Col>
                                {/*<Col>*/}
                                {/*    <Button*/}
                                {/*        onClick={() => {*/}
                                {/*            changeDetailsHandler()*/}
                                {/*            setEdit(false)*/}
                                {/*        }} variant="outline-primary">שמור</Button>*/}
                                {/*</Col>*/}
                            </Row>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messagesEdit.firstName}
                            </div>
                        </div>}
                    </Row>
                    <Row>

                        <Col style={{fontSize: 20}}>
                            שם משפחה:
                        </Col>
                        {edit === false && <Col style={{fontSize: 20}} md={7}>
                            {userDetails.lastName}
                        </Col>}
                        {edit && <div>
                            <Row>
                                <Col>
                                    <Form.Control onChange={e => setEditDetails({
                                        ...editDetails,
                                        lastName: e.target.value
                                    })} defaultValue={userDetails.lastName}/>
                                </Col>
                                {/*<Col>*/}
                                {/*    <Button*/}
                                {/*        onClick={() => {*/}
                                {/*            changeDetailsHandler()*/}
                                {/*            setEdit(false)*/}
                                {/*        }} variant="outline-primary">שמור</Button>*/}
                                {/*</Col>*/}
                            </Row>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messagesEdit.lastName}
                            </div>
                        </div>}
                    </Row>
                    <Row>
                        <Col style={{fontSize: 20}}>
                            אימייל:
                        </Col>
                        <Col style={{fontSize: 20}} md={7}>
                            {userDetails.email}
                            {/*<Form.Control className="" type='text' placeholder='toko@gmail.com'*/}
                            {/*              required onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>*/}
                        </Col>
                    </Row>
                    <ButtonGroup className="text-center justify-content-between gap-3 p-3">
                        {edit === false &&
                        <Button className="rounded-3" variant="outline-primary" onClick={() => setEdit(true)}>
                            <Pencil/> ערוך פרטים</Button>}
                        {edit &&
                        <Button className="rounded-3"
                                onClick={async () => {
                                    if (await changeDetailsHandler())
                                    {
                                        setEdit(false)
                                    }

                                }} variant="outline-success">שמור</Button>
                        }
                        {edit &&
                        <Button className="rounded-3"
                                onClick={() => {
                                    setEdit(false)
                                    setMessagesEdit({firstName: '',lastName: '',email:'',password:''})
                                }} variant="outline-danger">בטל</Button>
                        }
                        <Button className="rounded-3" variant="outline-primary" onClick={changeEmail}>
                            שנה אימייל
                        </Button>
                        <Button className="rounded-3" variant="outline-primary" onClick={changePassword}>
                            שנה סיסמה
                        </Button>
                    </ButtonGroup>
                    {showChangeEmailDialog && <Modal show={showChangeEmailDialog} onHide={() => {
                        setMessagesEdit({...messagesEdit,email: ''})
                        setShowChangeEmailDialog(false)
                    }}>
                        <Modal.Header>
                            <Modal.Title>{"שנה אימייל"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Col>

                                    <Row>
                                        <Form.Text>הזן אימייל חדש:</Form.Text>
                                        <Form.Control onChange={e => setEditDetails({
                                            ...editDetails,
                                            newEmail1: e.target.value
                                        })}
                                                      value={editDetails.newEmail1}>

                                        </Form.Control>
                                    </Row>
                                    <Row>
                                        <Form.Text>הזן אימייל חדש בשנית:</Form.Text>
                                        <Form.Control onChange={e => setEditDetails({
                                            ...editDetails,
                                            newEmail2: e.target.value
                                        })}
                                                      value={editDetails.newEmail2}>

                                        </Form.Control>
                                    </Row>
                                    <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                        {messagesEdit.email}
                                    </div>
                                </Col>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {
                                setShowChangeEmailDialog(false)
                                setMessagesEdit({...messagesEdit,email: ''})
                            }}>
                                בטל
                            </Button>
                            <Button variant="success" onClick={async () => {
                                if (await changeEmailHandler())
                                    setShowChangeEmailDialog(false)
                            }
                            }>
                                עדכן
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                    {showChangePasswordDialog && <Modal show={showChangePasswordDialog} onHide={() => {
                        setMessagesEdit({...messagesEdit,password: ''})
                        setShowChangePasswordDialog(false)
                    }}>
                        <Modal.Header>
                            <Modal.Title>{"שנה סיסמה"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Col>
                                    <Row>
                                        <Form.Text>הזן סיסמה נוכחית:</Form.Text>
                                        <Form.Control  type='password' onChange={e => setEditDetails({
                                            ...editDetails,
                                            lastPassword: e.target.value
                                        })}
                                                      value={editDetails.lastPassword}>

                                        </Form.Control>
                                    </Row>
                                    <Row>
                                        <Form.Text>הזן סיסמה חדשה:</Form.Text>
                                        <Form.Control type='password' onChange={e => setEditDetails({
                                            ...editDetails,
                                            newPassword1: e.target.value
                                        })}
                                                      value={editDetails.newPassword1}>

                                        </Form.Control>
                                    </Row>
                                    <Row>
                                        <Form.Text>הזן סיסמה חדשה בשנית:</Form.Text>
                                        <Form.Control type='password' onChange={e => setEditDetails({
                                            ...editDetails,
                                            newPassword2: e.target.value
                                        })}
                                                      value={editDetails.newPassword2}>

                                        </Form.Control>
                                    </Row>
                                    <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                        {messagesEdit.password}
                                    </div>
                                </Col>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {
                                setShowChangePasswordDialog(false)
                                setMessagesEdit({...messagesEdit,password: ''})
                            }}>
                                בטל
                            </Button>
                            <Button variant="success" onClick={async () => {
                                if (await changePasswordHandler()) {
                                    setShowChangePasswordDialog(false)
                                }

                            }
                            }>
                                עדכן
                            </Button>
                        </Modal.Footer>
                    </Modal>}


                </Form.Group>
            </Form>
        </div>
    )
}

export default MyProfile