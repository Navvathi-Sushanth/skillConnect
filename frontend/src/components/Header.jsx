import {Link} from 'react-router-dom';
import postIcon from "../images/post-icon.jpg";

import requestIcon from "../images/request-icon.png";
import "./components.css";


export default function Header(){
    return (
        <div className = "header-box">
            <Link to="addPost">
                <img 
                    src={postIcon} 
                    alt="post-add-icon"
                    className="post-icon icons"
                />
            </Link>
            <h2>CampusConnect</h2>
            <Link to="requests"><img className = "icons" src={requestIcon} alt="request icon" /></Link>
        </div>
    )
}