import React, {useEffect, useState} from 'react';
// import "./app.css"
import './chat.css'
import {BrowserRouter as Router, Route,} from "react-router-dom";
import {db, signOutCurrentUser} from "./firebase";
import {auth, GetCurrentUser, getDocCurrentUser} from './firebase'
import Authenticate from "./components/login/Authenticate";
import HomePage from "./pages/home/HomePage";
import {collection, doc, getDoc, getDocs, onSnapshot, query} from "firebase/firestore";
import {AddTypeExternalTherapist} from "./AddTypeExternalTherapist"
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
    // console.log('CHeck',dictInstitutes=={})



    useEffect(() => {
        let arrInstitutes=[]
        let institutesDict={}
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
                    onSnapshot(docRef,(value)=>{
                        console.log(value)
                        console.log(value.data())
                        console.log(value.data().titles)
                        // if(!(localStorage.getItem("refresh")!=null||localStorage.getItem("refresh")!=='')){
                        //
                        // }
                        setUserDetails(value)
                        console.log("data user details: ", value.data().childrenIds)
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
                           // setConnectNow(false)
                            // localStorage.setItem("type", "")
                            // localStorage.setItem("institute", "")
                            return
                        }


                        if(value.data().titles.includes(localStorage.getItem('type'))){
                            //console.log(localStorage.getItem('type'),!(localStorage.getItem("institute") in   value.data().institutes))

                            if(localStorage.getItem('type') === 'therapist' &&
                                !(localStorage.getItem("institute") in   value.data().institutes)){
                                signOutCurrentUser()
                                setDisplayLoginError(true)
                                //setConnectNow(false)
                                localStorage.setItem("type", "")
                                localStorage.setItem("institute", "")
                                return
                            }
                            else {
                                setHasDetails(true)
                                //console.log('print hello')
                                setDisplayLoginError(false)
                                setIsFirstLoad(true)
                                setConnectNow(false)
                            }

                        }
                        else{
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
                                // setConnectNow(false)
                            }

                        }

                        // if(localStorage.getItem('type')  ==='admin' && value.data().institute===''){
                        //     signOutCurrentUser()
                        //     setDisplayLoginError(true)
                        //     localStorage.setItem("type", "")
                        //     localStorage.setItem("institute", "")
                        // }

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

    const login = async (type, institute, isSuccessfulSignIn) => {
        // setConnectNow(true)
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
                {/*{isSigneIn === false && checkUserConnection && <AQold/>}*/}
                {/*{isSigneIn === false && checkUserConnection && <AQ10ChildrenForm/>}*/}
                {/*{(checkUserConnection===false ||(isSigneIn && hasDetails===false) ) &&!connectNow&& <div>טוען...</div>}*/}
                {/*{displayLoginError && isSigneIn === false && checkUserConnection && <h4>אחד מפרטי ההתחברות לא נכון :(</h4>}*/}
                {/*// TODO: page for loading*/}

                {isSigneIn && hasDetails && displayLoginError === false &&localStorage.getItem("institute") in dictInstitutes&&
                <HomePage setConnectNow={setConnectNow} dictInstitutes={dictInstitutes} userDetails={{...userDetails.data(),id:userDetails.id}} type={localStorage.getItem("type")} institute={localStorage.getItem("institute")} />}

            </div>
        </Router>

    );
}

export default App;


