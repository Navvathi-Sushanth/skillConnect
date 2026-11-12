import { useEffect, useRef, useState } from "react";
import ConversationHeader from "../components/ConversationHeader";
import ConversationBox from "../components/ConversationBox";
import LoaderComponent from "../components/LoaderComponent";

export default function ConversationsPage(){

    const [ conversations, setConversations ] = useState([]);
    const loading = useRef(true);

    const getConversations = async ()=>{
        try{

            const token = localStorage.getItem("token");

            console.log(token)

            const response = await fetch(`${import.meta.env.VITE_SOCKET_END_POINT}/api/get-conversations`,{
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