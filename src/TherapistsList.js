import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState,useRef, useCallback, useContext} from "react";
import {Link, Route, Routes, useLinkClickHandler} from "react-router-dom";
import {getDate} from "date-fns";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {auth, db} from "./firebase";
import firebase from "firebase/compat/app";
import styles from "./pages/home/HomePage.CSS"
import {isClick} from "./useFunction";

function TherapistsList({
                            details,
                            setCurrentTherapist,
                            currentPage,setCurrentPage,
                            setActiveTherapistListData,
                            setNotActiveTherapistListData,
                            currentPerson,
                            type,
                            institute
                        }) {
    console.log("in therapist!!!!!!!!")
    const [activeTherapistsList, setActiveTherapistsList] = useState([])
    const [notActiveTherapistsList, setNotActiveTherapistList] = useState([])
    const [current, setCurrent] = useState({id: "", index: "",active:true})
    const [reload, setReload] = useState(true)
    const [clickId,setClickId]=useState('')
    const componentRefActive = useRef()
    const componentRefNotActive = useRef()

    console.log('therapistLIstt')
    //console.log(talkersIds)
    useEffect(async () => {

        console.log('TYPEE', type)
        const pathSpilt = window.location.pathname.split("/")
        let index = ''
        let active=true
        let isNotChose=false
        if(pathSpilt.length > 2 && pathSpilt[2] === 'therapist'){
            console.log('PathSpilt therapist',pathSpilt)
            index='0'
            if(type === 'therapist' && pathSpilt.length>3){
                index=pathSpilt[3]
                if (isNaN(parseInt(index))){
                    index='0'
                }
            }
            else if(type === 'parent' &&pathSpilt.length>4){
                index= pathSpilt[4]
                if (isNaN(parseInt(index))){
                    index='0'
                }
                if(pathSpilt[3]==='notActive'){
                    active=false
                }
            }
            else if(type === 'parent' && pathSpilt.length===3){
                isNotChose=true
            }
             setCurrent({id:'',index:index,active: active})
           console.log('Therapist page',{id:'',index:index,active: active})
        }

        if (type === 'parent') {
            if(pathSpilt.length===3&&currentPage!==''&&currentPage!=='therapist'){
                console.log('YESS')
                index='0'
                isNotChose=true
            }
            console.log('Therapist page',current)
            const collectionRef = query(collection(db, "patients/" + details.id + "/therapists"),
                where('institute', '==', institute))
            if (institute === 'external') {
                onSnapshot(
                    collectionRef,
                    (snapshot) => {
                        console.log('INNNNN', snapshot.docs[0])
                        getData(snapshot)

                    })
            } else {
                getDocs(collectionRef).then((d) => {
                    getData(d,{id:'',index:index,active: active,isNotChose:isNotChose})
                })
            }
        } else {
            const collectionRef = query(collection(db, "patients/" + details.id + "/therapists"))

            // const querySnapshot = await getDocs(docRef)

            getDocs(collectionRef).then((d) => {
                getData(d,{id:'',index:index,active: active,isNotChose:isNotChose})
            })
        }

    }, [])
    const getData = (d,mapCurrent) => {
        const therapistIds = []
        let dict = {}

        d.forEach((doc) => {
            if (doc.id !== auth.currentUser.uid) {
                // console.log('therapistLIstt',doc.data())
                if ((type === "therapist" && doc.data().active) || type === "parent") {
                    therapistIds.push(doc.id)
                    dict[doc.id] = {
                        institute: doc.data().institute, connection: doc.data().connection,
                        active: doc.data().active
                    }
                }

            }
        });
        console.log("therapistIds: ", therapistIds)
        console.log("therapistIds.length: ", therapistIds.length)

        if (therapistIds.length > 0) {
            const unsubscribe = query(collection(db, "users"),
                where(firebase.firestore.FieldPath.documentId(), 'in', therapistIds)
            )
            getDocs(
                unsubscribe).then((querySnapshot) => {

                let activeTherapists = []
                let notActiveTherapists = []
                querySnapshot.forEach((doc) => {
                    if (dict[doc.id].active)
                        // console.log(doc)
                    {
                        activeTherapists.push({
                            id: doc.id,
                            firstName: doc.data().firstName, lastName: doc.data().lastName,
                            institute: dict[doc.id].institute, connection: dict[doc.id].connection,

                            // active: (() => {
                            //     if (dict[doc.id].active)
                            //         return 'פעיל'
                            //     return 'לא פעיל'
                            // })()
                        })
                    } else {
                        notActiveTherapists.push({
                            id: doc.id,
                            firstName: doc.data().firstName, lastName: doc.data().lastName,
                            institute: dict[doc.id].institute, connection: dict[doc.id].connection,
                            // active: (() => {
                            //     if (dict[doc.id].active)
                            //         return 'פעיל'
                            //     return 'לא פעיל'
                            // })()
                        })
                    }
                    // console.log()
                })
                setReload(false)
                setActiveTherapistsList(activeTherapists)
                console.log("activeTherapists", activeTherapists,mapCurrent)
                setActiveTherapistListData(activeTherapists)
                setNotActiveTherapistList(notActiveTherapists)
                setNotActiveTherapistListData(notActiveTherapists)
                //let flagID=''
                if(mapCurrent.index!=='' && activeTherapists.length>parseInt(mapCurrent.index) && mapCurrent.active){
                    console.log('Therapist page WWW')
                    const index = parseInt(mapCurrent.index)
                    setCurrent({index:mapCurrent.index,id:activeTherapists[index].id,
                    active: true})
                    setCurrentTherapist({index:mapCurrent.index,id:activeTherapists[index].id,active:true})
                    if( mapCurrent.isNotChose){
                        componentRefActive.current.click()
                    }
                    //flagID=activeTherapists[index].id

                }
                else if(mapCurrent.index!=='' && notActiveTherapists.length>parseInt(mapCurrent.index) &&(!mapCurrent.active||
                    parseInt(mapCurrent.index)===0)){
                    const index = parseInt(mapCurrent.index)
                    setCurrent({index:mapCurrent.index,id:notActiveTherapists[index].id,
                        active: false})
                    setCurrentTherapist({index:mapCurrent.index,id:notActiveTherapists[index].id,active:false})
                    //flagID=notActiveTherapists[index].id
                    if( mapCurrent.isNotChose){
                        componentRefNotActive.current.click()
                    }
                }
                // if(type === 'parent'&& flagID!=='' && mapCurrent.isNotChose){
                //
                //     console.log('CCCCCCCCCCClick',flagID)
                //
                //     setClickId(flagID)
                // }

            })
        }

    }
    const showList = (list, isActive) => {
        let path = ''
        let showInstitute = ''

        return (



            list.map((item, index) => {
                let data = item
                if (type === 'parent') {
                    if(currentPage!=='therapist' &&(
                        currentPage==='sessions' ||
                        currentPage==='exercises' ||currentPage==='communication'
                    )){
                        path ='therapist'+ '/'+ isActive.toString() + '/' + index.toString() + '/' + currentPage.toString();
                    }
                    else {
                        path ='therapist'+ '/'+ isActive.toString() + '/' + index.toString()
                    }

                } else {
                    path = 'therapist'+ '/'+index.toString() //+ '/' + currentPage.toString()

                    showInstitute = ', ' + institute
                }
                return (
                    <div>

                        <Button id='therapistList-button' as={Link} to={path}  ref={(()=>{
                            if(index ===0 &&isActive === 'active' ){
                                return componentRefActive
                            }
                            else if(index ===0 &&isActive !== 'active'){
                                return componentRefNotActive
                            }
                            return null
                        })()}
                                active={
                            /*isClick(path)*/
                            current.id === data.id && isClick('therapist')
                        }
                                style={{backgroundColor:'transparent',border:'transparent'}}
                                 className="list-group-item list-group-item-action mb-1" onClick={(e) => {
                            // e.preventDefault()
                            if(type === 'therapist'){
                                setCurrentPage('therapist')
                            }
                            else{
                                if(currentPage!=='sessions' &&
                                    currentPage!=='exercises' &&currentPage!=='communication'){
                                    setCurrentPage('therapist')
                                }
                            }

                            setCurrentTherapist({id: data.id, index: index.toString(),active: isActive === 'active'})
                            setCurrent( {id: data.id, index: index.toString(),active: isActive === 'active'})


                        }}>{data.firstName + " " + data.lastName + ','}<br/>{data.connection + showInstitute}</Button>
                        {/*<Link to={path}*/}
                        {/*      className="list-group-item list-group-item-action" style={{fontSize: 14}}*/}
                        {/*      onClick={(e) => {*/}
                        {/*          // e.preventDefault()*/}
                        {/*          // setCurrentPerson(data.id.toString())*/}

                        {/*          setCurrentTherapist({id: data.id, index: index.toString()})*/}

                        {/*      }}>{data.firstName + " " + data.lastName + ','}<br/>{data.connection + showInstitute}*/}
                        {/*</Link>*/}
                    </div>
                )
            }))
    }
    return (
        <div>
            {reload &&  <Row><Form.Label style={{fontWeight: 'bold'}} >טוען...</Form.Label></Row>}
            {type === 'therapist' &&<Form.Label style={{fontWeight: 'bold'}}>צאט עם מטפלים אחרים</Form.Label>}
            <div>
            {type === 'parent' && <Form.Label  style={{fontWeight: 'bold'}}>מטפלים פעילים:</Form.Label>}
            </div>

            <div>
            {activeTherapistsList.length > 0 && showList(activeTherapistsList, 'active')}
            </div>
            {type === 'parent' && <Form.Label style={{fontWeight: 'bold'}} >מטפלים לא פעילים:</Form.Label>}
            {notActiveTherapistsList.length > 0 && showList(notActiveTherapistsList, 'notActive')}
        </div>

    )
}

export default TherapistsList