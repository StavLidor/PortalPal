import {Button, Form, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {collection, onSnapshot,  query, where} from "firebase/firestore";
import { db} from "../../firebase";
import { Plus,PersonCircle} from 'react-bootstrap-icons';
import AddPatient from "../forms/AddPatient";

export let patientList = []

function PatientList({institute, list, setPatientListData, listTitle, setCurrentPerson,currentPerson, currentPage,
                         setCurrentPage,type}) {

    const [listData, setListData] = useState([])
    const [addPatient, setAddPatient] = useState(false)
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
            setReload(false)
            return
        }

        const queryRequest = query(collection(db, "patients"), where('id', 'in', list))
        const result = onSnapshot(
            queryRequest,
            (snapshot) => {
                setListData(snapshot.docs)
                setPatientListData(snapshot.docs)
                setReload(false)
            },
            (error) => {

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
                                setCurrentPerson('')
                            }
                            else {
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