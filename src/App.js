import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Patient from "./pages/patient/Patient"

import {db,auth} from './firebase';

import { collection, doc, setDoc,getDoc ,where,query, getDocs, addDoc} from "firebase/firestore";
import React, { useState, useEffect, Component }  from 'react';
import LoginFrom from "./components/login/LoginFrom";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import "./app.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

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
        try {
            const res= await signInWithEmailAndPassword(auth, details.email, details.password);
            console.log( res.user.uid)
            const docRef = doc(db, "users", res.user.uid);
            const d = await getDoc(docRef);

            setUser({
                name:d.data().name,
                email: details.email
            })
        } catch (err) {
            console.log('the user not exsist')
            console.error(err);
            //alert(err.message);
        }

    }
    const Logout = ()=>{
        // console.log('logout');
        setUser({email:"",password:""});
    }

    const new_user=async details=>{
        let arr_ids = details.ids.split(",");
        try {
            const res = await createUserWithEmailAndPassword(auth, details.email, details.password);
            const user = res.user;
            await setDoc(doc(collection_query_users , user.uid), {
                name:details.name,type:details.type,email:details.email,password:details.password,ids:arr_ids});
            console.log("HI user",details.name.toString(),details.type.toString(),details.password.toString());
        } catch (err) {
            console.log('user with this mail exsist')
        }

        // await addDoc(collection(db, "users"), {
        //     uid: user.uid,name:details.name,type:details.type,email:details.email,password:details.password,ids:arr_ids
        // });


    }
    const new_patients= async details=>{
        //setNewUserFlag(true);
        const q = query(collection_query_users, where("ids","array-contains",details.id));
        const querySnapshot = await getDocs(q);
        let id_parents=[]
        let id_Therapists=[]
        querySnapshot.forEach((doc) => {
            if (doc.data().type =="therapist"){
                id_Therapists.push(doc.id)
            }
            else {
                id_parents.push(doc.id)
            }
        });

        await setDoc(doc(collection_query_patients, details.id), {

            id:details.id,name:details.name,parents:id_parents,therapists:id_Therapists});
        console.log("HI",details.id.toString(),details.name.toString());
    }
  return (

    <div className="App">
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


    </div>

  );
}
export default App;


