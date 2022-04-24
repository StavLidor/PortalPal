import {
    addUser,
    addPatient,
    signIfUserExists,
    updatesCurrentUser,
    updatesPatients,
    signOutFrom,
    updateAccordingEmail,
    deletePatient,
    detailsPatient,
    auth
} from "../../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";


export const newUser=async details=>{
    //let arr_ids = details.ids.split(",");

    if (await addUser({
        // name: details.name,
        // /*type: details.type,*/
        // email: details.email,
        // password: details.password,
        /*idsMangeParents: arr_ids*,*/
        // idsMangeTherapist: []
        /*ids: arr_ids*/
        details
    })){
        console.log("HI user",details.name.toString(),details.password.toString());
    }
    else{
        console.log('user with this mail exsist')
    }

}
export const signUser = async details=>{
    try {
        const res = await signInWithEmailAndPassword(auth, details.email, details.password)
        return true
    }
    catch (err){
        console.log(err)
        return false
    }

    // later check before if this in Cache
    // console.log('d',details);
    // const  more_details =  await signIfUserExists(details);
    // console.log('more',more_details)
    // // more_details.then(function (object){
    // //     console.log('not a promise')
    // // })
    // if( more_details){
    //     console.log('yesss');
    //     console.log('more_d',more_details);
    //     return more_details /*{name:more_details.name,
    //         email: details.email}*/
    // }
    // console.log('not found');
    // return  null/*{name:"",
    //     email: ""}*/
}
export const newPatients= async details=>{
    if (await addPatient(details)){
//         console.log("HI",details.id,details.name.toString());
        return details.id
    }
    else {
        console.log('patient with this id exsist')
        return null
    }
}
export const unSignUser= function (){
    signOutFrom()
}
export default {newUser,signUser,unSignUser,newPatients,detailsPatient}