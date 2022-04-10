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
    updateEmail,updatePassword, sendSignInLinkToEmail,sendEmailVerification
} from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
// import firebase from "firebase/compat";
import makePassword from "./useFunction"

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
const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:3000',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
};
const sentToEmail=details=>{

    sendSignInLinkToEmail(auth, details.email, actionCodeSettings)
    .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem( 'ברוך הבא לפורטל'+details.name+'היי ', details.email);
        // ...
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });

}
export const resetPassword=email=>{
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            console.log('Reset password')
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

}
export const addUser = async details=>{
    try {
        //sentToEmail(details)
        const res = await createUserWithEmailAndPassword(auth, details.email, details.password)


        const user = res.user
        await sendEmailVerification(auth.currentUser/*,actionCodeSettings*/)
            .then(() => {
                // Email verification sent!
                // ...
                console.log('sent the email now')
            })
        console.log('before set doc of',user.uid)
        await auth.signOut()
        await setDoc(doc(collection_query_users , user.uid), details/*{
            name:details.name,type:details.type,email:details.email,password:details.password,ids:details.ids}*/);
        // Maybe just to a new Therapist?
        console.log('after set doc of',user.uid)



        return user.uid;
    } catch (err) {
        console.log(err)
        console.log("Email error",details.email)
        await auth.signOut()
        return null
    }

}
export const addUserFromAdmin= async (details,emailCurrent,passwordCurrent,nameFiled)=>{
    const uid_user=await addUser(Object.assign({},{password: makePassword(7)},details))
    await signIfUserExists({email:emailCurrent,
        password:passwordCurrent}).then((d)=>{
            if(d!=null){
                const p=Promise.resolve(uid_user)

                p.then(async id => {

                    await updatesCurrentUser({[nameFiled]:id})
                })
            }
    })

    return uid_user

}


const ifPatientExists = async id=>{
    const d= (await getDocs(query(collection_query_patients, where("id", "==", id)))).docs
    if (d.length>0){
        return d[0].data()
    }
    return null

}
export const  detailsWorks= async arr_id =>{
    // console.log(arr_id)
    let arr_data =[]


    for (const id of arr_id) {
        // console.log(id)
        try {
            let docRef = doc(db, "users", id);
            let d =  await getDoc(docRef);
            // maybe add the job
            arr_data.push({...d.data(),id:id})
        }
        catch (err){
            console.log('err in ',detailsWorks)

        }


        // console.log(d.data())


    }
    //console.log('ALL',arr_data)
    return arr_data
}



export const  detailsPatient= async arr_id =>{
    // console.log(arr_id)
    let arr_data =[]


    for (const c of arr_id) {
        // console.log(id)
        try {
            let id=""
            if(typeof(c) == 'string'){
                id= c
            }
            else {
                id= c. id
            }
            let docRef = doc(db, "patients", id);
            let d =  await getDoc(docRef);
            // maybe add the job
            arr_data.push(d.data()/*Object.assign({},d.data(),{jobs:c.jobs})*/)
        }
        catch (err){

        }


        // console.log(d.data())


    }
    //console.log('ALL',arr_data)
    return arr_data
}
export const allDetailsMeetings = async (id)=>{
    console.log('allDetailsMeetings')
    const q= query(collection(db,"summaries"), where("therapist", '==',auth.currentUser.uid));
    // const q=query(q1,where("client", '==',id))
    console.log('allDetailsMeetings222')
    const querySnapshot = await getDocs(q);
    const arr =[]
    querySnapshot.forEach( (doc) => {
        if (doc.data().client === id){
            arr.push(doc.data())
            console.log('id',doc.id)
        }



    });
    console.log(arr)
    return arr

}
export const addPatient = async details=>{
    // need to check if the patient in the portal
    try {
        console.log('add a patient')

        // maybe in this case tableEdit details? add more institute?
        if ((await getDocs(query(collection_query_patients, where("id", "==", details.id)))).docs.length>0){
            return false
        }


        const uid_user=await addUser({firstName:details.firstNameParent,lastName:details.lastNameParent,email: details.email, password: makePassword(7),idsMangeParents:[details.id],/*idSecretary:details.idSecretary*/})
        // need to think what to do beacuse is connect from secretry
        //console.log(auth.currentUser.uid)
        // need to think what to do beacuse is connect from secretry
        // signOutFrom()
        await signIfUserExists({email:details.emailCurrent,
            password:details.passwordCurrent})
        ///////////////////////////////////////////////////////
        //console.log(auth.currentUser.uid)
        if (!uid_user){
            //console.log('user exist parent')
            await updateAccordingEmail(details.email, {idsMangeParents: details.id.toString()})

        }
        //
        // else{
        //     signOutFrom()
        //
        // }
        await updatesCurrentUser(/*details.idSecretary,*/{students_arr:
                details.id.toString()})

        //console.log('2222244')
        const q = query(collection_query_users, where("idsMangeParents","array-contains",details.id));
        const querySnapshot = await getDocs(q);
        let id_parents=[]
        // let id_Therapists=[]
        querySnapshot.forEach((doc) => {
            id_parents.push(doc.id)
        });
        //console.log('institutionNumber nnn ',details.institutionNumber)
        await setDoc(doc(collection_query_patients, details.id), {
            id:details.id,
            dateOfBirth:details.dateOfBirth,
            firstName:details.firstName,
            lastName:details.lastName,
            city:details.city,
            street:details.street,
            buildingNumber:details.buildingNumber,
            parents:id_parents,
            therapistsOutside:[],
            institutes:{[details.institutionNumber]:[]}
            /*idSecretary:[details.idSecretary]*/
        });
        console.log('Add a patinet',details.id)
        return details.id


    } catch (e) {
        return null
    }

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
        //console.log( res.user.uid)
        const docRef = doc(db, "users", res.user.uid);
        const d = await getDoc(docRef);
        // need to add details that need
        return  d/*[d.id,d.data()]*/ /*{name:d.data().name}*/

    } catch (err) {
        return null
    }
}

