import React from 'react';
import "./app.css"

import LoginFrom from "./components/login/LoginFrom";

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
        {/*<Secretary signUser={signUser}  new_user={newUser} new_patients={newPatients} variant={false}/>*/}
    {/*<AddMeetingSummaries/>*/}
      <LoginFrom />
    </div>

  );
}
export default App;


