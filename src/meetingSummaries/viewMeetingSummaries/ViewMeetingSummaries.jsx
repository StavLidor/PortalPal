
import React,{useState} from "react";
import DatePicker from "react-datepicker";
import "react-datetime/css/react-datetime.css";
import "./viewMeetingSummaries.css"
import Datetime from 'react-datetime';
import TimeInput from 'react-time-input';

export default function ViewMeetingSummaries({dataMeeting}){
 console.log('viewMeeting')
    const [startDate, setStartDate] = useState(new Date());
//     const [flag, setFlag] = useState(false);
    const [startTime, setStartTime] = useState("00:00");
    const [data, setData] = useState(dataMeeting/*{date:"",summaries:""}*//*{date:"03/02/2022 12:00 AM",summaries:"123"}*/);
    const submitSaveMeeting=e=>{
        e.preventDefault();
        // new_patients(detailsPatients);
        // Login(details);
    }
    return(
        <form onSubmit={submitSaveMeeting} >
            <div className="from-inner">
            <h2>
                הוספת פגישה חדשה
            </h2>

            <div className="form-group">
                <label htmlFor="date">תאריך ושעת מפגש:</label>
                <Datetime value={data.date} selected={startDate} onChange={(date) => setStartDate(date)} />


            </div>

            <div className="form-group" >


                <input  value={data.summaries} type="text"   className="summaries" name="summaries" id="Meeting summaries" /*onChange={e=>setDetailsPatients({...detailsPatients,nameParent:e.target.value})} value={detailsPatients.nameParent}*//>
                <label htmlFor="name">סיכום פגישה </label>
            </div>
            <input type="submit" name="add" value="הוספת/עדכון פגישה"/>
{/*             {data.date!=="" && <input type="submit" name="remove" value="מחיקת פגישה"/> } */}

            </div>
        </form>
    )
}