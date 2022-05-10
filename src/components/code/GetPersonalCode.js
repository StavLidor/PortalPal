import React, {useEffect, useState} from "react"
import {makePassword} from "../../useFunction"
import {addPatientToExternalTherapist, addToPatientArr} from "../../firebase";
import hash from "hash.js";
import {Button, Container} from 'react-bootstrap'

export function GetPersonalCode({id = null, type}) {
    //TODO:add a connection
    const [code, setCode] = useState("")
    const [getCodeAgain, setGetCodeAgain] = useState(false)

    const [detailsNewPatient, setDetailsNewPatient] = useState({id: "", connection: "", code: ""})

    useEffect(async () => {
        const realCode = makePassword(10)
        const hashCode = hash.sha256().update(realCode).digest("hex")
        setCode(hashCode)
        console.log(hashCode)

        await addToPatientArr(id, 'code', realCode)

    }, [getCodeAgain])

    // const submitCreate = async e => {
    //     e.preventDefault()
    //     const realCode = makePassword(10)
    //     const hashCode = hash.sha256().update(realCode).digest("hex")
    //     setCode(hashCode)
    //     console.log(hashCode)
    //
    //     await addToPatientArr(id, 'code', realCode)
    //
    //     // if(await addToPatientArr(id,'code',realCode)){
    //     //
    //     // }
    //
    //
    // }
    const submitAdd = async e => {
        e.preventDefault()
        await addPatientToExternalTherapist(detailsNewPatient.id, detailsNewPatient.code, detailsNewPatient.connection)
    }
    return (

        <div>
            <h2 style={{fontSize: 15}}>
                הקוד שניתן לתת למטפל חיצוני כדי לקשרו לפורטל הוא:
                <br/>
                <br/>
                <Container style={{height:100}} className="border border-secondary rounded"> {code}</Container>

            </h2>
            <h3 style={{fontSize: 11}}> *קוד זה ישמש מטפל חיצוני כדי שהילד יהפוך להיות חלק מהמטופלים שלו. על המטפל
                לקחת קוד זה ולהזין אותו תחת המשתמש שלו.
            </h3>
            <Button variant="outline-primary" onClick={()=>{
                setGetCodeAgain(!getCodeAgain)
            }}>קבל קוד חדש</Button>
        </div>
    )

}

export default GetPersonalCode