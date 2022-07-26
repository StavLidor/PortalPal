import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {convertToNormalDate} from "../../useFunction";
import MyPatientsDialog from "./MyPatientsDialog";
import { Pencil,Trash} from 'react-bootstrap-icons';
/*read only the table data*/
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

        const [showMyPatients, setShowMyPatients] = useState(false)
        const [showDeleteDialog, setShowDeleteDialog] = useState(false)

        return (
            <tr>

                {requiredId && <td style={{fontSize: 20}} className="text-center">{contact.id}</td>}

                {
                    columnsInfo.map((colInfo) => (
                        <>
                            {colInfo.view && <td style={{fontSize: 20}} className="text-center">
                                {(() => {
                                        if (colInfo.type !== 'date'){
                                            if(Array.isArray(contact[colInfo.name]))
                                                return contact[colInfo.name].join()
                                            return contact[colInfo.name]
                                        }

                                        return convertToNormalDate(contact[colInfo.name])
                                    }
                                )()

                                }
                            </td>}
                        </>

                    ))
                }

                <td>
                    {table !== undefined&&
                        <Button variant="outline-primary" style={{fontWeight: "bold"}} type="button"
                                onClick={() => {
                                    getTable(contact)
                                    setShowMyPatients(true)
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