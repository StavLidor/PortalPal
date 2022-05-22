import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {addPatientToExternalTherapist, db} from "../../firebase";
import {Pencil, Plus, Trash} from 'react-bootstrap-icons';
import TableData from "../tableEdit/TableData";

export let patientList = []

function PatientList({institute, list, setPatientListData, listTitle, setCurrentPerson,currentPerson, currentPage,setPatientIsClicked}) {

    const [listData, setListData] = useState([])
    const [addPatient, setAddPatient] = useState(false)
    const [detailsNewPatient, setDetailsNewPatient] = useState({id: "", connection: "", code: ""})
    const [listener, setListener] = useState(null)

    useEffect(getListData, [list])

    function getListData() {
        if (listener !== null) {
            listener()
        }
        if(list.length=== 0)
        {
            setListData([])
            setPatientListData([])
            return
        }

        const queryRequest = query(collection(db, "patients"), where('id', 'in', list))
        const result = onSnapshot(
            queryRequest,
            (snapshot) => {
                console.log("list data: ", snapshot.docs)
                setListData(snapshot.docs)
                setPatientListData(snapshot.docs)
            },
            (error) => {
                // TODO: Handle errors!
                console.log('error!!', error)

            })
        setListener(() => result)
    }

    const submitAdd = async () => {
        // e.preventDefault()
        await addPatientToExternalTherapist(detailsNewPatient.id, detailsNewPatient.code, detailsNewPatient.connection)
    }

    return (
        <div>
            <Form.Label style={{fontWeight: 'bold'}}>{listTitle}</Form.Label>
            {institute === 'external' && <Button onClick={() => setAddPatient(true)} className="m-2 p-1 text-center"
                                                 style={{fontSize: 10, height: 30}} variant="outline-primary"><Plus/>הוסף
                מטופל</Button>
            }

                {listData.map((item) => {
                        let data = item.data()
                        let id = data.id.toString()
                        if(currentPerson===id) {
                            id = ''
                        }
                        return (
                            <Button id='patient-button' as={Link} active={currentPerson ===data.id.toString()}
                                    style={{backgroundColor:'transparent',border:'transparent'}}
                                    to={id + (() => {
                            if (currentPage === 'documentation')
                                return '/documentation'
                            return ''
                        })()
                        } className="list-group-item list-group-item-action mb-1" onClick={(e) => {
                            // e.preventDefault()
                            if(currentPerson===data.id.toString()){
                                setPatientIsClicked(false)
                                setCurrentPerson('')
                            }
                            else {
                                setPatientIsClicked(true)
                                setCurrentPerson(data.id.toString())
                            }


                        }}>{data.firstName + " " + data.lastName}</Button>
                        )
                    }
                )}

            {addPatient && <Modal show={addPatient} onHide={() => {
                setAddPatient(false)
            }}>
                <Modal.Header>
                    <Modal.Title>הוסף מטופל</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Row className="form-group">
                                <Form.Label htmlFor="id">תז</Form.Label>
                                <Form.Control type="text" name="id" id="id" onChange={e => setDetailsNewPatient({
                                    ...detailsNewPatient,
                                    id: e.target.value
                                })} value={detailsNewPatient.id}/>
                            </Row>
                            <Row className="form-group">
                                <Form.Label htmlFor="connection">קשר</Form.Label>
                                <Form.Control type="text" name="connection" id="connection"
                                              onChange={e => setDetailsNewPatient({
                                                  ...detailsNewPatient,
                                                  connection: e.target.value
                                              })} value={detailsNewPatient.connection}/>
                            </Row>
                            <Row className="form-group">
                                <Form.Label htmlFor="code">קוד:</Form.Label>
                                <Form.Control type="text" name="code" id="code" onChange={e => setDetailsNewPatient({
                                    ...detailsNewPatient,
                                    code: e.target.value
                                })} value={detailsNewPatient.code}/>
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddPatient(false)}>
                        סגור
                    </Button>
                    <Button variant="success" onClick={() => {
                        setAddPatient(false)
                        submitAdd()
                    }} type="submit">
                        הוסף
                    </Button>
                </Modal.Footer>
            </Modal>}
        </div>
    )
}

export default PatientList