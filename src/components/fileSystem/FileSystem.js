import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, matchPath, Route, useNavigate, useLocation, Routes} from "react-router-dom";
import {storage} from "../../firebase";
import { getStorage, ref, uploadBytes,} from "firebase/storage";
import getFirebase from "../../firebase"

function FileSystem({patient, user}){
    const [image , setImage] = useState('');
    // const upload = ()=>{
    //     // const storage = getStorage();
    //     if(image == null)
    //         return;
    //     storage.ref(`images`).child(image.name).put(image)
    //
    // }



    const storage = getStorage();
    // const storageRef = ref(storage, '/' + user.toString() + '/'+patient.toString() );

    //'file' comes from the Blob or File API
    const upload=()=> {
        const storageRef = ref(storage, '/' + user.toString() + '/'+patient.toString() +'/'+ image.name.toString());
        // const storageRef = ref(storage, '/' + 'Stav' + '/'+'Liron' +'/' + image.name.toString());

        uploadBytes(storageRef, image).then((snapshot) => {

        });
    }

    const handleUpload = async (event) => {
        const firebase = getFirebase()
        if (!firebase) return;

        const uploadedFile = event?.target.files[0];
        if (!uploadedFile) return;

        const storage = firebase.storage();
        const storageRef = storage.ref("images");

        try {
            await storageRef.child(uploadedFile.name).put(uploadedFile);
            alert("Successfully uploaded picture!");
        } catch (error) {
        }
    };



    return (
        <div className="App">
            <center>
                <input type="file" onChange={(e)=>{setImage(e.target.files[0])
                }}/>
                <button onClick={upload}>Upload</button>
            </center>
        </div>
    );
}
export default FileSystem