// TODO: tableEdit user and patient(change one of the details,delete from therapist a patient)

export const updatesPatients = async (id,data)=>{
    if(await updateIDDoc(id, 'patients', data))
        return true
    return false
    //
}
export const updatesUser = async (id,data)=>{
    return await updateIDDoc(id, 'users', data)
    //
}
// this moment current user don't can to add patient
// look that is ok but need to check in ...
export const updatesCurrentUser = async (data)=>{
    if ('email' in data){
        const auth = getAuth();
        updateEmail(auth.currentUser, data.email).then(() => {
            // Email updated!
            // ...
        }).catch((error) => {
            console.log('err updath email')
            console.log(error)
            return false
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
            return false
            // An error ocurred
            // ...
        });

    }
    if(!await updateDocUser(auth.currentUser.uid, data))
        return false
    // await updateIDDoc(auth.currentUser.uid, 'users', data)
    return true;
}
export const deleteCurrentUser = async (type,idRemove)=>{
    await deleteFrom(auth.currentUser.uid,type,idRemove,"array-contains")

}
// only exist doc
export const updateIDDoc  = async (id,name_path,data)=>{
    //await updateDoc(doc(db, name_path, id), data,{marge:true});
    //auth.currentUser.uid
    try {
        await updateDoc(doc(db, name_path, id.toString()), data)
        return true
    } catch (err){
        console.log(err)
        return false
    }


}
export const setIDDoc  = async (id,name_path,data)=>{
    //await updateDoc(doc(db, name_path, id), data,{marge:true});
    //auth.currentUser.uid
    await setDoc(doc(db, name_path, id.toString()), data);

}
export const filedAdd  = async (data,nameFiled1,nameFiled2,id,idAdd,f)=>{
    if(nameFiled1 in data){
        const d =await ifPatientExists(idAdd)
        if(d){
            if(f!== undefined &&!f(d))
                return null
            const patient_data={[nameFiled2]:firebase.firestore.FieldValue.arrayUnion(id)}
            if(!await updateIDDoc(idAdd, 'patients', patient_data))
                return null
            data[nameFiled1]=firebase.firestore.FieldValue.arrayUnion(idAdd)
            return d
        }
        return null


    }



}
export  const  removeConnectionPatientToTherapist = async (id,idRemove,institutionNumber)=>{
    // remove for patient
    const filed = "institutes."+institutionNumber
    const removeTherapist ={[filed]:firebase.firestore.FieldValue.arrayRemove(id)}
    if(!await updateIDDoc(idRemove, 'patients', removeTherapist))
        return false
    const data = {[filed]:firebase.firestore.FieldValue.arrayRemove(idRemove)}
    if(await updateIDDoc(id, 'users', data))
        return true
    return false
}
export  const addConnectionPatientToTherapist = async (id,idAdd,institutionNumber)=>{
    const filedName ="institutes."+institutionNumber
    const data ={[filedName]:idAdd}
    const d = await filedAdd(data, filedName, filedName, id, idAdd,
        (da)=>{
        console.log('oooooooo',da)
        if(institutionNumber in da.institutes)
            return true
        return false
        })
    if(!d){
        return null
    }

    if(await updateIDDoc(id, 'users', data))
        return d
    return null
}
// export  const updateDocUserWithArrayFiled =async (id,idAdd,filedName,data)=>{
//     if(!await filedAdd(data, filedName, filedName, id, idAdd))
//         return null
//     await updateDocUser(id, data)
//
// }
export const updateDocUser  = async (id,data)=>{
    // for (const [key, value] of Object.entries(data)) {
    //     //console.log(key, value);
    // }

    if('idsMangeParents' in data){
        //console.log('in idsMangeParents')
        if (await ifPatientExists(data.idsMangeParents)){
            const patient_data={'parents':firebase.firestore.FieldValue.arrayUnion(id)}
            if(!await updateIDDoc(data.idsMangeParents, 'patients', patient_data))
                return false
        }
        else {
            return false
        }

        data.idsMangeParents = firebase.firestore.FieldValue.arrayUnion(data.idsMangeParents)

    }
    if('idsMangeTherapist' in data){
        if (await ifPatientExists(data.idsMangeTherapist)){
            const patient_data={'parents':firebase.firestore.FieldValue.arrayUnion(id)}
            if(!await updateIDDoc(data.idsMangeTherapist, 'patients', patient_data))
                return false
        }
        else {
            return false
        }
        data.idsMangeTherapist = firebase.firestore.FieldValue.arrayUnion(data.idsMangeTherapist)

    }
    if('students_arr' in data){
        if (await ifPatientExists(data.students_arr)){
            const patient_data={'admin':firebase.firestore.FieldValue.arrayUnion(id)}
            if(!await updateIDDoc(data.students_arr, 'patients', patient_data))
                return false
        }
        else {
            return false
        }
        data.students_arr= firebase.firestore.FieldValue.arrayUnion(data.students_arr)

    }
    if('works' in data){
        data.works= firebase.firestore.FieldValue.arrayUnion(data.works)

    }
    if('meetings' in data){

        data.meetings= firebase.firestore.FieldValue.arrayUnion(data.meetings)

    }
    // console.log('before tableEdit doc')
    // console.log('id',id)
    if(await updateIDDoc(id, 'users', data))
        return  true
    return  false

}
export const findUserByEmail=async (email)=>{

    const q = query(collection_query_users, where("email","==",email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length>0){
        return querySnapshot.docs[0].id
    }
}
export const updateAccordingEmail  = async (email, data)=>{
    //console.log('in tableEdit by email')
    // const q = query(collection_query_users, where("email","==",email));
    // //console.log('find email')
    // const querySnapshot = await getDocs(q);
    // //console.log('find doc')
    // if (querySnapshot.docs.length>0)
    await updateDocUser(await findUserByEmail(email), data)


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
const deleteFrom= async (ob,type,removeFrom,opStr) => {
    try {
        const q = query(collection_query_users, where(type, opStr, ob));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log('id', doc.id)
            if (doc.id == removeFrom) {
                // const washingtonRef = db.collection("users").doc(id.toString());
                console.log(ob)

                const deleteId = firebase.firestore.FieldValue.arrayRemove(ob)

                if (!updateIDDoc(doc.id, 'users', {
                    [type]: deleteId,
                })) {
                    return false
                }


            }


        })
        return true

    } catch (err) {
        console.log(err)
        return false

    }
}
export const deleteDocFrom = async (id,type)=>{
     await deleteDoc(doc(db, type, id.toString()))

}
export const deletePatientFromInstitute = async (institute,removeOb,id)=>{
    // await deleteDoc(doc(db, "patients", id.toString()));
    console.log('remove from',removeOb)
    try {
        if(!await deleteFrom(removeOb,'students_arr',id,"array-contains"))
            return false

        const patient_data={['institutes.'+ institute]:firebase.firestore.FieldValue.delete()}
        if(!await updateIDDoc(/*removeOb.id*/removeOb, 'patients', patient_data))
            return false

        return true
    }
    catch (err){
        return false
    }

}
export const deleteTherapistFromInstitute = async (institute,removeId,id)=>{
    // await deleteDoc(doc(db, "patients", id.toString()));
    console.log('remove from',removeId)
    if(!await deleteFrom(removeId,'works',id,"array-contains")){
        return false
    }
    const deleteInstitute = {['institutes.'+ institute]:firebase.firestore.FieldValue.delete()}/*{institutes:firebase.firestore.FieldValue.arrayRemove(institute)}*/
    if(!await updateIDDoc(removeId, 'users', deleteInstitute)){
        return false
    }
    return true

}
//TODO: to check how remove user and when

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
//         washingtonRef.tableEdit({
//             regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
//         });
//
//     });
//
// }

export default {addUser,addPatient,signIfUserExists,updatesCurrentUser,updatesPatients ,signOutFrom,updateAccordingEmail, deletePatientFromInstitute,detailsPatient,updateIDDoc,deleteDocFrom,
    deleteCurrentUser,allDetailsMeetings,addUserFromAdmin};
