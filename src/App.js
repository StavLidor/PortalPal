import React, {useEffect} from 'react';
import "./app.css"

import LoginFrom from "./components/login/LoginFrom";
import Chat from "./components/chats/Chat";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "./firebase";

function App() {
    // useEffect(async () => {
    //
    //     const unsubscribe = query(collection(db, "patients/001/therpist/Rahbt7jhvugjFSsnrcnBb5VMfUb2/sessions"),
    //       orderBy("createdAt", "asc"), limit(100),
    //
    //     )
    //     console.log('blb')
    //     const querySnapshot = await getDocs(unsubscribe)
    //     let data=[]
    //     querySnapshot.forEach((doc) => (
    //         // console.log(doc)
    //
    //         data.push({...doc.data(),id:doc.id})
    //
    //     ))
    //
    //     console.log('data',data)
    //
    // },[])
    // function getInstitutes() {
    //     setLoading(true);
    //     // const querySnapshot = await getDocs(collection(db, "users"));
    //     // querySnapshot.forEach((doc) => {
    //     //     console.log(`${doc.id} => ${doc.data()}`);
    //     // });
    //     onSnapshot(collection_query,(querySnapshot)=>{
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    //         setInstitutes(items);
    //     setLoading(false);
    //     })
    // }

    // useEffect(()=> {
    //     getInstitutes();
    // }, []);

    // if (loading){
    //     return <h1>Loading...</h1>
    // }

  return (

    <div className="App">
        {/*<Secretary signUser={signUser}  new_user={newUser} new_patients={newPatients} variant={false}/>*/}
    {/*<AddMeetingSummaries/>*/}
    {/*    <Chat userUid1="Rahbt7jhvugjFSsnrcnBb5VMfUb2" userUid2="Rahbt7jhvugjFSsnrcnBb5VMfUb2"/>*/}
      <LoginFrom />
    </div>

  );
}
export default App;


