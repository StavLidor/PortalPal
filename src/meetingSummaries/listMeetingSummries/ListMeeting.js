
import "./listMeeting.css"
import React,{useState,useEffect} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {allMeetingOf, removeMeeting} from "../database/Database";
import ViewMeetingSummaries from "../viewMeetingSummaries/ViewMeetingSummaries"


export default function ListMeeting({id,type,therapistId=null}){
    console.log('ListMeeting',type)
    const [data, setData] = useState([])
    useEffect(()=>{
        //console.log('useEffect')
        allMeetingOf(id,type,therapistId).then(arr => {
            console.log('then',arr)
            setData(arr)
        })

    },[])

    function removeMeeting (id){
        const newData = [...data]
        const index = data.findIndex((d) => d.idDoc === id)
        newData.splice(index, 1)
        setData(newData)
    }
    function addMeeting (details) {
        const newData = [...data]
        newData.push(details)
        setData(newData)
    }
    function updateMeeting (details){
        const newData = [...data]
        const index = data.findIndex((d) => d.idDoc === details.idDoc)
        newData[index]= details
        setData(newData)
    }
    return(
        <div className='sidebar'>
            {type!=='parent' &&
                <>
                <ul className="sidebarList">
                    <Link to={ "newMeeting"} className="link">
                        <ul className="sidebarListItem">
                            הוספה פגישה חדשה
                            &nbsp;
                        </ul>
                    </Link>
                    &nbsp;
                </ul>
                    <Routes>
                        <Route path={ "newMeeting"} element={<ViewMeetingSummaries client_id={id} last_data={{date:"",summary:""}} addMeeting ={addMeeting}
                                                                                   isEdit={true}/>} />
                    </Routes>
                </>

            }
              <h1>רשימת מפגשים</h1>
            {

                data.map((p) => (
                    <div >
                        <div className="sidebarWrapper">
                            <div className="topLeft">
                            </div>
                                <div className='sidebarMenu'>
                                    <ul className="sidebarList">
                                        <Link to={p.idDoc} className="link">
                                            <ul className="sidebarListItem">
                                                {p.date}
                                                &nbsp;
                                            </ul>
                                        </Link>
                                        &nbsp;
                                    </ul>
                                     <Routes>
                                         <Route path={p.idDoc} element={<ViewMeetingSummaries client_id={id} last_data={p}
                                                                                              addMeeting={addMeeting}
                                                                                              removeMeetingView={removeMeeting}
                                                                                              updateMeetingView={updateMeeting}
                                                                                              isEdit={(()=>{
                                                                                                  if(type == 'parent'){
                                                                                                      return false
                                                                                                  }
                                                                                                  return true
                                                                                              })()}/>
                                         } />
                                     </Routes>
                                </div>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}