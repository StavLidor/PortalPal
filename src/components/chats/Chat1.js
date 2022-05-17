import {ChatEngine} from 'react-chat-engine'
// import "./chat.css"
import react,{useEffect,useState,useRef} from "react";
import firebase from "firebase/compat/app"
// import {auth, db, getDocCurrentUser,} from "../../firebase";
import {collection, query, where,addDoc,Timestamp} from "firebase/firestore";
import Message from "./message";
export default function Chat1({userUid1=null,userUid2=null,db=null}){
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')
    const inputRef= useRef()
    const bottomListRef=useRef()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef])
    const unsubscribe = query(collection(db,"messages"), where("senderAndReceiver", 'in',
        [{sender:userUid1,receiver:userUid2},
            {sender:userUid2,receiver:userUid1}])).orderBy('createAt').limit(100).onSnapshot(querySnapshot=>{
        const data = querySnapshot.docs.map(doc=>(
            {
                ...doc.data(),
                id:doc.id
            }))
        //Update state
        setMessages(data)
    })
    // useEffect(()=>{
    //     if(db){
    //         const unsubscribe = query(collection(db,"messages"), where("senderAndReceiver", 'in',
    //             [{sender:userUid1,receiver:userUid2},
    //                 {sender:userUid2,receiver:userUid1}])).orderBy('createAt').limit(100).onSnapshot(querySnapshot=>{
    //             const data = querySnapshot.docs.map(doc=>(
    //                 {
    //                 ...doc.data(),
    //                 id:doc.id
    //             }))
    //             //Update state
    //             setMessages(data)
    //         })
    //     }
    // },[])
    const handleOnChange = e =>{
        setNewMessage(e.target.value)

    }
    const handleOnSubmit = async e => {
        e.preventDefault()
        if(newMessage.trim()){
            const docRef = await addDoc(collection(db, "messages"), {
                text:newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                senderAndReceiver:{sender:userUid1,receiver:userUid2}
            })
            setNewMessage('')
            bottomListRef.current.scrollIntoView({ behavior: 'smooth' })
        }


    }
    return(
        <div className="flex flex-col h-full">
            <div className="overflow-auto h-full">
                <div className="py-4 max-w-screen-lg mx-auto">
                    <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
                        <div className="font-bold text-3xl text-center">
                            <p className="mb-1">Welcome to</p>
                            <p className="mb-3">React FireChat</p>
                        </div>
                        <p className="text-gray-400 text-center">
                            This is the beginning of this chat.
                        </p>
                    </div>
                    <ul>
                        {messages
                            ?.sort((first, second) =>
                                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
                            )
                            ?.map(message => (
                                <li key={message.id}>
                                    <Message {...message} />
                                </li>
                            ))}
                    </ul>
                    <div ref={bottomListRef} />
                </div>
            </div>
            <div className="mb-6 mx-4">
                <form
                    onSubmit={handleOnSubmit}
                    className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={handleOnChange}
                        placeholder="Type your message here..."
                        className="flex-1 bg-transparent outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage}
                        className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )

}