import userProfile from "../images/dp.jpg";
import requestIcon from "../icons/request-icon.svg";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "./Post";
import { useState } from "react";

export default function SearchComponent(props){

    const navigate = useNavigate();

    const [reqBtnClick, setReqBtnClick] = useState(false);

    const { 
        userId,
        userName,
        userEmail, 
        userProfileImg 
    } = props.user;
    console.log(props);

    return (
        <div className="search-component">
            <div className="search-left">
                <img 
                    className="search-profile-img" 
                    src={userProfileImg}
                    alt="user profile" 
                />
                <div className="user-details">
                    <h4>{userName}</h4>
                    <p className="search-deatils">{userEmail}</p>
                    <p className="search-deatils">followers : 10</p>
                </div>
            </div>
            <div className="search-right">
                <button 
                    className="view-profile-btn"
                    onClick = {()=>{
                        navigate(`../users/${userId}`);
                    }}
                >View Profile</button>
                <button 
                    className={(!reqBtnClick)?"request-btn":"connection-click-btn"}
                    onClick = {()=>{
                        sendRequest(userId);
                        setReqBtnClick(true);
                    }}
                >
                    <img 
                        src={requestIcon} 
                        alt="request icon" 
                        className="request-icon"
                    />
                </button>
            </div>
        </div>
    )
}