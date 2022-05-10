import {Col, Form, Row, Button, ButtonGroup, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useAuthState} from "./components/chats/hooks";
import TableData from "./components/tableEdit/TableData";
import {auth, authAdd, updatesCurrentUser} from "./firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
// import { IconName } from "react-icons/bs";
import {ArrowRight, Pencil,Person} from 'react-bootstrap-icons';

export function MyProfile({userDetails}) {
    const [showChangeEmailDialog, setShowChangeEmailDialog] = useState(false)
    const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
    const [edit, setEdit] = useState(false)
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
            return
        }
        if (editDetails.newPassword1.length < 6) {
            // TODO: show error message
            return
        }

        try {

            await signInWithEmailAndPassword(authAdd, userDetails.email, editDetails.lastPassword)
            // ensure the new password
            const password = {password: editDetails.newPassword1}
            // setEditDetails({...editDetails, password: editDetails.newPassword1})
            await updatesCurrentUser(password)

        } catch (e) {

        } finally {
            await authAdd.signOut()
        }
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
        //     console.log(details.firstName)
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
            return
        }
        // TODO: verify the validity of the email that was entered
        try {
            // ensure the new password
            const email = {email: editDetails.newEmail1}
            // setEditDetails({...editDetails, password: editDetails.newPassword1})
            await updatesCurrentUser(email)

        } catch (e) {
        }
    }

    const changeDetailsHandler = async () => {
        let data = {}
        for (const [key, value] of Object.entries(editDetails)) {
            if (key in userDetails && value !== userDetails[key])
                data[key] = value
        }
        console.log("my data:", data)
        await updatesCurrentUser(data)
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
                                onClick={() => {
                                    changeDetailsHandler()
                                    setEdit(false)
                                }} variant="outline-success">שמור</Button>
                        }
                        {edit &&
                        <Button className="rounded-3"
                                onClick={() => {
                                    setEdit(false)
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
                                </Col>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {
                                setShowChangeEmailDialog(false)
                            }}>
                                בטל
                            </Button>
                            <Button variant="success" onClick={() => {
                                // TODO: add the logic
                                changeEmailHandler()
                                setShowChangeEmailDialog(false)
                            }
                            }>
                                עדכן
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                    {showChangePasswordDialog && <Modal show={showChangePasswordDialog} onHide={() => {
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
                                        <Form.Control onChange={e => setEditDetails({
                                            ...editDetails,
                                            lastPassword: e.target.value
                                        })}
                                                      value={editDetails.lastPassword}>

                                        </Form.Control>
                                    </Row>
                                    <Row>
                                        <Form.Text>הזן סיסמה חדשה:</Form.Text>
                                        <Form.Control onChange={e => setEditDetails({
                                            ...editDetails,
                                            newPassword1: e.target.value
                                        })}
                                                      value={editDetails.newPassword1}>

                                        </Form.Control>
                                    </Row>
                                    <Row>
                                        <Form.Text>הזן סיסמה חדשה בשנית:</Form.Text>
                                        <Form.Control onChange={e => setEditDetails({
                                            ...editDetails,
                                            newPassword2: e.target.value
                                        })}
                                                      value={editDetails.newPassword2}>

                                        </Form.Control>
                                    </Row>
                                </Col>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {
                                setShowChangePasswordDialog(false)
                            }}>
                                בטל
                            </Button>
                            <Button variant="success" onClick={() => {
                                // TODO: add the logic
                                changePasswordHandler()
                                setShowChangePasswordDialog(false)
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