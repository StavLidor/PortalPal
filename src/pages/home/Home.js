
import React, {useEffect, useState} from "react";
import Topbar from "../../components/topbar/Topbar";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Patient from "../patient/Patient";
import Secretary from "../secretary/Secretary";
import ReadOnlyRow from "../../components/tableEdit/ReadOnlyRow";
import {db, auth, detailsPatient, updatesCurrentUser} from "../../firebase";
import Update from "../update/Update";
import Chat1 from "../../components/chats/Chat1"
import Code from "../../components/code/Code";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";


export default function Home({d,type,institute,user}){
    console.log(user,'home')

    const [data,setData]=useState(d)
    const [shouldRender, setShouldRender] = useState(true)
    // const userDocRef = collection(db, 'users/'+auth.currentUser.uid)
    useEffect( () =>{
        // console.log(data.firstName)
        // return onSnapshot(collection(db, 'users/'+user.uid),(snapshot)=>{
        //     setData(snapshot.docs[0].data())
        // })

        const userDocRef = doc(db, 'users',user)
        return onSnapshot(
            userDocRef,
            (snapshot) => {
                console.log(snapshot.data())
                const data = snapshot.data()
                setData({...data,id:user})
                // const id = user


                // const newHabits = snapshot.docs.map((doc) => doc.data())
                // console.log(newHabits)
                // setData(newHabits)// consider using snapshot.docChanges() in later renders for efficiency
                //console.log("New version of habits found!", newHabits); // note: habits isn't updated straight away, so we use the array passed to setHabits
            },
            (error) => {
                // TODO: Handle errors!
                console.log('error!!',error)
            })
        // window.location.reload()
    },[])
    return(
        // <>
        //     </>
        (type =='admin') ? (
            // <div className="home">
                <Secretary data={d}/>
            // </div>
            ):
        // (type =="therapist") ? (
        //         // <div className="home">
        //             <Secretary data={d}/>
        //         // </div>
        //     ):
        // (type =="teacher") ? (
        //         // <div className="home">
        //             <Secretary data={d}/>
        //         // </div>
        // ):
        // parents

        <div className="home">
            <div className="welcome">
                {/*<h2>Welcome,<span>{data.firstName +" "+data.lastName}</span></h2>*/}

                <Topbar/>
                {(type === 'admin') ? (
                    // <div className="home">
                    <Secretary data={data}/>
                    // </div>
                ) :
                    <div className="container">
                        <div className="containerLeft">
                            <Update details={data} setData ={setData}/>
                        </div>
                        {type != 'parent'&&institute == 'external' && <Code type={type}
                        setData={setData}/>}
                        <div className="containerRight">
                            <Sidebar type={type} ids={(()=>{
                                if(type == 'parent'){
                                    console.log(data.idsMangeParents)
                                    return data.idsMangeParents
                                    //return detailsPatient(data.idsMangeParents)
                                }

                                console.log('students',data.institutes[institute])
                                return data.institutes[institute]
                                //return detailsPatient(data.institutes[institute])
                            })()

                            }/>
                            {/*<Chat1/>*/}
                        </div>





                    </div>
                }


            </div>
        </div>

    )
}