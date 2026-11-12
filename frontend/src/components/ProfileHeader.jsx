import { useState, useRef } from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import "./components.css";
import { sendRequest } from "./Post";
import editIcon from "../icons/edit-icon.svg";
import LoadingComponent from "./LoaderComponent";
import LoaderComponent from "./LoaderComponent";

export default function ProfileHeader(props){

  const [otherUserId, setOtherUserid] = useState(useParams()?.id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading ] = useState(false);

  const { 
    userId,
    userName,
    userPIN,
    userProfileImg,
    userCollege,
    isUser,
    followerCount,
    followingCount,
  } = props.details;

  const handleEditProfileBtn = ()=>{
    fileInputRef.current.click();
  }

  const handleProfileChange = async (e)=>{
      try{
        
        setLoading(true);

        const file = e.target.files[0];
        if(file==null){
          return ;
        }

        const formData = new FormData();
        formData.append("userProfileImg", file);

        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/change-profile`,{
            method: "PATCH",
            headers : {
                "token": token,
            },
            body: formData
        })

      }catch(err){
        console.log("Error from the handleProfileChange : " + err);
      }
      finally {
        setLoading(false);
        window.location.reload();
      }
  }

  const followBtnHandler = async(userId)=>{
    sendRequest(userId.toString());
  }

  const logoutHandler = ()=>{
    localStorage.setItem("token", "");
    navigate("../login");
  }

  const messageBtnHandler = async ()=>{

    try{

      setLoading(true);

      const token = localStorage.getItem('token');

      const response = await fetch(`${ import.meta.env.VITE_SOCKET_END_POINT }/api/get-conversation-key`,{
        method: "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({

          token: token,
          otherUserId: otherUserId,

        })
      });

      const data = await response.json();

      navigate(`/conversations/${data.conversationKey}`);

    }catch(err){
      console.log("Error from the message btn in profile header : "+ err);
    }
    finally{
      setLoading(false);
    }

  }


  return (
    <>
      {
        ( loading ) ?
        <LoaderComponent />
      :
        <div className="Profile-header">
          <div className="profile-box">
            <button 
              className="logout-btn"
              onClick={logoutHandler}
              >logout</button>
            <div className="profile-header-details">
              <div className="img-div">
                <img 
                  src={userProfileImg}  
                  className="profile-img"
                  loading="lazy"
                  onClick={handleEditProfileBtn}
                />
                {
                  isUser 
                  &&
                  <input
                    type="file"
                    accept="image/*"
                    className="img-edit-icon"
                    style={{display: "none"}}
                    ref={fileInputRef}
                    onChange={handleProfileChange}
                  />
                }
              </div>
              <div className="Profile-details">
                <h1 className="profile-details-header">{userName}</h1>
                <p>{userCollege}</p>
                <p>{userPIN}</p>
                <div className="follow-box">
                  <NavLink 
                    className="follow-nav"
                    to="./followers"
                    >
                      {followerCount} followers
                  </NavLink>
                  <NavLink 
                    className="follow-nav"
                    to="./following"
                    >
                      {followingCount} following
                  </NavLink>
                </div>
              </div>
            </div>
            
            {
              (!isUser)
              &&
              <div className="follow-message-box">
                <button 
                  className="follow-btn"
                  onClick={
                    ()=>{
                      followBtnHandler(userId);
                    }
                  }
                  >Follow</button>
                <button 
                  className="message-btn"
                  onClick={ messageBtnHandler }
                  >
                  Message
                </button>
              </div>
                
            }
          </div>
          <div className="profile-nav">
            <NavLink 
              to="." 
              end
              className={({isActive})=>(isActive)?"Active-link":"link"}
              >
                profile skill
            </NavLink>
            <NavLink 
              to="posts" 
              className={({isActive})=>(isActive)?"Active-link":"link"}
              >
                posts
            </NavLink>
          </div>
        </div>
      }
    </>
  )
}