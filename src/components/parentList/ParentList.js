import {Button, Form, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "../../firebase";
import firebase from "firebase/compat/app";
import {isClick} from "../../useFunction";

function ParentList({details, setCurrentParent, setParentsListData,setCurrentPage}) {
    const [parents, setParents] = useState([])
    const [current, setCurrent] = useState({id: "", index: ""})
    const [reload, setReload] = useState(true)


    useEffect(async () => {
        const pathSpilt = window.location.pathname.split("/")
        let index=''
        if(pathSpilt.length > 2 && pathSpilt[2] === 'parent'){
            if(pathSpilt.length>3){
                index=pathSpilt[3]
                if (isNaN(parseInt(index))){
                    index='0'
                }
            }
            else{
                index='0'
            }
        }
            if (details.parents.length > 0) {
                const unsubscribe = query(collection(db, "users"),
                    where(firebase.firestore.FieldPath.documentId(), 'in', details.parents)
                )
                getDocs(
                    unsubscribe).then((querySnapshot) => {

                    let data = []
                    querySnapshot.forEach((doc) => {
                        if (doc.id !== auth.currentUser.uid) {
                            data.push({
                                id: doc.id, ...doc.data()
                            })
                        }
                    })
                    setReload(false)
                    setParents(data)
                    setParentsListData(data)
                    if(index!=='' && data.length>parseInt(index)){
                        const dict={id: data[parseInt(index)].id, index: index}
                        setCurrentParent(dict)
                        setCurrent(dict)
                    }
                })
            }

        }
        , [])

    return (
        <div>
            {reload &&  <Row><Form.Label style={{fontWeight: 'bold'}} >????????...</Form.Label></Row>}
            <Row><Form.Label style={{fontWeight: 'bold'}}>?????? ???? ???????? ??????????</Form.Label></Row>
                {parents.map((item, index) => {
                        let data = item

                        return (

                            <Button as={Link} to={'parent' + '/' + index.toString() + '/' }
                                    active={isClick('parent') && current.id === data.id}
                                    className="list-group-item list-group-item-action mb-1"
                                    style={{backgroundColor:'transparent',border:'transparent'}}
                                    id='therapistList-button'
                                  onClick={(e) => {
                                      setCurrentParent({id: data.id, index: index.toString()})
                                      setCurrent({id: data.id, index: index.toString()})
                                      setCurrentPage('parent')

                                  }}>{data.firstName + " " + data.lastName}</Button>
                        )
                    }
                )}
        </div>

    )
}

export default ParentList