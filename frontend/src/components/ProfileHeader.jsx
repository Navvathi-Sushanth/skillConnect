import profileImg from "../images/dp.jpg";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import "./components.css";

const college = "GOVERNMENT POLLYTECHNIC COLLEGE";
export default function ProfileHeader(props){

  const otherUserId = useParams?.id;
  const navigate = useNavigate();

  console.log(otherUserId)

  const { 
    userName,
    userPIN,
    userProfileImg,
    userCollege,
    isUser,
    followerCount,
    followingCount,
  } = props.details;

  const followBtnHandler = async()=>{

  }

  const messageBtnHandler = async ()=>{

    try{

      const userEmail = localStorage.getItem('userEmail');

      const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/get-conversation-key`,{
        method: "POST",
        headers : {
          "Content-Type": "applications/json"
        },
        body: JSON.stringify({

          userEmail: userEmail,
          otherUserId: otherUserId,

        })
      });

      const data = await response.json();

      navigate(`/conversations/${data.conversationKey}`);

    }catch(err){
      console.log("Error from the message btn in profile header : "+ err);
    }

  }


  return (
    <div className="Profile-header">
      <div className="profile-box">
        <div className="profile-header-details">
          <div className="img-div">
            <img src={userProfileImg} alt="profile-image" className="profile-img"/>
          </div>
          <div className="Profile-details">
            <h1>{userName}</h1>
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
              onClick={followBtnHandler}
              >Follow</button>
            <button 
              className="message-btn"
              onClick={messageBtnHandler}
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
  )
}