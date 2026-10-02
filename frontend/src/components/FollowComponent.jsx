import { useEffect } from "react";
import DpImg from "../images/dp.jpg";
import "./components.css"

export default function FollowComponent(props){

    const loadProfiles = props.loadProfiles;

    const {
        _id,
        userEmail,
        userName,
        userProfileImg
    } = props.connectionDetails;

    const removeBtnHandler = async ()=>{
        try{

            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/remove-connection`,{
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    id : _id,
                })
            })

            const data = await response.json();
            console.log(data);

        }catch(err){
            console.log("Error from Remove of follow : "+err);
        }
        finally{
            loadProfiles();
        }
    }

    return(
        <div className="follow-component">
            <div className="follow-component-left">
                <img src={userProfileImg} alt="user profile" className="icons"/>
                <div className="follow-component-details">
                    <h3>{userName}</h3>
                    <p>{userEmail}</p>
                </div>
            </div>
            <div className="follow-component-right">
                <button 
                    className="remove-btn"
                    onClick={removeBtnHandler}
                    >
                    Remove
                </button>
            </div>
        </div>
    )
}