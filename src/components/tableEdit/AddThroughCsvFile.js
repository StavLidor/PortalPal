import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import Papa from "papaparse";

export function AddThroughCsvFile({addBatch, setAddBatch, add, remove}) {
    // const [addBatch, setAddBatch] = useState(true)
    const [file, setFile] = useState(null)
    const [type, setType] = useState("")
    const [showMsg, setShowMsg] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const submit = () => {
        // event.preventDefault();
        if (file) {
            if (type === 'add') {
                parser(file, add)
            } else {
                parser(file, remove)
            }

        }
    }

    function parser(file, f) {
        let reader = new FileReader();

        reader.addEventListener('load', function (e) {
            const allObj = []
            //let csvdata = e.target.result;
            let arr = Papa.parse(e.target.result).data

            // let arr= data.split("\n");

            let keys = arr[0]
            let rows = arr.length;

            let cols = keys.length;

            let i, j = 0;
            for (i = 1; i < rows; i++) {
                let line = arr[i];
                if (line.length !== cols)
                    continue
                let obj = {};

                for (j = 0; j < cols; j++) {

                    let header = keys[j]
                    let value = line[j]
                    obj[header] = value
                }
                // if(i==1){
                //     f(obj)
                // }
                allObj.push(obj)


            }
            f(allObj)
            //setFile(null)
            // parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data
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
                            {/*<Row>*/}

                            {/*    <input type="file" name="learnCSV" accept="text/csv" onChange={e => {*/}
                            {/*        setFile(e.target.files[0])*/}
                            {/*    }}/>*/}

                            {/*    {submitted && file === null &&*/}
                            {/*    <Form.Text className="text-center" style={{fontSize: 10, color: "red"}}>אנא בחר*/}
                            {/*        קובץ</Form.Text>}*/}
                            {/*</Row>*/}
                            <Row className="input-group mb-3">
                                <input name="learnCSV" accept="text/csv" onChange={e => {
                                    setFile(e.target.files[0])
                                }} type="file" className="form-control m-3" id="inputGroupFile02"/>
                                {submitted && (file === null || file === undefined) &&
                                <Form.Text className="text-center" style={{fontSize: 10, color: "red"}}>אנא בחר
                                    קובץ</Form.Text>}
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddBatch(false)}>
                        בטל
                    </Button>
                    <Button variant="success" onClick={() => {
                        if (file === undefined) {
                        }

                        if (type === "" || file === null || file === undefined) {
                            if (type === "") {
                                setShowMsg(true)
                            } else {
                                setShowMsg(false)
                            }
                            if (file === null || file===undefined) {
                                setSubmitted(true)
                            } else {
                                setSubmitted(false)
                            }

                        } else {
                            submit()
                            setAddBatch(false)
                        }
                    }
                    }>
                        עדכן
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddThroughCsvFile