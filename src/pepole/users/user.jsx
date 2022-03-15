import {addUser,addPatient,signIfUserExists,updatesCurrentUser,updatesPatients ,signOutFrom,updateAccordingEmail,deletePatient,details_users} from "../../firebase";


export const newUser=async details=>{
    //let arr_ids = details.ids.split(",");

    if (await addUser({
        name: details.name,
        /*type: details.type,*/
        email: details.email,
        password: details.password,
        /*idsMangeParents: arr_ids*,*/
        // idsMangeTherapist: []
        /*ids: arr_ids*/
    })){
        console.log("HI user",details.name.toString(),details.password.toString());
    }
    else{
        console.log('user with this mail exsist')
    }

}
export const signUser = async details=>{
    // later check before if this in Cache
    console.log('d',details);
    const  more_details =  await signIfUserExists(details);
    console.log('more',more_details)
    // more_details.then(function (object){
    //     console.log('not a promise')
    // })
    if( more_details){
        console.log('yesss');
        console.log('more_d',more_details);
        return more_details /*{name:more_details.name,
            email: details.email}*/
    }
    console.log('not found');
    return {name:"",
        email: ""}
}
export const newPatients= async details=>{
    if (await addPatient(details)){
        console.log("HI",details.id,details.name.toString());
    }
    else {
        console.log('patient with this id exsist')
    }
}
export const unSignUser= function (){
    signOutFrom()
}
export default {newUser,signUser,unSignUser,newPatients,details_users}