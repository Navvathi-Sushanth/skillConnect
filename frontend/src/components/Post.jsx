import PostImg from "../images/dp.jpg";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import xImg from "../images/x-img1.png";


export const sendRequest = async (receiver)=>{
    try{

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/user/send-request",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "token": token,
            },
            body : JSON.stringify({
                receiver: receiver,
            })
        })

        const data = await response.json();

    }catch(err){
        console.log("Error from request function in home page : "+ err.message);
    }
}

export default function Post(props){

    const [clickBtn, setClickBtn] = useState(false);
    const navigate = useNavigate();
    const {
        userId,
        userName,
        profileImg,
        description,
        imgUrl,
        isUser,
    } = props.details;

    console.log(props.details);
    return (
        <div className="post-div">
            <header className="post-header">
                <img 
                    src={profileImg} 
                    alt="post pic" 
                    className="icons" 
                    onClick={()=>{
                        navigate(`/users/${userId}`);
                    }}
                />
                <h3 className="user-Name">{userName}</h3>
                {
                    (!isUser)?
                        <button 
                            className={(!clickBtn)?"connection-btn":"connection-click-btn"}
                            onClick={()=>{
                                setClickBtn(true);
                                sendRequest(userId);
                            }}
                        >+ Follow</button>
                    :
                        <button 
                            className={(!clickBtn)?"connection-btn":"connection-click-btn"}
                        ><img src={xImg} className="icons"/></button>
                }
            </header>
            <div className="post-container">
                <p className="descriotion">{description}</p>
                {
                    imgUrl
                    &&
                    <img src={imgUrl} alt="post image" className="post-img" />
                }
            </div>
        </div>
    )
}