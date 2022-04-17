import "./chat.css"
import react,{useEffect,useState,useRef} from "react";
import firebase from "firebase/compat/app"
import {auth, db, getDocCurrentUser,} from "../../firebase";
import {collection, query, where, addDoc, Timestamp, orderBy, limit, onSnapshot, getDocs} from "firebase/firestore";
import Message from "./message";
export default function Chat({userUid1=null,userUid2=null}){
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')
    const [click,setClick]=useState(true)
    const handleOnChange = e =>{
        setNewMessage(e.target.value)

    }
    useEffect(async () => {
        const unsubscribe = query(collection(db, "messages"), where("senderAndReceiver", 'in',
            [{receiver: userUid1, sender: userUid2},
                {sender: userUid2, receiver: userUid1}]),orderBy("createdAt", "desc"), limit(100),

        )
        console.log('blb')
        const querySnapshot = await getDocs(unsubscribe)
        let data=[]
        querySnapshot.forEach((doc) => (
            // console.log(doc)

               data.push({...doc.data(),id:doc.id})

        ))

        console.log('data',data)
        setMessages(data)
        return unsubscribe


    },[click])
    const handleOnSubmit = async e => {
        e.preventDefault()
        setClick(!click)
        if(newMessage.trim()){
            const docRef = await addDoc(collection(db, "messages"), {
                text:newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                senderAndReceiver:{sender:userUid1,receiver:userUid2}
            })
            setNewMessage('')
        }


    }
    return(
        <>
        <ul>
            {messages.map(message=>(
                <li key ={message.id}>
                    <Message createdAt={message.createdAt} text={message.text}
                             sender={message.senderAndReceiver.sender}/>
                </li>
            ))}
        </ul>
        <form onSubmit={handleOnSubmit}>
            <input type='text' value={newMessage} onChange={handleOnChange}
                   placeholder='הודעה'
            />
            <button type="submit" disabled={!newMessage}>
                שלח
            </button>

        </form>
            </>
    )


}