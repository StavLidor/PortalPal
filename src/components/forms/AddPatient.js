import React, {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {addPatientToExternalTherapist} from "../../firebase";
import {is_israeli_id_number} from "../../useFunction";
/*add patient for external therapist*/
function AddPatient({addPatient,setAddPatient,listPatient}){
    const [detailsNewPatient, setDetailsNewPatient] = useState({id: "", connection: "", code: ""})
    const [messages, setMessages] = useState({
        id: "", connection: "", code: ""
    })
    const [click, setClick]=useState(false)
    const [fails,setFails]=useState(false)
    /*check if details is good and add this patient*/
    const submitAdd = async () => {
        const messagesSubmit={ id: "", connection: "", code: ""}
        if(!detailsNewPatient.id.trim()|| !is_israeli_id_number(detailsNewPatient.id)){
            messagesSubmit.id ='אנא אכנס ת"ז ישראלית תקנית'
        }
        if(listPatient.includes(detailsNewPatient.id)){
            messagesSubmit.id ='מטופל בעל תז כזה קיים אצלך'
        }
        if(!detailsNewPatient.connection.trim()){
            messagesSubmit.connection ='אנא אכנס קשר'
        }
        if(!detailsNewPatient.code.trim()){
            messagesSubmit.code ='אנא אכנס את הקוד שנתן לך ההורה'
        }
        setMessages(messagesSubmit)
        if(!messagesSubmit.id.trim() && !messagesSubmit.connection.trim()&& !messagesSubmit.code.trim()){


            if(!await addPatientToExternalTherapist(detailsNewPatient.id, detailsNewPatient.code, detailsNewPatient.connection)){
                setClick(false)
                setFails(true)
                return false
            }
            else{
                setClick(false)
                if(fails){
                    setFails(false)
                }
                return true
            }

        }
        else {

            setClick(false)
        }

    }
    return(
        <Modal show={addPatient} onHide={() => {
            setAddPatient(false)
        }}>
            <Modal.Header>
                <Modal.Title>הוסף מטופל</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Col>
                        <Row className="form-group">
                            <Form.Label style={{fontSize:20 }} htmlFor="id">תז</Form.Label>
                            <Form.Control type="text" name="id" id="id" onChange={e => setDetailsNewPatient({
                                ...detailsNewPatient,
                                id: e.target.value
                            })} value={detailsNewPatient.id}/>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.id}
                            </div>
                        </Row>
                        <Row className="form-group">
                            <Form.Label style={{fontSize:20 }} htmlFor="connection">קשר</Form.Label>
                            <Form.Control type="text" name="connection" id="connection"
                                          onChange={e => setDetailsNewPatient({
                                              ...detailsNewPatient,
                                              connection: e.target.value
                                          })} value={detailsNewPatient.connection}/>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.connection}
                            </div>
                        </Row>
                        <Row className="form-group">
                            <Form.Label style={{fontSize:20 }} htmlFor="code">קוד</Form.Label>
                            <Form.Control type="text" name="code" id="code" onChange={e => setDetailsNewPatient({
                                ...detailsNewPatient,
                                code: e.target.value
                            })} value={detailsNewPatient.code}/>
                            <div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                                {messages.code}
                            </div>
                        </Row>
                        {fails &&<div style={{fontSize: 10,color: "red"}} id="invalid-feedback">
                            ההוספה נכשלה. נסה לבדוק אם ההורה כי מטופל זה קיים במערכת וודא שוב את הקוד
                        </div>}
                    </Col>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {setAddPatient(false)
                   }}>
                    סגור
                </Button>
                {(!click)?(
                    <Button variant="success" onClick={async () => {
                        setClick(true)
                         submitAdd().then(f=>{
                             if(f === true){
                                 setAddPatient(false)
                             }
                         })
                    }} type="submit">
                        הוסף
                    </Button>):(
                    <Button variant="success" type="submit">
                        טוען...
                    </Button>

                )
                }

            </Modal.Footer>
        </Modal>
    )
}
export default  AddPatient