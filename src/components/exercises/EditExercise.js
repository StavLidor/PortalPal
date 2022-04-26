import React,{useState} from "react"
import Datetime from "react-datetime";
export default function ViewExercise({exercise,update}){
    const [data, setData] = useState(exercise)
    const submit=e=>{
        e.preventDefault()
        let dataUpdate ={}
        if(exercise.until !== data.until)
            dataUpdate['until']=exercise.until
        if(exercise.description !== data.description)
            dataUpdate['description']=exercise.description
        if(exercise.place !== data.place)
            dataUpdate['place']=exercise.place
        if(dataUpdate!=={})
            update(dataUpdate)

    }
    return(
        // <div>
        <form onSubmit={submit} >
            <div className="form-group">
                <label htmlFor="date">עד לתאריך:</label>
                <Datetime value={data.until} selected={data.until}  onChange={d=>setData({...data,until:d._d.toString()})} />
            </div>

            <div className="form-group" >

                <input  value={data.description} type="text"   className="summaries" name="summaries" id="Meeting summaries"
                        onChange={e=>setData({...data,description:e.target.value})}/>
                <label htmlFor="name">תיאור: </label>
            </div>
            <div className="form-group" >

                <input  value={data.place} type="text"   className="summaries" name="summaries" id="Meeting summaries"
                        onChange={e=>setData({...data,place:e.target.value})}/>
                <label htmlFor="name">מיקום התרגיל: </label>
            </div>
        </form>

        // </div>
    )

}