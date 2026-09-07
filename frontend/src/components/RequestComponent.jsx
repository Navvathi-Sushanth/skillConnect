import "./components.css"
import img from "../images/dp.jpg";
import { useState } from "react";

export default function RequestComponent(props){

    const receiverId = props.requestDetails.receiver;
    const [ acceptStatus, setAcceptStatus ] = useState("Accept");
    const [ declineStatus, setDeclineStatus ] = useState("Decline");

    const {
        _id: senderId,
        userName,
        userEmail,
        userProfileImg
    } = props.requestDetails.sender;

    const requestResponse = async (reqResponse)=>{

        try{

            const response = await fetch("http://localhost:3000/api/user/request-response",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    senderId : senderId,
                    receiverId : receiverId,
                    response: reqResponse,
                })
            })

        }catch(err){
            console.log("Error from the requestResponse : "+err.message);
        }

    }


    return (
        <div className="request-component">
          <div className="request-details">
            <img src={userProfileImg} className="request-profile-img" />
            <div className="request-details-box">
                <h3>{userName}</h3>
                <h5>{userEmail}</h5>
                <p className="p-text">wants to learn : </p>
                <p className="p-text">hii, I am sushanth. I want learn the java</p>
            </div>
          </div>
          <div className="request-response-box">
            <button 
                className="request-accept-btn"
                onClick={(e)=>{
                    if(declineStatus=="Declined")
                        return
                    requestResponse("accept");
                    setAcceptStatus("Accepted")
                }}
            >{acceptStatus}</button>
            <button 
                className="request-decline-btn"
                onClick={(e)=>{
                    if(acceptStatus==="Accepted"){
                        return
                    }
                    requestResponse("decline");
                    setDeclineStatus("Declined")
                }}
            >{declineStatus}</button>
          </div>
        </div>
    )
}