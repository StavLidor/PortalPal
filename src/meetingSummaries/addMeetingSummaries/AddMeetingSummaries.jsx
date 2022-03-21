
import React,{useState} from "react";
import DatePicker from "react-datepicker";
import "react-datetime/css/react-datetime.css";
import "./addMeetingSummaries.css"
import Datetime from 'react-datetime';
import TimeInput from 'react-time-input';

export default function AddMeetingSummaries(){
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState("00:00");
    const submitNewPatient=e=>{
        e.preventDefault();
        // new_patients(detailsPatients);
        // Login(details);
    }
    return(
        <form onSubmit={submitNewPatient} >
            <div className="from-inner">
            <h2>
                הוספת פגישה חדשה
            </h2>
                <label htmlFor="date">תאריך ושעת מפגש:</label>
            <div className="form-group">

                <Datetime selected={startDate} onChange={(date) => setStartDate(date)} />

            </div>

            <div className="form-group" >


                <input type="text"   className="summaries" name="summaries" id="Meeting summaries" /*onChange={e=>setDetailsPatients({...detailsPatients,nameParent:e.target.value})} value={detailsPatients.nameParent}*//>
                <label htmlFor="name">סיכום פגישה </label>
            </div>
            <input type="submit" value="הוספת פגישה"/>
            </div>
        </form>
    )
}