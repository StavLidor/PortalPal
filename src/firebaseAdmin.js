// import { initializeApp,getApp,cert } from 'firebase-admin/app'
import {makePassword} from "./useFunction"
// import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase-admin/firestore"
import {
    getAuth,

} from "firebase-admin/auth"
const { initializeApp } = require('firebase-admin/app');


// // Initialize Firebase
// const app = getApp()
// // if(!app.length){
// const firebaseConfig=initializeApp({
//         credential:cert('./portal-website-db707-firebase-adminsdk-eytw9-a4296028c0.json')
//     })
// // }



const app = initializeApp({
    credential: applicationDefault(),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

// export const auth = getAuth(firebaseConfig);
// export const db = getFirestore()
export const addUserForAdmin = async details=>{
    // getAuth()
    //     .createUser(details)
    //     .then((userRecord) => {
    //         // See the UserRecord reference doc for the contents of userRecord.
    //         console.log('Successfully created new user:', userRecord.uid);
    //     })
    //     .catch((error) => {
    //         console.log('Error creating new user:', error)
    //         return false
    //     })
    // return true
}