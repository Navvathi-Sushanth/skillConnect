import {Link} from 'react-router-dom';
import postIcon from "../images/post-icon.jpg";

import requestIcon from "../images/request-icon.png";
import "./components.css";
import { useEffect, useState } from 'react';



export default function Header(){

    const [ count, setCount ] = useState(0);

    const getRequestCount = async ()=>{

        try{

            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/get-request-count`, {
                method: "GET",
                headers: {
                    token: token,
                }
            });

            const data = await response.json();

            if(data.message=="success"){
                setCount(data.count);
            }

        }catch(err){
            console.log("Error from the get new request count : " + err);
        }

    }

    useEffect(()=>{

        getRequestCount();

    },[]);


    return (
        <div className = "header-box">
            <Link to="addPost">
                <img 
                    src={postIcon} 
                    alt="post-add-icon"
                    className="post-icon icons"
                />
            </Link>
            <h3 className='main-header'>CampusConnect</h3>
            <Link to="requests" className='request-link'>
                <img className = "icons" src={requestIcon} alt="request icon" />
                {
                    count!=0
                    &&
                    <div className="new-request-number-div">
                        {count}
                    </div>
                }
            </Link>
        </div>
    )
}