import {Col, Form, Row, Button} from "react-bootstrap";
import React from "react";

export function MyProfile({userDetails}) {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Row className="justify-content-lg-between w-100">
                        <Col>
                            <Form.Label style={{fontWeight: "bold"}}>
                                החשבון שלי
                            </Form.Label>
                        </Col>
                        <Col>
                            <Button onClick={() => {

                            }} variant="outline-primary">
                                ערוך
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            שם פרטי:
                        </Col>
                        <Col md="auto">
                            {userDetails.firstName}
                            {/*<Form.Control className="" type='text' placeholder='toko@gmail.com'*/}
                            {/*              required onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            שם משפחה:
                        </Col>
                        <Col md="auto">
                            {userDetails.lastName}
                            {/*<Form.Control className="" type='text' placeholder='toko@gmail.com'*/}
                            {/*              required onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            אימייל:
                        </Col>
                        <Col md="auto">
                            {userDetails.email}
                            {/*<Form.Control className="" type='text' placeholder='toko@gmail.com'*/}
                            {/*              required onChange={e => setUserDetails({...userDetails, email: e.target.value})}/>*/}
                        </Col>
                    </Row>

                </Form.Group>
            </Form>
        </div>
    )
}

export default MyProfile