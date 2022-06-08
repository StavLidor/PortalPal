import React, {Fragment, useState} from "react";
import {Accordion, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {convertToNormalDate} from "../../useFunction";
import TableData from "./TableData";
import MyPatientsDialog from "../../MyPatientsDialog";
import { Pencil,Plus,Trash} from 'react-bootstrap-icons';

const ReadOnlyRow = ({
                         addTable,updateTable,
                         deleteObjTable,
                         emptyDetailsTable,
                         emptyEditDetailsTable,
                         HebrewNames,
                         columnsInfoViewTable,
                         contact,
                         handleEditClick,
                         handleDeleteClick,
                         requiredId,
                         table,
                         columnsInfo,getTable,
                         tableOptionIds,isEmptyTable,isReloadTable
                     }) => {
        // console.log('ReadOnlyRow', contact.id)
        // console.log('ReadOnlyRow', columnNames)
        // columnNames.map((name) => (
        //
        //     console.log(contact[name])
        // ))

        const [showMyPatients, setShowMyPatients] = useState(false)
        const [showDeleteDialog, setShowDeleteDialog] = useState(false)

        // const handleShowMyPatients = () => {
        //     console.log("in dialoggggggggggggggg")
        //     return (
        //         <div>
        //             <MyPatientsDialog
        //                 showMyPatients={showMyPatients} setShowPatients={setShowMyPatients}
        //                 add={addTable} deleteObj={deleteObjTable}
        //                 emptyDetails={emptyDetailsTable} emptyEditDetails={emptyEditDetailsTable}
        //                 data={table/*contactTable[tableName]*/}
        //                 HebrewNames={HebrewNames} columnsInfoView={columnsInfoViewTable} requiredId={true}
        //             />
        //         </div>)
        // }


        return (
            <tr>

                {requiredId && <td style={{fontSize: 20}} className="text-center">{contact.id}</td>}

                {
                    columnsInfo.map((colInfo) => (
                        <>
                            {colInfo.view && <td style={{fontSize: 20}} className="text-center">
                                {(() => {
                                        if (colInfo.type !== 'date')
                                            return contact[colInfo.name]
                                        return convertToNormalDate(contact[colInfo.name])
                                    }
                                )()

                                }
                            </td>}
                        </>

                    ))
                }
                {/*{table !== undefined &&*/}
                {/*<td>*/}
                {/*    <Accordion>*/}
                {/*        <Accordion.Item eventKey={contact.id}>*/}
                {/*            <Accordion.Header>המטופלים שלי</Accordion.Header>*/}
                {/*            <Accordion.Body>*/}
                {/*                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod*/}
                {/*                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim*/}
                {/*                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea*/}
                {/*                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate*/}
                {/*                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
                {/*                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id*/}
                {/*                est laborum.*/}
                {/*            </Accordion.Body>*/}
                {/*        </Accordion.Item>*/}
                {/*    </Accordion>*/}
                {/*    /!*{handleOpen &&*!/*/}
                {/*    /!*    <button*!/*/}
                {/*    /!*        type="button"*!/*/}
                {/*    /!*        onClick={(event) => handleOpen(event, contact)}*!/*/}
                {/*    /!*    >*!/*/}
                {/*    /!*        v*!/*/}
                {/*    /!*    </button>}*!/*/}
                {/*    /!*{handleClose &&*!/*/}
                {/*    /!*    <button*!/*/}
                {/*    /!*        type="button"*!/*/}
                {/*    /!*        onClick={(event) => handleClose(event, contact)}*!/*/}
                {/*    /!*    >*!/*/}
                {/*    /!*        ^*!/*/}
                {/*    /!*    </button>*!/*/}
                {/*    /!*}*!/*/}

                {/*</td>*/}
                {/*}*/}

                <td>
                    {/*{table !== undefined &&*/}
                    {table !== undefined&&
                        <Button variant="outline-primary" style={{fontWeight: "bold"}} type="button"
                                onClick={() => {
                                    getTable(contact)
                                    setShowMyPatients(true)
                                    // handleShowMyPatients()
                                }}
                        >
                            ראה מטופלים שלי
                        </Button>
                    }
                    {showMyPatients &&  <MyPatientsDialog
                        userName={contact.firstName+" "+contact.lastName} contact={contact}
                        showMyPatients={showMyPatients} setShowMyPatients={setShowMyPatients}
                        add={addTable} deleteObj={deleteObjTable}
                        emptyDetails={emptyDetailsTable} emptyEditDetails={emptyEditDetailsTable}
                        data={table/*contactTable[tableName]*/}
                        HebrewNames={HebrewNames} columnsInfoView={columnsInfoViewTable} requiredId={true}
                        getTable={getTable} update={updateTable}
                        optionIds={tableOptionIds} isEmptyTable={isEmptyTable} isReloadTable={isReloadTable}

                    />}
                    {/*{toEdit &&*/}
                    {
                        <Button className="p-1 m-1" variant="outline-primary" style={{fontWeight: "bold"}}
                                type="button"
                                onClick={(event) => handleEditClick(event, contact)}
                        >
                            <Pencil style={{fontSize:16}}/>
                        </Button>
                    }

                    <Button className="p-1 m-1" variant="outline-danger" style={{fontWeight: "bold"}} type="button"
                            // onClick={() => handleDeleteClick(contact.id)}>
                            onClick={() => setShowDeleteDialog(true)}>
                        <Trash style={{fontSize: 16}}/>
                    </Button>
                    {showDeleteDialog && <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
                        <Modal.Header>
                            <Modal.Title>האם אתה בטוח שברצונך למחוק רשומה זאת?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
                                בטל
                            </Button>
                            <Button variant="danger" onClick={
                                () =>{ handleDeleteClick(contact.id)
                                setShowDeleteDialog(false)}

                            }>
                                כן, מחק
                            </Button>
                        </Modal.Footer>
                    </Modal> }
                </td>
            </tr>
        );
    }
;

export default ReadOnlyRow;