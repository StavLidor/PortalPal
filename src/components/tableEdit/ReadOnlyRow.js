import React, {Fragment, useState} from "react";
import {Accordion} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {convertToNormalDate} from "../../useFunction";
import TableData from "./TableData";
import MyPatientsDialog from "../../MyPatientsDialog";

const ReadOnlyRow = ({
                         addTable,
                         deleteObjTable,
                         emptyDetailsTable,
                         emptyEditDetailsTable,
                         HebrewNames,
                         columnsInfoViewTable,
                         contact,
                         handleEditClick,
                         handleDeleteClick,
                         requiredId,
                         toEdit,
                         table,
                         handleOpen,
                         handleClose,
                         columnsInfo,getTable,
                     }) => {
        console.log('ReadOnlyRow', contact.id)
        // console.log('ReadOnlyRow', columnNames)
        // columnNames.map((name) => (
        //
        //     console.log(contact[name])
        // ))

        const [showMyPatients, setShowMyPatients] = useState(false)

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
                {requiredId && <td className="text-center">{contact.id}</td>}

                {
                    columnsInfo.map((colInfo) => (
                        <>
                            {colInfo.view && <td className="text-center">
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
                        userName={contact.firstName+" "+contact.lastName}
                        showMyPatients={showMyPatients} setShowMyPatients={setShowMyPatients}
                        add={addTable} deleteObj={deleteObjTable}
                        emptyDetails={emptyDetailsTable} emptyEditDetails={emptyEditDetailsTable}
                        data={table/*contactTable[tableName]*/}
                        HebrewNames={HebrewNames} columnsInfoView={columnsInfoViewTable} requiredId={true}
                        getTable={getTable}
                    />}
                    {/*{toEdit &&*/}
                    {
                        <Button variant="outline-primary" style={{fontWeight: "bold"}}
                                type="button"
                                onClick={(event) => handleEditClick(event, contact)}
                        >
                            ערוך
                        </Button>
                    }

                    <Button variant="outline-primary" style={{fontWeight: "bold"}} type="button"
                            onClick={() => handleDeleteClick(contact.id)}>
                        מחק
                    </Button>
                </td>
            </tr>
        );
    }
;

export default ReadOnlyRow;