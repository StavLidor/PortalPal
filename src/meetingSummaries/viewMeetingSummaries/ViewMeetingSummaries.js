
import React,{useState} from "react";
import DatePicker from "react-datepicker";
import "react-datetime/css/react-datetime.css";
import "./viewMeetingSummaries.css"
import Datetime from 'react-datetime';
import {updateMeeting, removeMeeting, newMeeting} from "../database/Database";
import TimeInput from 'react-time-input';

export default function ViewMeetingSummaries({client_id,last_data}){
    console.log('viewMeeting')
    console.log(last_data)
    const [startDate, setStartDate] = useState(new Date());
//     const [startTime, setStartTime] = useState("00:00");
    const [data, setData] = useState(last_data/*{date:"",summary:""}*//*{date:"03/02/2022 12:00 AM",summaries:"123"}*/)
    const submit=e=>{

        e.preventDefault();
        if(last_data.date==="" ||last_data.date !== data.date){
            if(last_data.date !== data.date){
                deleteMeeting()
            }
            console.log('sumbit')
            const fullData =Object.assign({}, {client:client_id,/*idDoc:client_id +data.date._d.toJSON()*/ }, data)
            console.log('add meeting op')

            newMeeting({idDoc:fullData.idDoc,client: fullData.client,summary:fullData.summary,date:fullData.date}).then(r => {})
        }
        else if(last_data.summary !== data.summary){
            updateMeeting({idDoc:last_data.idDoc,summary:data.summary})

        }
    }
    function deleteMeeting (){
        removeMeeting(last_data)
    }
    return(
        <form onSubmit={submit} >
            <div className="from-inner">
                <h2>
                    הוספת פגישה חדשה
                </h2>

                <div className="form-group">
                    <label htmlFor="date">תאריך ושעת מפגש:</label>
                    <Datetime value={data.date} selected={data.date}  onChange={d=>setData({...data,date:d._d.toString(),idDoc:client_id +d._d.toJSON()})} />


                </div>

                <div className="form-group" >


                    <input  value={data.summary} type="text"   className="summaries" name="summaries" id="Meeting summaries"
                            onChange={e=>setData({...data,summary:e.target.value})}/>
                    <label htmlFor="name">סיכום פגישה </label>
                </div>
                <input type="submit" name="add" value="הוספת פגישה"/>
                {last_data.date!=="" && <button onClick={deleteMeeting}>מחיקת פגישה </button> }

            </div>
        </form>
    )
}