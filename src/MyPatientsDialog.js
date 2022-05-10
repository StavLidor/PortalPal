import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import TableData from "./components/tableEdit/TableData";

export function MyPatientsDialog({update,userName,getTable,showMyPatients,setShowMyPatients,add,deleteObj,emptyDetails,emptyEditDetails,data,HebrewNames,columnsInfoView,requiredId,optionIds}){
    // const [showMyPatients, setShowMyPatients] = useState()

    return(
        <div>
            <Modal show={showMyPatients} onHide={() => {setShowMyPatients(false)
                getTable(null)
            }}>
                <Modal.Header>
                    <Modal.Title>{"המטופלים של"+" "+userName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableData type="תלמיד"
                               add={add} deleteObj={deleteObj}
                               emptyDetails={emptyDetails} emptyEditDetails={emptyEditDetails}
                               data={data/*contactTable[tableName]*/}
                               HebrewNames={HebrewNames} columnsInfoView={columnsInfoView} requiredId={true}
                               update={update} optionIds={optionIds}
                        />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{setShowMyPatients(false)
                        getTable(null)}}>
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