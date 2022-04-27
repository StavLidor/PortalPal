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


export default function Home({d, type, institute}) {
    console.log(d.id, 'home')

    const [data, setData] = useState({...d.data(), id: d.id})
    console.log("data :", data)
    const [shouldRender, setShouldRender] = useState(true)

    useEffect(() => {
        const userDocRef = doc(db, 'users', d.id)
        return onSnapshot(
            userDocRef,
            (snapshot) => {
                console.log(snapshot.data())
                const data = snapshot.data()
                setData({...data, id: d.id})
            },
            (error) => {
                // TODO: Handle errors!
                console.log('error!!', error)
            })
    }, [])

    return (
        (type === 'admin') ? (
                <Secretary data={data}/>) :

            <div className="home">
                <div className="welcome">
                    <Topbar/>
                    {(type === 'admin') ? (
                            <Secretary data={data}/>
                        ) :
                        <div className="container">
                            <div className="containerLeft">
                                <Update details={data} setData={setData}/>
                            </div>
                            {type !== 'parent' && institute === 'external' && <Code type={type}
                                                                                    setData={setData}/>}
                            <div className="containerRight">
                                <Sidebar type={type} ids={(() => {
                                    if (type === 'parent') {
                                        console.log(data.idsMangeParents)
                                        return data.idsMangeParents
                                    }
                                    console.log('students', data.institutes[institute])
                                    return data.institutes[institute]
                                })()

                                }/>
                            </div>
                        </div>
                    }
                </div>
            </div>
    )
}