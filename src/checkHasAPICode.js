import {Button, ButtonGroup, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import ReportsPage from "./ReportsPage";
import {addThirdPartyCodes} from "./firebase";
import {Container} from "@mui/material";

function CheckHasAPICode({appKey, patientDetails}) {
    console.log("in new: ", patientDetails)
    const [hasCode, setHasCode] = useState(appKey in patientDetails.thirdPartyCodes);
    const [code, setCode] = useState(patientDetails.thirdPartyCodes[appKey]);
    const [wasCodeRemoved, setWasCodeRemoved] = useState(false);

    return (
        <div className='p-4' style={{width:'80%'}}>
            {hasCode === false && <div className="text-center p-2">
                {wasCodeRemoved && <Form.Label>הקוד הוסר בהצלחה!</Form.Label>}
                <Row><Form.Label style={{fontSize: 20, fontWeight: "bold"}}> שמחים שאתה רוצה לקשר אלינו את
                    אפליקציית {appKey} !
                </Form.Label></Row>
                <Row><Form.Label style={{fontWeight: "bold"}}>כדי לעשות זאת עליך להכניס פה
                    הקוד שמופיע לך
                    באפליקציה:</Form.Label></Row>
                <ButtonGroup className="m-1 gap-1">
                    <Form.Control onChange={e => setCode(e.target.value)}
                                  value={code}/>
                    <Button
                        className="rounded-3"
                        onClick={async () => {
                            const result = await addThirdPartyCodes(patientDetails.id, appKey, code)
                            // setHasCode(true)
                            setHasCode(result)
                        }}>אישור</Button>
                </ButtonGroup>
            </div>}
            {hasCode && <ReportsPage code={code} setWasCodeRemoved={setWasCodeRemoved} setHasCode={setHasCode} appKey={appKey} patientDetails={patientDetails}/>}
        </div>
    )
}

export default CheckHasAPICode