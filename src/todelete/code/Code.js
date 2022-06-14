import React, {useState} from "react"
import {makePassword} from "../../useFunction"
import {addPatientToExternalTherapist, addToPatientArr} from "../../firebase";
import hash from "hash.js";

export default function Code({id=null,type}){
    //TODO:add a connection
    const [code,setCode]=useState("")
    const [detailsNewPatient,setDetailsNewPatient]=useState({id:"",connection:"",code:""})
    const submitCreate = async e => {
        e.preventDefault()
        const realCode =makePassword(10)
        const hashCode = hash.sha256().update(realCode).digest("hex")
        setCode(hashCode)
        console.log(hashCode)

        await addToPatientArr(id,'code',realCode)

        // if(await addToPatientArr(id,'code',realCode)){
        //
        // }


    }
    const submitAdd = async e => {
        e.preventDefault()
        await addPatientToExternalTherapist(detailsNewPatient.id,detailsNewPatient.code,detailsNewPatient.connection)
    }
    return(
        (type=== 'parent')?(
            <>
                <h2>
                    הקוד הנוכחי שניתן לתת למטפל לקישור
                    {code}
                </h2>
            {/*<form onSubmit={submitCreate}>*/}
            {/*    /!*{code!=="" &&*!/*/}


            {/*    /!*}*!/*/}
            {/*   */}
            {/*</form>*/}
                <button type="submit"  onClick={submitCreate}>
                    קבל קוד
                </button>
            </>
    ):
            <form onSubmit={submitAdd }>
                <div className="form-group">
                    <label htmlFor="id">תז</label>
                    <input type="text" name="id" id="id" onChange={e=>setDetailsNewPatient({...detailsNewPatient,id:e.target.value})} value={detailsNewPatient.id}/>
                </div>
                <div className="form-group">
                    <label htmlFor="connection">קשר</label>
                    <input type="text" name="connection" id="connection" onChange={e=>setDetailsNewPatient({...detailsNewPatient,connection:e.target.value})} value={detailsNewPatient.connection}/>
                </div>
                <div className="form-group">
                    <label htmlFor="code">קוד:</label>
                    <input type="text" name="code" id="code" onChange={e=>setDetailsNewPatient({...detailsNewPatient,code:e.target.value})} value={detailsNewPatient.code}/>
                </div>
                <button type="submit" >
                    הוסף
                </button>
            </form>

    )
}