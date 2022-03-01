import React from 'react';
import "./app.css"
import Secretary from "./pages/secretary/Secretary";
import {newUser,findUser,newPatients} from './pepole/users/user'

function App() {
    // function getInstitutes() {
    //     setLoading(true);
    //     // const querySnapshot = await getDocs(collection(db, "users"));
    //     // querySnapshot.forEach((doc) => {
    //     //     console.log(`${doc.id} => ${doc.data()}`);
    //     // });
    //     onSnapshot(collection_query,(querySnapshot)=>{
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    //         setInstitutes(items);
    //     setLoading(false);
    //     })
    // }

    // useEffect(()=> {
    //     getInstitutes();
    // }, []);

    // if (loading){
    //     return <h1>Loading...</h1>
    // }
  return (

    <div className="App">
        <Secretary findUser={findUser}  new_user={newUser} new_patients={newPatients}/>
    </div>

  );
}
export default App;


