import React, {useEffect, useState} from "react"
import {makePassword} from "../../useFunction"
import {addPatientToExternalTherapist, addToPatientArr} from "../../firebase";
import hash from "hash.js";
import {Button, Container, Form, Row} from 'react-bootstrap'
import {FormGroup} from "@mui/material";
import {Toast} from "bootstrap";

export function GetPersonalCode({id = null, type,detailsChild}) {
    //TODO:add a connection
    const [code, setCode] = useState("")
    //const [getCodeAgain, setGetCodeAgain] = useState(false)

    //const [detailsNewPatient, setDetailsNewPatient] = useState({id: "", connection: "", code: ""})

    useEffect(async () => {
        // console.log('detalisChild',detailsChild)
        if(detailsChild.code.length>0){
            setCode( hash.sha256().update(detailsChild.code[0]).digest("hex"))
        }
        else {
            await createACode()
        }
        // const realCode = makePassword(10)
        // const hashCode = hash.sha256().update(realCode).digest("hex")
        // setCode(hashCode)
        // // console.log(hashCode)
        //
        // await addToPatientArr(id, 'code', realCode)

    }, [])
    const createACode=async () => {
        const realCode = makePassword(10)
        const hashCode = hash.sha256().update(realCode).digest("hex")
        setCode(hashCode)
        // console.log(hashCode)

        await addToPatientArr(id, 'code', realCode)
    }

    // const submit=async  e =>{
    //     e.preventDefault()
    //     await submit()
    //
    // }

    const submitAdd = async e => {
        e.preventDefault()
        await addPatientToExternalTherapist(detailsNewPatient.id, detailsNewPatient.code, detailsNewPatient.connection)
    }

    const copyToClipBoard =()=> {
        const copyText = document.getElementById("personal-code-text-box");
        navigator.clipboard.writeText(copyText.innerText)
        const x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    return (

        <div className='p-4'>
            <FormGroup>
            <Form.Label className='fs-1'>קוד אישי</Form.Label>
            <Form.Label className='fs-5'>קוד זה ישמש אותך על מנת לקשר בין המטופל לבין מטפל חדש.</Form.Label>
            <Form.Label className='fs-5'>יש לשתף את הקוד עם המטפל איתו תרצו לבצע את הקישור.</Form.Label>
            <Form.Label className='fs-5'>ברגע שהמטפל יכניס את הקוד למערכת מהחשבון שלו, הפרופיל של המטופל יופיע אצלו.</Form.Label>
            <Form.Label className='fs-5'>באותו האופן, המטפל וכל הפרטים יופיעו בחשבון זה.</Form.Label>
                <br/>
                <Row className='align-items-center gap-3' >
                    <Form.Label className='fs-5' style={{width:'70px',fontWeight:'bold'}}>קוד:</Form.Label>
                    <Form.Label  readonly className='border border-secondary rounded p-2'  id='personal-code-text-box' >{code}</Form.Label>
                    <Button className='btn align-self-start' title='העתק קוד' variant='outline-secondary' style={{width:'110px',height: '40px'}} onClick={copyToClipBoard}>העתק קוד</Button>
                </Row>
                <br/>

                <Form.Label className='fs-5'>שימו לב: הקוד הוא חד-פעמי! ברגע שמטפל מכניס אותו למערכת יווצר קוד חדש.</Form.Label>
                <br/><br/><br/><br/>


                <Form.Label className='fs-5'>ביצירת קוד חדש - הקוד הישן יבוטל ולא יהיה שמיש אם טרם הוכנס למערכת. </Form.Label>
                <Button className='w-25' variant="outline-danger" onClick={createACode}>קבל קוד חדש</Button>
                <br/>
            </FormGroup>
            <div className='show' id="toast">הקוד הועתק...</div>

        </div>
    )

}

export default GetPersonalCode