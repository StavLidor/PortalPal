import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, doc, setDoc,getDoc ,where,query, getDocs, addDoc,updateDoc,deleteDoc} from "firebase/firestore";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,

    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut,
    updateEmail,updatePassword
} from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";
import firebase from "firebase/compat";

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
        await setDoc(doc(collection_query_users , user.uid), details/*{
            name:details.name,type:details.type,email:details.email,password:details.password,ids:details.ids}*/);
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}


export const addPatient = async details=>{
    // need to check if the patient in the portal

    if ((await getDocs(query(collection_query_patients, where("id", "==", details.id)))).docs.length>0){
        return false
    }
    const q = query(collection_query_users, where("idsMangeParents","array-contains",details.id));
    const querySnapshot = await getDocs(q);
    let id_parents=[]
    // let id_Therapists=[]
    querySnapshot.forEach((doc) => {
        id_parents.push(doc.id)
    });

    await setDoc(doc(collection_query_patients, details.id), {
        id:details.id,
        name:details.name,
        parents:id_parents,
        therapists:[]});
    return true;
}
// export const doc_by_id = async (id,name_path)=>{
//     try {
//         const docRef = doc(db, name_path, id);
//         // const d = await getDoc(docRef);
//         return docRef
//
//     } catch (err) {
//         return null
//     }
// }
export const signIfUserExists = async details=>{
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

export const updatesPatients = async (id,data)=>{
    await updateIDDoc(id, 'patients', data)
    //
}
// this moment current user don't can to add patient
// look that is ok but need to check in ...
export const updatesCurrentUser = async (data,doc)=>{
    if ('email' in data){
        const auth = getAuth();
        updateEmail(auth.currentUser, data.email).then(() => {
            // Email updated!
            // ...
        }).catch((error) => {
            console.log('err updath email')
            console.log('err')
            // An error occurred
            // ...
        });
    }
    if ('password' in data){
        const user = auth.currentUser;
        const newPassword =data.password;
        updatePassword(user, newPassword).then(() => {

            console.log('updath current user suc')
            // Update successful.
        }).catch((error) => {
            console.log('err updath password')
            console.log(error)
            // An error ocurred
            // ...
        });

    }
    await updateDocUser(doc, data)
    await updateIDDoc(auth.currentUser.uid, 'users', data)
    return true;
}
const updateIDDoc  = async (id,name_path,data)=>{
    //await updateDoc(doc(db, name_path, id), data,{marge:true});
    await updateDoc(doc(db, name_path, id.toString()), data);

}
// const addPatientBYKind = async(doc,data,job)=>{
//     if(job in data){
//         const patient_data={[job]:firebase.firestore.FieldValue.arrayUnion(doc.id)}
//         // update one patient doc about job user for him
//         await updateIDDoc(data['idsMange'+job], 'patients', patient_data)
//         data['idsMange'+job] = firebase.firestore.FieldValue.arrayUnion(data['idsMange'+job])
//         console.log(data['idsMange'+job])
//
//     }
//     return data
//
// }
// const dataArray  = async (doc, data)=>{
//     if('idsMangeParents' in data){
//         const patient_data={'parents':firebase.firestore.FieldValue.arrayUnion(doc.id)}
//         await updateIDDoc(data.idsMangeParents, 'patients', patient_data)
//         data.idsMangeParents = firebase.firestore.FieldValue.arrayUnion(data.idsMangeParents)
//
//     }
//     if('idsMangeTherapist' in data){
//         const patient_data={'parents':firebase.firestore.FieldValue.arrayUnion(doc.id)}
//         await updateIDDoc(data.idsMangeTherapist, 'patients', patient_data)
//         data.idsMangeTherapist = firebase.firestore.FieldValue.arrayUnion(data.idsMangeTherapist)
//
//     }
//
// }
export const updateDocUser  = async (doc, data)=>{
    if('idsMangeParents' in data){
        const patient_data={'parents':firebase.firestore.FieldValue.arrayUnion(doc.id)}
        await updateIDDoc(data.idsMangeParents, 'patients', patient_data)
        data.idsMangeParents = firebase.firestore.FieldValue.arrayUnion(data.idsMangeParents)

    }
    if('idsMangeTherapist' in data){
        const patient_data={'parents':firebase.firestore.FieldValue.arrayUnion(doc.id)}
        await updateIDDoc(data.idsMangeTherapist, 'patients', patient_data)
        data.idsMangeTherapist = firebase.firestore.FieldValue.arrayUnion(data.idsMangeTherapist)

    }
    await updateIDDoc(doc.id, 'users', data)

}
export const updateAccordingEmail  = async (email, data)=>{
    const q = query(collection_query_users, where("email","==",email));
    const querySnapshot = await getDocs(q);
    await updateDocUser(querySnapshot.docs[0], data)

    // querySnapshot.forEach((doc) => {
    //     // need to see how to do this.
    //     // its depentes of Permissions
    //     console.log('id for update',doc.id)
    //     if ('email' in data){
    //
    //     }
    //     // its depentes of Permissions
    //     if ('password' in data){
    //
    //     }
    //     // updateDocUser(doc,data)
    //     if('idsMangeParents' in data){
    //         const patient_data={'parents':firebase.firestore.FieldValue.arrayUnion(doc.id)}
    //         updateIDDoc(data.idsMangeParents, 'patients', patient_data)
    //         data.idsMangeParents = firebase.firestore.FieldValue.arrayUnion(data.idsMangeParents)
    //
    //     }
    //     if('idsMangeTherapist' in data){
    //         const patient_data={'parents':firebase.firestore.FieldValue.arrayUnion(doc.id)}
    //         updateIDDoc(data.idsMangeTherapist, 'patients', patient_data)
    //         data.idsMangeTherapist = firebase.firestore.FieldValue.arrayUnion(data.idsMangeTherapist)
    //
    //     }
    //     // if ('idPatient' in data){
    //     //     const patient_data={[job]:firebase.firestore.FieldValue.arrayUnion(doc.id)}
    //     //     updateIDDoc(data.idPatient, 'patients', patient_data)
    //     //     // the data.ids in only one value
    //     //     data.ids = firebase.firestore.FieldValue.arrayUnion(data.idPatient)
    //     //
    //     //
    //     // }
    //
    //     // const washingtonRef = db.collection("cities").doc("DC");
    //     //
    //     // // Atomically add a new region to the "regions" array field.
    //     // washingtonRef.update({
    //     //     regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
    //     // });
    //     //
    //
    //     updateIDDoc(doc.id, 'users', data)
    //
    // });


}
export const signOutFrom = function (){
    signOut(auth).then(function() {
        console.log('signout secc ')
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
        console.log('not signOutFrom')
    });
}
const deleteFrom= async (id,type) =>{
    const q = query(collection_query_users, where(type,"array-contains",id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) => {

        // const washingtonRef = db.collection("users").doc(id.toString());
        const deleteId = firebase.firestore.FieldValue.arrayRemove(id.toString())
        updateIDDoc(doc.id, 'users', {[type]: deleteId,
        })

    });

}
export const deletePatient = async id=>{
    await deleteDoc(doc(db, "patients", id.toString()));
    await deleteFrom(id,'idsMangeTherapist')
    await deleteFrom(id,'idsMangeParents')

}
// export const deleteUser = async id=>{
//     await deleteDoc(doc(db, "users", id.toString()));
//
//     // Atomically remove a region from the "regions" array field.
//     //TODO: the same to Therapist
//     const q = query(collection_query_users, where("Parents","array-contains",id));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach( (doc) => {
//
//         const washingtonRef = db.collection("patients").doc(id.toString());
//         washingtonRef.update({
//             regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
//         });
//
//     });
//
// }
// TODO: delete user and patient
export default {addUser,addPatient,signIfUserExists,updatesCurrentUser,updatesPatients ,signOutFrom,updateAccordingEmail,deletePatient};
