import React, {useEffect, useState} from 'react';
// import "./app.css"
import './chat.css'
import {BrowserRouter as Router, Route,} from "react-router-dom";
import {db, signOutCurrentUser} from "./firebase";
import {auth, GetCurrentUser, getDocCurrentUser} from './firebase'
import Authenticate from "./components/login/Authenticate";
import HomePage from "./pages/home/HomePage";
import {doc, getDoc, onSnapshot} from "firebase/firestore";

function App() {
    const [isSigneIn, setIsSigneIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [hasDetails, setHasDetails] = useState(false);
    const [checkUserConnection, setCheckUserConnection] = useState(false);
    const [displayLoginError, setDisplayLoginError] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
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
                        setUserDetails(value)
                        console.log("data user details: ", value.data().childrenIds)
                        setHasDetails(true)
                        if(value.data().titles.includes(localStorage.getItem('type'))){
                            console.log('print hello')
                            setDisplayLoginError(false)
                            setIsFirstLoad(true)
                        }
                        else{
                            signOutCurrentUser()
                            setDisplayLoginError(true)
                            localStorage.setItem("type", "")
                            localStorage.setItem("institute", "")
                        }

                    })
                } catch (err) {
                    return null
                }
            } else {
                localStorage.setItem("type", "")
                localStorage.setItem("institute", "")
                localStorage.setItem("currentPerson", "")
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
        localStorage.setItem("type", type)
        localStorage.setItem("institute", institute)
        setDisplayLoginError(!isSuccessfulSignIn)
    }


    return (

        <Router>
            <div className="App">

                {isSigneIn === false && checkUserConnection && <Authenticate login={login}/>}
                {/*{isSigneIn === false && checkUserConnection && <AQold/>}*/}
                {/*{isSigneIn === false && checkUserConnection && <AQ10ChildrenForm/>}*/}
                {(checkUserConnection===false ||(isSigneIn && hasDetails===false) ) && <div>loading</div>}
                {displayLoginError && isSigneIn === false && checkUserConnection && <h4>אחד מפרטי ההתחברות לא נכון :(</h4>}
                {/*// TODO: page for loading*/}

                {isSigneIn && hasDetails && displayLoginError === false &&
                <HomePage userDetails={{...userDetails.data(),id:userDetails.id}} type={localStorage.getItem("type")} institute={localStorage.getItem("institute")} />}

            </div>
        </Router>

    );
}

export default App;


