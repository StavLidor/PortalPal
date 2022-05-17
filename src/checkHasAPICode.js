import {Button, ButtonGroup, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import ReportsPage from "./ReportsPage";

function CheckHasAPICode({appKey}) {
    const [hasCode, setHasCode] = useState(false);
    // add firebase

    return (
        <div>
            {hasCode === false && <div className="text-center p-2">
                <Row><Form.Label style={{fontSize: 20, fontWeight: "bold"}}> שמחים שאתה רוצה לקשר אלינו את
                    אפליקציית {appKey} !
                </Form.Label></Row>
                <Row><Form.Label style={{fontWeight: "bold"}}>כדי לעשות זאת עליך להכניס פה
                    הקוד שמופיע לך
                    באפליקציה:</Form.Label></Row>
                <ButtonGroup className="m-1 gap-1"><Form.Control></Form.Control><Button className="rounded-3"
                                                                                        onClick={() => {
                                                                                            setHasCode(true)
                                                                                        }}>אישור</Button></ButtonGroup>
            </div>}
            {hasCode && <ReportsPage appKey={appKey}/>}
        </div>
    )
}

export default CheckHasAPICode