
import "./listMeeting.css"
import React,{useState,useEffect} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {allMeetingOf, removeMeeting} from "./database/Database";
import ViewMeetingSummaries from "./viewMeetingSummaries/ViewMeetingSummaries"
import {collection, getDocs, onSnapshot, orderBy, query} from "firebase/firestore";
import {auth, db} from "../firebase";


export default function ListMeeting({id,type,therapistId=null}){
    console.log('ListMeeting',type)
    const [data, setData] = useState([])
    useEffect(async () => {
        //console.log('useEffect')
        let q
        let idTherapistIs = (() => {
            if (type === 'parent')
                return therapistId
            return auth.currentUser.uid
        })()
        q = query(collection(db, "patients/" + id + "/therapists/" + idTherapistIs + "/sessions"), orderBy("date", "desc"))
        if (type === 'parent') {
            console.log('allDetailsMeetings222')

            const arr = []
            getDocs(q).then((querySnapshot)=>{
                querySnapshot.forEach((doc) => {
                    arr.push({...doc.data(), id: doc.id})
                    console.log('id', doc.id)
                    // if (doc.data().client === id){
                    //
                    // }
                    console.log(arr)
                    setData(arr)

                });
            })


        }
        else {
            return onSnapshot(
                q,
                (querySnapshot) => {
                    let data=[]
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)

                        data.push({...doc.data(),id:doc.id})

                    ))
                    setData(data)
                    console.log(data)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!',error)
                })
        }
        // const q=query(q1,where("client", '==',id))


    },[])

    // function removeMeeting (id){
    //     const newData = [...data]
    //     const index = data.findIndex((d) => d.idDoc === id)
    //     newData.splice(index, 1)
    //     setData(newData)
    // }
    // function addMeeting (details) {
    //     const newData = [...data]
    //     newData.push(details)
    //     setData(newData)
    // }
    // function updateMeeting (details){
    //     const newData = [...data]
    //     const index = data.findIndex((d) => d.idDoc === details.idDoc)
    //     newData[index]= details
    //     setData(newData)
    // }
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
                        <Route path={ "newMeeting"} element={<ViewMeetingSummaries client_id={id} last_data={{id:"",title:"",date:"",summary:""}}
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
                                        <Link to={p.id} className="link">
                                            <ul className="sidebarListItem">
                                                {p.date.toDate().toUTCString()}
                                                &nbsp;
                                            </ul>
                                        </Link>
                                        &nbsp;
                                    </ul>
                                     <Routes>
                                         <Route path={p.id} element={<ViewMeetingSummaries client_id={id} last_data={p}
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