import React, {useState} from "react"
import {makePassword} from "../../useFunction"
import {addPatientToExternalTherapist, addToPatientArr} from "../../firebase";
import hash from "hash.js";

export default function Code({id=null,type}){

    const [code,setCode]=useState(null)
    const [detailsNewPatient,setDetailsNewPatient]=useState({id:"",code:""})
    const submitCreate = async e => {
        e.preventDefault()
        const realCode =makePassword(10)
        const hashCode = hash.sha256().update(realCode).digest("hex")
        setCode(hashCode)

        if(await addToPatientArr(id,'code',realCode))
            console.log('add the code')

    }
    const submitAdd = async e => {
        e.preventDefault()
        await addPatientToExternalTherapist(detailsNewPatient.id,detailsNewPatient.code)
    }
    return(
        (type=== 'parent')?(
            <form onSubmit={submitCreate}>
                {code &&
                    <h2>
                        הקוד הנוכחי שניתן לתת למטפל לקישור
                        {code}
                    </h2>

                }
                <button type="submit" >
                    קבל קוד
                </button>
            </form>
    ):
            <form onSubmit={submitAdd }>
                <div className="form-group">
                    <label htmlFor="id">תז</label>
                    <input type="text" name="id" id="id" onChange={e=>setDetailsNewPatient({...detailsNewPatient,id:e.target.value})} value={detailsNewPatient.id}/>
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