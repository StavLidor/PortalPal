
import React,{useState} from "react";
import DatePicker from "react-datepicker";
import "react-datetime/css/react-datetime.css";
import "./viewMeetingSummaries.css"
import Datetime from 'react-datetime';
import  {updateMeeting,removeMeeting} from "../database/Database";
import TimeInput from 'react-time-input';

export default function ViewMeetingSummaries({client_id,last_data}){
    console.log('viewMeeting')
    const [startDate, setStartDate] = useState(new Date());
//     const [startTime, setStartTime] = useState("00:00");
    const [data, setData] = useState(last_data/*{date:"",summary:""}*//*{date:"03/02/2022 12:00 AM",summaries:"123"}*/)
    const submit=e=>{

        e.preventDefault();
        console.log('sumbit')
        const fullData =Object.assign({}, {client:client_id,idDoc:client_id +data.date._d.toJSON() }, data)
        console.log('add meeting op')
        console.log(fullData.date._d.toJSON())
        updateMeeting({idDoc:fullData.idDoc,client: fullData.client,summary:fullData.summary,date:fullData.date._d.toString()}).then(r => {})
        // if (.btn === 'add'){
        //     console.log('add meeting op')
        //     updateMeeting(data).then(r => {})
        // }

        // else {
        //     removeMeeting(data).then(r => {})
        // }
        // new_patients(detailsPatients);
        // Login(details);
    }
    function deleteMeeting (){

    }
    return(
        <form onSubmit={submit} >
            <div className="from-inner">
                <h2>
                    הוספת פגישה חדשה
                </h2>

                <div className="form-group">
                    <label htmlFor="date">תאריך ושעת מפגש:</label>
                    <Datetime value={data.date} selected={startDate}  onChange={d=>setData({...data,date:d})} />


                </div>

                <div className="form-group" >


                    <input  value={data.summaries} type="text"   className="summaries" name="summaries" id="Meeting summaries"
                            onChange={e=>setData({...data,summary:e.target.value})}/>
                    <label htmlFor="name">סיכום פגישה </label>
                </div>
                <input type="submit" name="add" value="הוספת פגישה"/>
                {last_data.date!=="" && <button onClick={deleteMeeting}>מחיקת פגישה </button> }

            </div>
        </form>
    )
}