import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Patient from "./pages/patient/Patient"

import db from './firebase';
// import { doc,getDocs , onSnapshot, collection, query, where } from "firebase/firestore";
import { collection, doc, setDoc,getDoc ,where,query, getDocs} from "firebase/firestore";
// import {  doc,getDocFromCache} from "firebase/firestore";


import React, { useState, useEffect, Component }  from 'react';
import LoginFrom from "./components/login/LoginFrom";
import "./app.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import NewUser from "./components/login/NewUser";

function App() {
    const collection_query_users = collection(db,"users");
    const collection_query_patients = collection(db,"patients");
    const [institutes, setInstitutes] = useState([]);
    const [loading, setLoading] = useState(false);

    const [user,setUser] = useState({email:"",password:""});
    const [newUser,setNewUser] = useState({name:"",type:"",email:"",password:"",patients:[]});
    const [newPatients,setNewPatients] = useState({id:"",name:""});
    const [error,setError] = useState("");
    const [newUserFlag,setNewUserFlag]=useState(false);

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

    if (loading){
        return <h1>Loading...</h1>
    }



    const adminUser={
        email:"admin@admin.com",
        password:"admin123"
    }

    const Login = async details=>{
        // later check before if this in Cache
        console.log(details);
        const docRef = doc(db, "users", details.email);
        try {
            const doc = await getDoc(docRef);
                if (doc.data().password === details.password){
                    console.log("Logged in")
                    setUser({
                        name:doc.data().name,
                        email: details.email
                    })

                }
                else {
                    console.log("Details do not match")
                }
            // Document was found in the cache. If no cached document exists,
            // an error will be returned to the 'catch' block below.

            console.log("Cached document data:", doc.data());
        } catch (e) {
            console.log("Details do not match")
        }

        // if (details.email === adminUser.email && details.password === adminUser.password){
        //     console.log("Logged in")
        //     setUser({
        //         name:"Stav",
        //         email: details.email
        //     })
        // }
        // else{
        //     console.log("Details do not match")
        // }

    }
    const Logout = ()=>{
        // console.log('logout');
        setUser({email:"",password:""});
    }

    const new_user=async details=>{
        //setNewUserFlag(true);
        // setNewUser({
        //     name:details.name,type:details.type,email:details.email,password:details.password,patients:[]
        //
        // })
        let arr_ids =details.ids.split(",");

        await setDoc(doc(collection_query_users, details.email), {

            name:details.name,type:details.type,email:details.email,password:details.password,ids:arr_ids});
        // collection_query_users.doc("1")
        //     .set({name:details.name,type:details.type,email:details.email,password:details.password,createdAt: db.firestore.FieldValue.serverTimestamp(),
        //         lastUpdate: db._firestoreClient.serverTimestamp()}).catch((err)=>{alert(err)
        // console.log(err)})
        // await Promise.all([
        //     setDoc(doc(citiesRef, 'SF', 'landmarks'), {
        //         name: 'Golden Gate Bridge',
        //         type: 'bridge'
        //     })]);
        console.log("HI user",details.name.toString(),details.type.toString(),details.password.toString());

    }
    const new_patients= async details=>{
        //setNewUserFlag(true);
        // const q = query(collection_query_users, where("ids", "in", details.id));
        //const querySnapshot = await getDocs(q);
        let mail_parents=[]
        let mail_Therapist=[]
        // querySnapshot.forEach((doc) => {
        //     if (doc.data().type)
        //     // doc.data() is never undefined for query doc snapshots
        //     //console.log(doc.id, " => ", doc.data());
        // });

        await setDoc(doc(collection_query_patients, details.id), {

            id:details.id,name:details.name});
        // setNewUser({
        //     id:details.id,name:details.name
        // })
        console.log("HI",details.id.toString(),details.name.toString());
    }
  return (

    <div className="App">
        {/*<h1>Blah Blah</h1>*/}
        {/*{institutes.map((institute)=>(*/}
        {/*    <h2>{institute.hello}</h2>*/}
        {/*    ))}*/}
        {(user.email!=="") ? (
            <div className="welcome">
                <h2>Welcome,<span>{user.name}</span></h2>
                <button onClick={Logout}>Logout</button>
                <Topbar/>

                 <div className="container">
                      <div className="patients">

                      </div>

                     {/*<span></span>*/}

                     <div className="containerRight">
                         <div className="Sidebar">

                             <Router>
                                 <Sidebar/>
                                 <Routes>
                                 <Route path="/dana_barger" element={<Patient />} />
                                 </Routes>
                             </Router>


                         </div>
                     </div>
                 </div>
            </div>

        ):
            // (newUserFlag === true) ? (
            //     <div>
            //                         <NewUser/>
            //     </div>
            // ):
            (
            <LoginFrom Login={Login} error={error} new_user={new_user} new_patients={new_patients}/>
        )
        }

      {/*<Topbar/>*/}

      {/* <div className="container">*/}
      {/*      <div className="patients">*/}

      {/*      </div>*/}

      {/*     /!*<span></span>*!/*/}

      {/*     <div className="containerRight">*/}
      {/*         <div className="Sidebar">*/}

      {/*             <Router>*/}
      {/*                 <Sidebar/>*/}
      {/*                 <Routes>*/}
      {/*                 <Route path="/dana_barger" element={<Patient />} />*/}
      {/*                 </Routes>*/}
      {/*             </Router>*/}


      {/*         </div>*/}
      {/*     </div>*/}
      {/* </div>*/}


    </div>

  );
}
export default App;


