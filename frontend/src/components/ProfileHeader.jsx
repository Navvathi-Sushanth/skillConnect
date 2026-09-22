import profileImg from "../images/dp.jpg";
import {NavLink} from "react-router-dom";
import "./components.css";

const college = "GOVERNMENT POLLYTECHNIC COLLEGE";
export default function ProfileHeader(props){
  const { 
    userName,
    userPIN,
    userProfileImg,
    userCollege,
    isUser,
    followerCount,
    followingCount,
  } = props.details;
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
            <button className="follow-btn">Follow</button>
            <button className="message-btn">
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