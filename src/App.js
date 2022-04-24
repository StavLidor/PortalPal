import React from 'react';
import "./app.css"
import withDirection, { withDirectionPropTypes, DIRECTIONS } from 'react-with-direction';

import LoginFrom from "./components/login/LoginFrom";
import Chat from "./components/chats/Chat";

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
    // function ForwardsLabel({ direction }) {
  return (

    <div className="App">
        {/*Forwards*/}
        {direction === DIRECTIONS.RTL && <img src="arrow-left.png" />}
        {/*<Secretary signUser={signUser}  new_user={newUser} new_patients={newPatients} variant={false}/>*/}
    {/*<AddMeetingSummaries/>*/}
    {/*    <Chat userUid1="Rahbt7jhvugjFSsnrcnBb5VMfUb2" userUid2="Rahbt7jhvugjFSsnrcnBb5VMfUb2"/>*/}
      <LoginFrom />
    </div>

  );

}
    // ForwardsLabel.propTypes = {
    //     ...withDirectionPropTypes,
    // };
export default App;
// export default withDirection(App);


