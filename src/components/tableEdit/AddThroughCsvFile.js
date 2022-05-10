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
        //console.log(file)
        if (file) {
            if (type === 'add') {
                parser(file, add)
            } else {
                parser(file, remove)
            }

        }
    }

    function parser(file, f) {
        console.log(file)
        let reader = new FileReader();

        reader.addEventListener('load', function (e) {
            const allObj = []
            //let csvdata = e.target.result;
            let arr = Papa.parse(e.target.result).data
            console.log(arr)

            // let arr= data.split("\n");

            let keys = arr[0]
            console.log(keys)
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
                console.log(obj)
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
                                <ButtonGroup className="gap-3"><Form.Text style={{fontSize: 18}}>הוסף</Form.Text>
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
                            <Row>
                                <input type="file" name="learnCSV" accept="text/csv" onChange={e => {
                                    setFile(e.target.files[0])
                                    console.log('change')
                                }}/>
                                {submitted && file === null &&
                                <Form.Text className="text-center" style={{fontSize: 10, color: "red"}}>אנא בחר
                                    קובץ</Form.Text>}
                            </Row>
                            {/*<Row>*/}
                            {/*    <Form.Group controlId="summary">*/}
                            {/*        <Form.Label>סיכום מפגש</Form.Label>*/}
                            {/*        <Form.Control*/}
                            {/*            type="text"*/}
                            {/*            onChange={e => setNewSession({...newSession, summary: e.target.value})}*/}

                            {/*        />*/}
                            {/*    </Form.Group>*/}
                            {/*</Row>*/}
                            {/*<Row>*/}
                            {/*    <Form.Group controlId="title">*/}
                            {/*        <Form.Label>כותרת</Form.Label>*/}
                            {/*        <Form.Control*/}
                            {/*            type="text"*/}
                            {/*            onChange={e => setNewSession({...newSession, title: e.target.value})}*/}

                            {/*        />*/}
                            {/*    </Form.Group>*/}
                            {/*</Row>*/}


                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddBatch(false)}>
                        בטל
                    </Button>
                    <Button variant="primary" onClick={() => {
                        if (type === "" || file === null) {
                            if (type === "") {
                                setShowMsg(true)
                            } else {
                                setShowMsg(false)
                            }
                            if (file === null) {
                                setSubmitted(true)
                            } else {
                                setSubmitted(false)
                            }
                        } else {
                            console.log("file: ", file)
                            submit()
                            setAddBatch(false)
                        }
                        // setSubmitted(true)
                        // if (type === "") {
                        //     setShowMsg(true)
                        // } else {
                        //     setShowMsg(false)
                        // }
                        // if ((type === "") || (file === null)) {
                        //     setShowMsg(true)
                        // } else {
                        //     console.log("file: ", file)
                        //     submit()
                        //     setAddBatch(false)
                        // }
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