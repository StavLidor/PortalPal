
import React,{useState} from "react";
import DatePicker from "react-datepicker";
import "react-datetime/css/react-datetime.css";
import "./addMeetingSummaries.css"
import Datetime from 'react-datetime';
import  {updateMeeting,removeMeeting} from "../database/Database";
import TimeInput from 'react-time-input';

export default function AddMeetingSummaries({client_id,last_data}){
//     const [startDate, setStartDate] = useState(new Date());
//     const [startTime, setStartTime] = useState("00:00");
    const [data, setData] = useState(last_data/*{date:"",summary:""}*//*{date:"03/02/2022 12:00 AM",summaries:"123"}*/)
    const submit=e=>{
        e.preventDefault();
        const fullData =Object.assign({}, {client:client_id}, data)
        if (e.name === 'add'){
            updateMeeting(data).then(r => {})
        }

        else {
            removeMeeting(data).then(r => {})
        }
        // new_patients(detailsPatients);
        // Login(details);
    }
    return(
        <form onSubmit={submit} >
            <div className="from-inner">
            <h2>
                הוספת פגישה חדשה
            </h2>

            <div className="form-group">
                <label htmlFor="date">תאריך ושעת מפגש:</label>
                <Datetime value={data.date} selected={data.date} onChange={e=>setData({...data,data:e.target.value})} />


            </div>

            <div className="form-group" >


                <input  value={data.summaries} type="text"   className="summaries" name="summaries" id="Meeting summaries"
                        onChange={e=>setData({...data,summary:e.target.value})}/>
                <label htmlFor="name">סיכום פגישה </label>
            </div>
            <input type="submit" name="add" value="הוספת פגישה"/>
            {last_data.date!=="" && <input type="submit" name="remove" value="מחיקת פגישה"/> }

            </div>
        </form>
    )
}