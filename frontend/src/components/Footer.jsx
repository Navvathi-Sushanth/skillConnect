import homeIcon from "../icons/home-icon-black.svg";
import "./components.css";
import {Link} from "react-router-dom";
import messageIcon from "../images/message-icon.webp";
import searchIcon from "../icons/search-icon-black.svg";
import profileIcon from "../icons/profile-icon-black.svg";

export default function Footer(){
    return (
        <div className="footer-box">
          <Link to="/">
            <img src={homeIcon} alt="homepage icon" className="icons"/>
          </Link>
          <Link to="messages">
            <img src={messageIcon} alt="homepage icon" className="icons"/>
          </Link>
          <Link to="search">
            <img src={searchIcon} alt="homepage icon" className="icons"/>
          </Link>
          <Link to="profile">
            <img src={profileIcon} alt="homepage icon" className="icons"/>
          </Link>
        </div>
    )
}