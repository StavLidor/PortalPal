import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {addExternal} from "./firebase";

export function AddTypeExternalTherapist({setAddExternal})  {
    const [license,setLicense]=useState("")
    const [message,setMessage]=useState('')
    const onAdd = async e => {
        if(!license.trim()){
            setMessage('אנא,הכנס מספר רישיון')
        }
        else {
            await addExternal(license)
            setAddExternal(false)
        }
    }

    return (
        <div className='AddTypeExternalTherapist'>
        <Form
            /*onSubmit={onSignUp}*/  className="needs-validation" noValidate>
            <Container className="w-auto" fluid="sm">
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label  for="validationDefault01" className="text-center" style={{width: "100%"}}>הוסף פרטים הבאים על מנת שתוכל להיכנס למטפל חיצוני</Form.Label>

                    <Row>
                        <Col>
                            מספר רישיון:
                        </Col>
                        <Col md="auto">
                            <Form.Control id='license'
                                          onChange={e => setLicense( e.target.value)}/>
                        </Col>
                    </Row>

                </Form.Group>
                <Row className="p-1" md="10">
                    <ButtonGroup className="gap-4">
                        <Button className="rounded-3" variant="outline-primary" size="md"
                                onClick={onAdd}>הוסף התחברות כמטפל חיצוני</Button>
                    </ButtonGroup>
                </Row>
            </Container>
        </Form>
    </div>)

}