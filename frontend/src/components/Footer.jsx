import homeIcon from "../icons/newHomeIcon.svg";
import "./components.css";
import {Link} from "react-router-dom";
import messageIcon from "../icons/newMessageIcon.svg";
import searchIcon from "../icons/newSearchIcon.svg";
import profileIcon from "../icons/newProfileIcon.svg";

export default function Footer(){
    return (
        <div className="footer-box">
          <Link to="/">
            <img src={homeIcon} alt="homepage icon" className="footer-icons"/>
          </Link>
          <Link to="conversations">
            <img src={messageIcon} alt="homepage icon" className="footer-icons"/>
          </Link>
          <Link to="search">
            <img src={searchIcon} alt="homepage icon" className="footer-icons"/>
          </Link>
          <Link to="profile">
            <img src={profileIcon} alt="homepage icon" className="footer-icons"/>
          </Link>
        </div>
    )
}