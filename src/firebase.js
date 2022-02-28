import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, doc, setDoc,getDoc ,where,query, getDocs, addDoc} from "firebase/firestore";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCszwP0WK5xg5HYtaz5efKrQ5AYen8BnHA",
    authDomain: "portal-website-db707.firebaseapp.com",
    projectId: "portal-website-db707",
    storageBucket: "portal-website-db707.appspot.com",
    messagingSenderId: "1028746257758",
    appId: "1:1028746257758:web:cf5ebe0124dc12f5499bcf",
    measurementId: "G-RLJD2L3NRQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore();
const collection_query_users = collection(db,"users");
const collection_query_patients = collection(db,"patients");
export const addUser = async details=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, details.email, details.password);
        const user = res.user;
        await setDoc(doc(collection_query_users , user.uid), {
            name:details.name,type:details.type,email:details.email,password:details.password,ids:details.ids});
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}
// const doesDocExist = (collection,docID) => {
//     return collection.doc(docID).get().then((doc) => {
//         return doc.exists
//     })
// }
export const addPatient = async details=>{
    // need to check if the patient in the portal

    if ((await getDocs(query(collection_query_patients, where("id", "==", details.id)))).docs.length>0){
        return false
    }

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
        id:details.id,
        name:details.name,
        parents:id_parents,
        therapists:id_Therapists});
    return true;
}
export const ifUserExists = async details=>{
    try {
        const res = await signInWithEmailAndPassword(auth, details.email, details.password);
        console.log( res.user.uid)
        const docRef = doc(db, "users", res.user.uid);
        const d = await getDoc(docRef);
        // need to add details that need
        return {name:d.data().name}

    } catch (err) {
        return null
    }
}
// TODO: update user and patient(change one of the details,delete from therapist a patient)
// TODO: delete user and patient
export default {addUser,addPatient,ifUserExists};
