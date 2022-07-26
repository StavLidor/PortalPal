import React, {useEffect, useState} from "react"
import {makePassword} from "../../useFunction"
import {addToPatientArr} from "../../firebase";
import hash from "hash.js";
import {Button, Form, Row} from 'react-bootstrap'
import {FormGroup} from "@mui/material";


export function GetPersonalCode({id = null, type,detailsChild}) {
    const [code, setCode] = useState("")

    useEffect(async () => {

        if(detailsChild.code.length>0){
            // if it has code convert him
            setCode( hash.sha256().update(detailsChild.code[0]).digest("hex"))
        }
        else {
            // create a new code
            await createACode()
        }

    }, [id])
    // create a code to connect between patient and external therapist
    const createACode=async () => {
        const realCode = makePassword(10)
        const hashCode = hash.sha256().update(realCode).digest("hex")
        setCode(hashCode)
        // add to firebase of the child
        await addToPatientArr(id, 'code', realCode)
    }
    // show the code with timeout
    const copyToClipBoard =()=> {
        const copyText = document.getElementById("personal-code-text-box");
        navigator.clipboard.writeText(copyText.innerText)
        const x = document.getElementById("toast");

        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
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
                    <Form.Label  readOnly className='border border-secondary rounded p-2'  id='personal-code-text-box' >{code}</Form.Label>
                    <Button className='btn align-self-start' title='העתק קוד' variant='outline-secondary' style={{width:'110px',height: '40px'}} onClick={copyToClipBoard}>העתק קוד</Button>
                </Row>
                <br/>

                <Form.Label className='fs-5'>שימו לב: הקוד הוא חד-פעמי! ברגע שמטפל מכניס אותו למערכת הוא כבר לא שמיש.</Form.Label>



                <Form.Label className='fs-5'>על מנת להוסיף יותר ממטפל אחד יש ליצור קוד נוסף. </Form.Label>
                <Button className='w-25' variant="outline-danger" onClick={createACode}>קבל קוד חדש</Button>
                <br/>
            </FormGroup>
            <div  id="toast">הקוד הועתק...</div>

        </div>
    )

}

export default GetPersonalCode