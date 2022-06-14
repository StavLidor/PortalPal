import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import MultiTypeGraph from "./plots/MultiTypeGraph";
import {Button, Form, ButtonGroup, Row, Col} from 'react-bootstrap'
import {addThirdPartyCodes, removeThirdPartyCodes} from "../../firebase";
import CheckHasAPICode from "./checkHasAPICode";

Chart.register(...registerables);

function ReportsPage({appKey, patientDetails, setHasCode, setWasCodeRemoved, code}) {
    const [hasData, setHasData] = useState(false);
    const [APIResult, setAPIResult] = useState('');

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
        fetch(APImap[appKey], APIrequest)
            .then(response => response.json())
            .then(data => {
                setAPIResult(data)
                setHasData(true)
            });
    }, [])

    return (
        <div>

            {hasData === false && <h2>טוען נתונים...</h2>}
            {APIResult.error === '' && hasData && <MultiTypeGraph appKey={appKey} data={APIResult}/>}
            {APIResult.error !== '' && hasData && <h2>אירעה שגיאה, {APIResult.error}</h2>}
            {((APIResult.error === '' && hasData) || (APIResult.error !== '' && hasData)) &&
            <Row className="justify-content-center" style={{display: "flex", width: "100%"}}>
                <Col className="text-center"><Form.Label style={{fontSize: 18}}>לביטול הקישוריות בין משתמש האפליקציה
                    לבין הפורטפל לחץ כאן </Form.Label>
                    <Button style={{width: "25%"}} className="rounded-3 m-2 pb-2" variant="outline-danger"
                            // id='default-button'
                            onClick={async () => {
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