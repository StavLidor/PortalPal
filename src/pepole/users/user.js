import {
    addPatient,
} from "../../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";


// export const newUser=async details=>{
//     //let arr_ids = details.ids.split(",");
//
//     if (await addUserFromExternalAgent({
//         // name: details.name,
//         // /*type: details.type,*/
//         // email: details.email,
//         // password: details.password,
//         /*idsMangeParents: arr_ids*,*/
//         // idsMangeTherapist: []
//         /*ids: arr_ids*/
//         details
//     })){
//     }
//     else{
//     }
//
// }
// export const signUser = async details=>{
//     try {
//
//         const res = await signInWithEmailAndPassword(auth, details.email, details.password)
//         return true
//     }
//     catch (err){
//         return false
//     }
//
//     // later check before if this in Cache
//     // const  more_details =  await signIfUserExists(details);
//     // // more_details.then(function (object){
//     // // })
//     // if( more_details){
//     //     return more_details /*{name:more_details.name,
//     //         email: details.email}*/
//     // }
//     // return  null/*{name:"",
//     //     email: ""}*/
// }
export const newPatients= async details=>{
    if (await addPatient(details)){
        return details.id
    }
    else {
        return null
    }
}
// export const unSignUser= function (){
//     signOutFrom()
// }
export default {newPatients}