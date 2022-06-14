import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import TableData from "./TableData";

export function MyPatientsDialog({update,userName,getTable,showMyPatients,setShowMyPatients,add,deleteObj,emptyDetails,emptyEditDetails,data,HebrewNames,columnsInfoView,requiredId,optionIds,
                                     isEmptyTable,contact,isReloadTable}){
    // const [showMyPatients, setShowMyPatients] = useState()
    //need to be false but see that not take care about to reload
    const [reload,setReload]=useState(false)
    //const [reload,setReload]=useState(true)
    // useEffect(()=>{
    //         setReload(isReloadTable(contact))
    //     },
    //     [data])
    // function isReload(){
    //     if(!reload){
    //         return false
    //     }
    //     const flag =isReloadTable(contact)
    //     setReload(flag)
    //     return flag
    // }

    return(
        <div>
            <Modal show={showMyPatients} onHide={() => {setShowMyPatients(false)
                getTable(null)
            }}>
                <Modal.Header>
                    <Modal.Title>{"המטופלים של"+" "+userName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*{"ערך"+isEmptyTable}*/}
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