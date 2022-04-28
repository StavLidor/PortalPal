
import React,{useState} from "react";
import DatePicker from "react-datepicker";
import "react-datetime/css/react-datetime.css";
import "./viewMeetingSummaries.css"
import Datetime from 'react-datetime';
import {updateMeeting, removeMeeting, newMeeting} from "../database/Database";
import TimeInput from 'react-time-input';
import firebase from "firebase/compat/app";

export default function ViewMeetingSummaries({client_id,last_data,isEdit}){
    console.log('viewMeeting')
    console.log(last_data)
    const [edit, setEdit] =useState(last_data.id==="")
    const [data, setData] = useState({date:last_data.date,summary:last_data.summary,title:last_data.title})
    const submit=async e => {

        e.preventDefault();
        if(last_data.id ==='')
            await newMeeting(data,client_id)
        if (last_data.summary !== data.summary||last_data.date != data.date||
            last_data.title != data.title) {
            let sendDetails={}
            if(last_data.summary !== data.summary)
                sendDetails['summary']=data.summary
            if(last_data.date !== data.date)
                sendDetails['date']=data.date
            if(last_data.title !== data.title)
                sendDetails['title']=data.title
            await updateMeeting(last_data.id,sendDetails,client_id)
        }
    }
    async function deleteMeeting() {

        await removeMeeting(last_data.id,client_id)
    }
    return(
        // <>
            (edit)?(
                <form onSubmit={submit} >
                    <div className="from-inner">
                        {last_data.date==="" &&
                            <h2>
                                הוספת פגישה חדשה
                            </h2>
                        }
                        {last_data.date!=="" &&
                            <h2>
                                עריכת פגישה
                            </h2>
                        }
                        <div className="form-group">
                            <label htmlFor="title">כותרת</label>
                            <input type='text'  value={data.title} onChange={e=>setData({...data,title:e.target.value})}
                                   placeholder='כותרת'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">תאריך ושעת מפגש:</label>
                            <Datetime value={(()=>{
                                if( data.date!=='')
                                    return data.date.toDate().toUTCString()
                                else
                                    return data.date
                            })()

                            } selected={data.date}  onChange={d=>setData({...data,date:firebase.firestore.Timestamp.fromDate(new Date(d._d.toString()))})} />
                        </div>

                        <div className="form-group" >


                            <input  value={data.summary} type="text"   className="summaries" name="summaries" id="Meeting summaries"
                                    onChange={e=>setData({...data,summary:e.target.value})}/>
                            <label htmlFor="name">סיכום פגישה </label>
                        </div>
                        <input type="submit" name="add" value="עדכון פגישה"/>
                        {last_data.date!=="" && <button onClick={deleteMeeting}>מחיקת פגישה </button> }

                    </div>
                </form>

            ):
                <div>
                <div className="form-group">
                    <label htmlFor="date">תאריך:</label>
                    {last_data.date.toDate().toUTCString()}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">סיכום פגישה:</label>
                    {data.summary}
                </div>
                    {isEdit &&
                        <button
                            type="button"
                            onClick={(event) => setEdit(true)}
                        >
                            ערוך
                        </button>
                    }
                </div>




        // </>
    )
}