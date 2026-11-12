import { useState } from "react";
import { useSocket } from "../middleWares/SocketProvider";
import { useRevalidator } from "react-router-dom";

export default function MessageComposer(props){

    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const {
        conversationKey
    } = props;

    const [ message, setMessage ] = useState("");

    const socket = useSocket();

    const sendMessage = async ()=>{
        try{

            socket.emit("message",{
                conversationKey: conversationKey,
                sender: userId,
                message: message,
            });
            setMessage("");

        }catch(err){
            console.log("Error from the send Message : " + err);
        }
    }

    const messageInputHandler = (e)=>{
        const textarea = e.target;

        setMessage(textarea.value);
        textarea.style.height = "auto";
        
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";

    }
    return (
        <div className="message-composer-div">
            <div className="message-box">
                <textarea
                    autoFocus
                    rows={1} 
                    type="text" 
                    className="messaging-input" 
                    placeholder="Message..."
                    onChange={messageInputHandler}
                    value={message}
                    />
                <button 
                    className="send-message-btn"
                    onClick={sendMessage}
                    >
                    ↗️
                </button>
            </div>
        </div>
    )
}