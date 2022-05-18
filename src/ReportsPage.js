import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import MultiTypeGraph from "./components/MultiTypeGraph";
import {Button, Form, ButtonGroup, Row, Col} from 'react-bootstrap'
import {addThirdPartyCodes, removeThirdPartyCodes} from "./firebase";
import CheckHasAPICode from "./checkHasAPICode";

Chart.register(...registerables);

function ReportsPage({appKey, patientDetails, setHasCode, setWasCodeRemoved, code}) {
    const [hasData, setHasData] = useState(false);
    const [APIResult, setAPIResult] = useState('');
    // const [codeRemoved, setCodeRemoved] = useState(false);
    // const [hasCode, setHasCode] = useState(false);
    const APImap = {AutiDo: 'https://lironhaim15.pythonanywhere.com/get'}
    useEffect(() => {
        const APIrequest = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // 'id': "gOCpJKs43uRr8Y7QHkHL"
                'auth_code': code
            })
        };
        console.log(code)
        fetch(APImap[appKey], APIrequest)
            .then(response => {
                // console.log(response)
                // console.log(response.json())
                // response.json()
            })
            .then(data => {
                console.log("dataaaaa")
                console.log("dataaaaa", data)
                setAPIResult(data)
                setHasData(true)

                // if (data['prediction'][0] === 0) {
                //     setModelResult('שלילית')
                // } else if (data['prediction'][0] === 1) {
                //     setModelResult('חיובית')
                // }
            });
    }, [])

    return (
        <div>
            {/*{hasCode === false && <div>*/}
            {/*    <Row><Form.Label style={{fontSize: 20, fontWeight: "bold"}}> שמחים שאתה רוצה לקשר אלינו את*/}
            {/*        אפליקציית {appKey} !*/}
            {/*    </Form.Label></Row>*/}
            {/*    <Row><Form.Label style={{fontWeight: "bold"}}>כדי לעשות זאת עליך להכניס פה*/}
            {/*        הקוד שמופיע לך*/}
            {/*        באפליקציה:</Form.Label></Row>*/}
            {/*    <ButtonGroup className="m-1 gap-1"><Form.Control></Form.Control><Button className="rounded-3"*/}
            {/*                                                                            onClick={() => {*/}
            {/*        setHasCode(true)*/}
            {/*                                                                            }}>אישור</Button></ButtonGroup>*/}
            {/*</div>}*/}
            {hasData === false && <h2>טוען נתונים...</h2>}
            {APIResult.error === '' && hasData && <MultiTypeGraph appKey={appKey} data={APIResult}/>}
            {APIResult.error !== '' && hasData && <h2>אירעה שגיאה, {APIResult.error}</h2>}
            {((APIResult.error === '' && hasData) || (APIResult.error !== '' && hasData)) &&
            <Row className="justify-content-center" style={{display:"flex", width: "100%"}}>
                <Col className="text-center"><Form.Label style={{fontSize:15}}>לביטול הקישוריות בין משתמש האפליקציה לבין הפורטפל לחץ כאן </Form.Label>
                <Button style={{width:"25%"}} className="rounded-3 m-2 pb-2" variant="outline-primary" onClick={async () => {
                    setHasCode(false)
                    setWasCodeRemoved(true)
                    await removeThirdPartyCodes(patientDetails.id, appKey)
                }
                }>הסר קוד</Button></Col>
            </Row>}

        </div>
    )
}

export default ReportsPage