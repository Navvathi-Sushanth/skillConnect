import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MessageComposer from "../components/MessageComposer";
import { useSocket } from "../middleWares/SocketProvider";
import { useRef } from "react";
import LoaderComponent from "../components/LoaderComponent";


export default function DirectMessagePage(){
    const [conversationKey,setConversationKey] = useState(useParams()?.conversationKey);
    const socket = useSocket();
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    const [messages, setMessages] = useState([]);


    const pageRef = useRef(0);
    const hasMessages = useRef(true);
    const loading = useRef(true);

    // const handleScroll = ()=>{
    //     const nearTop = window.scrollY <= 500;
    //     if(nearTop&&!loading.current&&hasMessages.current===true){
    //        initialMessages();
    //     }
    // }

    const initialMessages = async ()=>{
        try {
            if(pageRef.current == 0)
              setMessages([]);
            console.log(conversationKey);
            const response = await fetch(`${import.meta.env.VITE_SOCKET_END_POINT}api/initial-messages?page=${pageRef.current}`, {
                method: "GET",
                
                headers: {
                    token: localStorage.getItem("token"),
                    conversationKey: conversationKey,
                },
            });
            const data = await response.json();
            setMessages(prev=>[...prev, ...data.messages]);
            if(pageRef.current == 0){
                window.scrollTo(0, document.body.scrollHeight);
            }
            pageRef.current=pageRef.current+1;
        }catch(err){
            console.log("Error from the initial messages : " + err);
        }
        finally{
            loading.current = false;
        }
    }

    const handleNewMessage = async (msg)=>{
        setMessages(prev=>[msg, ...prev,]);
    }

    useEffect(() => {

        //window.addEventListener("scroll", handleScroll);

        if (!socket || !conversationKey) return;

        setMessages([]);

        const setupConversation = () => {
            socket.emit("join-conversation", {conversationKey});
            initialMessages();
        };

        socket.on("new-message", handleNewMessage);

        if (socket.connected) {
            setupConversation();
        } else {
            socket.on("connect", setupConversation);
        }

        return () => {
            socket.off("connect", setupConversation);
            socket.off("new-message", handleNewMessage);
            //window.removeEventListener("scroll", handleScroll);
        };

    }, [socket, conversationKey]);


    return (
        <div className="page direct-message-page">
            <MessageComposer conversationKey={
                conversationKey
            }/>
            {
                (loading.current)?
                <LoaderComponent />
                :
                messages.map((msg)=>(
                    <div 
                        className={`message-div ${(msg.sender == userId)? "sender-message" : "receiver-message"}`}
                        key={msg._id}
                        >
                        {msg.message}
                    </div>
                ))
            }
            
        </div>
    )
}