import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {addPatientToExternalTherapist, db} from "../../firebase";
import {Pencil, Plus, FilePerson, PersonCircle} from 'react-bootstrap-icons';
import TableData from "../tableEdit/TableData";
import {isClick} from "../../useFunction";
import AddPatient from "../../AddPatient";

export let patientList = []

function PatientList({institute, list, setPatientListData, listTitle, setCurrentPerson,currentPerson, currentPage,setPatientIsClicked,
                         setCurrentPage,type}) {

    const [listData, setListData] = useState([])
    const [addPatient, setAddPatient] = useState(false)
    const [detailsNewPatient, setDetailsNewPatient] = useState({id: "", connection: "", code: ""})
    const [listener, setListener] = useState(null)
    const [reload, setReload] = useState(true)

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
                setReload(false)
            },
            (error) => {
                // TODO: Handle errors!
                console.log('error!!', error)

            })
        setListener(() => result)
    }



    return (
        <div>
            <Row><Col><Form.Label style={{fontWeight: 'bold'}}>{listTitle}</Form.Label></Col>
            {reload &&  <Row><Form.Label style={{fontWeight: 'bold'}} >טוען...</Form.Label></Row>}
            {type==='therapist'&&institute === 'external' &&
                <Col md={"auto"}><Button onClick={() => setAddPatient(true)} id="addPatientButton" className="m-2 p-1 text-center"
                                                 style={{fontSize: 10, height: 30}} variant="outline-primary"><Plus/>הוסף
                מטופל</Button>
                </Col>
            }
            </Row>
                {listData.map((item) => {
                        let data = item.data()
                        let id = data.id.toString()
                        if(currentPerson===id) {
                            id = ''
                        }
                        return (
                            <Button id='patient-button' as={Link} active={currentPerson ===data.id.toString()}
                                    style={{backgroundColor:'transparent',border:'transparent'}}
                                    to={id +(() => {
                            if (currentPage==='AboutUs'
                                ||currentPage==='ContactUs'||currentPage==='myProfile'){
                                return ''
                            }

                            return '/'+currentPage
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
                                if(currentPage==='AboutUs'
                                    ||currentPage==='ContactUs'||currentPage==='myProfile'){
                                    setCurrentPage('')
                                }
                            }


                        }}><PersonCircle/>&nbsp;&nbsp;&nbsp;&nbsp;{data.firstName + " " + data.lastName} </Button>
                        )
                    }
                )}

            {addPatient && <AddPatient addPatient={addPatient}
            setAddPatient={setAddPatient} listPatient={list}/>}
        </div>
    )
}

export default PatientList