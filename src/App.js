import React, {useEffect, useState} from 'react';
import './app.css'
import {BrowserRouter as Router} from "react-router-dom";
import {db, signOutCurrentUser} from "./firebase";
import {auth} from './firebase'
import Authenticate from "./components/login/Authenticate";
import HomePage from "./pages/home/HomePage";
import {collection, doc, getDocs, onSnapshot} from "firebase/firestore";
import {AddTypeExternalTherapist} from "./components/forms/AddTypeExternalTherapist"

function App() {
    const [isSigneIn, setIsSigneIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [hasDetails, setHasDetails] = useState(false);
    const [checkUserConnection, setCheckUserConnection] = useState(false);
    const [displayLoginError, setDisplayLoginError] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [addExternal, setAddExternal] = useState(false)
    const [connectNow,setConnectNow]=useState(false)
    const [listInstitutes,setListInstitutes]=useState([])
    const [dictInstitutes,setDictInstitutes]=useState({})




    useEffect(() => {
        let arrInstitutes=[]
        let institutesDict={}
        //all the institute of the protopel
        getDocs(collection(db, "institutes")).then((d) => {
            d.forEach((doc) => {
                arrInstitutes.push({key:doc.id,value:doc.data().name})
                institutesDict[doc.id.toString()]=doc.data().name
            })
            arrInstitutes.push({key:'external',value:'חיצוני'})
            setListInstitutes(arrInstitutes)
            setDictInstitutes({...institutesDict,external:'חיצוני'})

        })
        const unsubscribe = auth.onAuthStateChanged(async user => {
            setCheckUserConnection(true)
            if (user) {
                setIsSigneIn(true)


                try {
                    const docRef = doc(db, "users", auth.currentUser.uid);
                    // when add change in the current therapist should know this
                    onSnapshot(docRef,(value)=>{
                        setUserDetails(value)
                        if(localStorage.getItem('type') === 'parent' && (()=>{
                            for (const [k, v] of Object.entries(value.data().childrenIds)) {

                                if (v.findIndex((i) => i === localStorage.getItem("institute")) !== -1) {
                                    return false

                                }
                            }
                            return true
                        })()){
                            signOutCurrentUser()
                            setDisplayLoginError(true)
                            return
                        }

                        // need to check is entre with job exist to the current patient and institute
                        if(value.data().titles.includes(localStorage.getItem('type'))){


                            if(localStorage.getItem('type') === 'therapist' &&
                                !(localStorage.getItem("institute") in   value.data().institutes)){
                                signOutCurrentUser()
                                setDisplayLoginError(true)
                                localStorage.setItem("type", "")
                                localStorage.setItem("institute", "")
                                return
                            }
                            else {
                                setHasDetails(true)
                                setDisplayLoginError(false)
                                setIsFirstLoad(true)
                                setConnectNow(false)
                            }

                        }
                        else{
                            //Extreme case
                            if(localStorage.getItem('type') === 'therapist' &&localStorage.getItem("institute")===
                                'external'
                            ){
                                setAddExternal(true)
                            }
                            else {
                                signOutCurrentUser()
                                setDisplayLoginError(true)
                                localStorage.setItem("type", "")
                                localStorage.setItem("institute", "")
                            }

                        }


                    })
                } catch (err) {
                    return null
                }
            } else {
                localStorage.setItem("type", "")
                localStorage.setItem("institute", "")
                localStorage.setItem("currentPerson", "")
                localStorage.setItem("currentPage", "")
                setIsSigneIn(false)
                if(isFirstLoad === false){
                    setDisplayLoginError(true)
                }
                setIsFirstLoad(false)
            }
        })
        return unsubscribe

    }, [])
    /*when login set what need*/
    const login = async (type, institute, isSuccessfulSignIn) => {
        localStorage.setItem("type", type)
        localStorage.setItem("institute", institute)
        setDisplayLoginError(!isSuccessfulSignIn)

    }

    return (

        <Router>
            <div className="App">
                {addExternal && <AddTypeExternalTherapist setAddExternal={setAddExternal}/>}
                {(((isSigneIn === false && checkUserConnection)||
                    (connectNow))&& listInstitutes.length>0 ) ?(<Authenticate login={login}
                                                      load={connectNow && !displayLoginError}
                                                      setConnectNow={setConnectNow} listInstitutes={listInstitutes}/>):(
                    checkUserConnection===false ||(isSigneIn && hasDetails===false)
                )?(<div>טוען...</div>):(<></>) }
                {isSigneIn && hasDetails && displayLoginError === false &&localStorage.getItem("institute") in dictInstitutes&&
                <HomePage setConnectNow={setConnectNow} dictInstitutes={dictInstitutes} userDetails={{...userDetails.data(),id:userDetails.id}} type={localStorage.getItem("type")} institute={localStorage.getItem("institute")} />}

            </div>
        </Router>

    );
}

export default App;


