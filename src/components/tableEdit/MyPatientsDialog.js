import {Button, Form, Modal, Row} from "react-bootstrap";
import React, { useState} from "react";
import TableData from "./TableData";
/*small table*/
export function MyPatientsDialog({update,userName,getTable,showMyPatients,setShowMyPatients,add,deleteObj,emptyDetails,emptyEditDetails,data,HebrewNames,columnsInfoView,requiredId,optionIds,
                                     isEmptyTable,contact,isReloadTable}){
    const [reload,setReload]=useState(false)


    return(
        <div>
            <Modal show={showMyPatients} onHide={() => {setShowMyPatients(false)
                getTable(null)
            }}>
                <Modal.Header>
                    <Modal.Title>{"המטופלים של"+" "+userName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(!reload)?(
                        <>
                    {  isEmptyTable &&<Row className='p-2 align-content-start'> <Form.Label className='fs-4' >
                        לא קיימים מטופלים</Form.Label> </Row>}
                        <TableData type="תלמיד"
                        add={add} deleteObj={deleteObj}
                        emptyDetails={emptyDetails} emptyEditDetails={emptyEditDetails}
                        data={data/*contactTable[tableName]*/}
                        HebrewNames={HebrewNames} columnsInfoView={columnsInfoView} requiredId={true}
                        update={update} optionIds={optionIds}
                        /></>
                        ):(
                        <Row className='p-2 align-content-start'> <Form.Label className='fs-4' >
                            טוען...</Form.Label> </Row>
                    )

                    }

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