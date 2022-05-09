import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import TableData from "./components/tableEdit/TableData";

export function MyPatientsDialog({showMyPatients,setShowMyPatients,add,deleteObj,emptyDetails,emptyEditDetails,table,HebrewNames,columnsInfoView,requiredId}){
    // const [showMyPatients, setShowMyPatients] = useState()
    return(
        <div>
            <Modal show={showMyPatients} onHide={() => setShowMyPatients(false)}>
                <Modal.Header>
                    <Modal.Title>{"המטופלים של"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>kadnflskndflsf</h3>
                    <TableData type="תלמיד"
                               add={add} deleteObj={deleteObj}
                               emptyDetails={emptyDetails} emptyEditDetails={emptyEditDetails}
                               data={table/*contactTable[tableName]*/}
                               HebrewNames={HebrewNames} columnsInfoView={columnsInfoView} requiredId={true}
                        />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowMyPatients(false)}>
                        סגור
                    </Button>
                    {/*<Button variant="primary" onClick={() => {*/}
                    {/*    submit()*/}
                    {/*    setAddBatch(false)*/}
                    {/*}*/}
                    {/*}>*/}
                    {/*    עדכן*/}
                    {/*</Button>*/}
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default MyPatientsDialog