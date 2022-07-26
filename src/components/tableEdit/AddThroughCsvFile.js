import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Papa from "papaparse";
/*add for csv to the DB*/
export function AddThroughCsvFile({addBatch, setAddBatch, add, remove,filedAdd,filedRemove}) {
    const [file, setFile] = useState(null)
    const [type, setType] = useState("")
    const [showMsg, setShowMsg] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [errors,setErrors]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        if(loading){
            setLoading(false)
            if(errors.length===0){
                setAddBatch(false)
            }
        }

    },[errors])
    const submit = async () => {
        setLoading(true)
        if (file) {
            if (type === 'add') {
                await parser(file, add,filedAdd)
            } else {
                await parser(file, remove,filedRemove)
            }

        }
    }
    /*parser from csv data to dict and add all the details*/
    function parser(file, f,filed) {
        let reader = new FileReader();

        reader.addEventListener('load', async function (e) {
            const allObj = []
            let arr = Papa.parse(e.target.result).data
            let keys = arr[0]
            if(!(keys.length === filed.length )||
                !(keys.every(function (element) {
                    return filed.includes(element);
                }))){
                setErrors(['כותרות עמודות צרכות להיות: ',filed.join(',\n')])
                return

            }
            let rows = arr.length;

            let cols = keys.length;

            let i, j = 0;
            let error=false
            for (i = 1; i < rows; i++) {
                let line = arr[i];
                if (line.length !== cols){
                    error=true
                    break
                }

                let obj = {};

                for (j = 0; j < cols; j++) {

                    let header = keys[j]
                    let value = line[j]

                    obj[header] = value
                }
                allObj.push(obj)


            }
            if(!error){

                await f(allObj, setErrors)
            }
            else{
                setErrors(['חסר עמודות בקובץ'])
            }

        });
        reader.readAsText(file)

    }

    return (
        <div>
            <Modal show={addBatch} onHide={() => setAddBatch(false)}>
                <Modal.Header>
                    <Modal.Title>{"הוסף או הסר מקבץ"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col>
                            <Row>
                                <ButtonGroup className="gap-3 m-3"><Form.Text style={{fontSize: 18}}>הוסף</Form.Text>
                                    <Form.Check style={{fontSize: 18}} type="radio" name='addOrRemove'
                                                onChange={() => setType("add")}
                                    /><Form.Text style={{fontSize: 18}}>הסר</Form.Text>
                                    <Form.Check style={{fontSize: 18}} type="radio" name='addOrRemove'
                                                onChange={() => setType("remove")}
                                    />
                                    {showMsg &&
                                    <Form.Text className="text-center" style={{fontSize: 10, color: "red"}}>אנא בחר באחת
                                        מהאופציות</Form.Text>
                                    }
                                </ButtonGroup>
                            </Row>

                            <Row className="input-group mb-3">
                                <input name="learnCSV" accept="text/csv" onChange={e => {
                                    if(e.target.files[0].type ==="text/csv"){
                                        setFile(e.target.files[0])
                                    }

                                }} type="file" className="form-control m-3" id="inputGroupFile02"/>
                                {submitted && (file === null || file === undefined) &&
                                <Form.Text className="text-center" style={{fontSize: 10, color: "red"}}>אנא בחר
                                    קובץ csv</Form.Text>}
                                {errors.map(e=>(
                                    <Form.Text className="text-center" style={{fontSize: 10, color: "red"}}>{
                                        e
                                    }</Form.Text>
                                ))}
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddBatch(false)}>
                        בטל
                    </Button>
                    {(loading)?(
                        <Button variant="secondary" onClick={() => setAddBatch(false)}>
                            טוען...
                        </Button>
                    ):(
                        <Button variant="success" onClick={async () => {
                            if (file === undefined) {
                            }

                            if (type === "" || file === null || file === undefined) {
                                if (type === "") {
                                    setShowMsg(true)
                                } else {
                                    setShowMsg(false)
                                }
                                if (file === null || file === undefined) {
                                    setSubmitted(true)
                                } else {
                                    setSubmitted(false)
                                }

                            } else {
                                await submit()

                            }
                        }
                        }>
                            עדכן
                        </Button>

                    )}

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddThroughCsvFile