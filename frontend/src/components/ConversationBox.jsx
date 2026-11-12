import { useNavigate } from "react-router-dom";
import "./components.css"

export default function ConversationBox(props){

    const navigate = useNavigate();
    const {
        conversationKey,
        lastMessageTime,
    } = props.conversationDetails;

    const {
        userName,
        userProfileImg
    } = props.conversationDetails.otherUser;

    const formattedTime = new Date(lastMessageTime)
        .toLocaleDateString("en-IN",{
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })
    return (
        <div 
            className="conversation-box"
            onClick={()=>{
                navigate(`./${conversationKey}`);
            }}
            >
            <div className="conversation-img-div">
                <img src={userProfileImg} alt = "userProfileImg" className="conversation-img"/>
            </div>
            <div className="conversation-details">
                <h3>{userName}</h3>
                <p className="p-text">last message at : {formattedTime}</p>
            </div>
        </div>
    )
}