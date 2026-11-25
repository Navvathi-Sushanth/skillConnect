import { Outlet, useParams } from "react-router-dom";
import "../pages/Profile.css";
import ProfileHeader from "../components/ProfileHeader";
import { useEffect, useState } from "react";
import { useSocket } from "../middleWares/SocketProvider";
import newMessageToast from "../utils/toast";

export default function ProfileLayout(){

    const socket = useSocket();

    const userId = useParams()?.id;
    console.log("useParams",useParams()?.id)

    const [details, setDetails] = useState({
        userName: "",
        userPIN: "",
        useProfileImg: "",
    });

    useEffect(()=>{
        try{

            if(userId==null){
                return;
            }

        }catch(err){
            console.log("Error from the isConnection");
        }
    }, [userId]);

    useEffect(()=>{
        async function getDeatails() {
            try {

                const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/get-details`,{
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json",
                        "Authentication" : token,
                        "userid" : userId,
                    }
                })

                const data = await response.json();
                console.log(data);
                setDetails(data.cleanedUser);

            }catch(err){

                console.log("Error from the details"+err);
                
            }
            
        }

        getDeatails();
    },[userId]);

    useEffect(()=>{
        console.log(details);
    },[details]);

    useEffect(()=>{

        if(!socket){
            return ;
        }

        socket.on("new-message",(data)=>{
            newMessageToast(data);
        })

        return ()=>{
            socket.off("new-message");
        }

    },[socket]);

    return (
        <div className="profile-page page">
          <ProfileHeader details={details} />
          <Outlet
            context={{
                details,
                setDetails,
            }}
          />
        </div>
    )
}