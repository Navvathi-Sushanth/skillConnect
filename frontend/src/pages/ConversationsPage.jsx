import { useEffect, useRef, useState } from "react";
import ConversationHeader from "../components/ConversationHeader";
import ConversationBox from "../components/ConversationBox";
import LoaderComponent from "../components/LoaderComponent";
import { useSocket } from "../middleWares/SocketProvider";
import newMessageToast from "../utils/toast"

export default function ConversationsPage(){

    const [ conversations, setConversations ] = useState([]);
    const loading = useRef(true);

    const socket = useSocket();

    const getConversations = async ()=>{
        try{

            const token = localStorage.getItem("token");

            console.log(token)

            const response = await fetch(`${import.meta.env.VITE_SOCKET_END_POINT}api/get-conversations`,{
                method : 'GET',
                headers : {
                    token: token,
                }
            });

            const data = await response.json();

            setConversations(data.conversations);

        }catch(err){
            console.log("Error form the conversation page : " + err);
        }
        finally{
            loading.current = false;
        }
    }

    useEffect(()=>{

        if(!socket){
            return ;
        }

        socket.on("new-message",(data)=>{
            newMessageToast(data);
        })

        return ()=>{
            socket.off("new-message");
        }

    },[socket]);


    useEffect(()=>{

        getConversations()

    },[]);
    return(
        <div className="conversations-page page">
            <ConversationHeader />
            {

                (loading.current)?
                    <LoaderComponent />
                :
                    conversations.map((conversationDetails)=><ConversationBox conversationDetails = {conversationDetails}/>)
            }
        </div>
    )
}