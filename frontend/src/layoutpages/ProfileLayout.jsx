import { Outlet, useParams } from "react-router-dom";
import "../pages/Profile.css";
import ProfileHeader from "../components/ProfileHeader";
import { useEffect, useState } from "react";

export default function ProfileLayout(){

    const userId = useParams()?.id;
    console.log("useParams",useParams()?.id)

    const [details, setDetails] = useState({
        userName: "",
        userPIN: "",
        useProfileImg: "",
    })

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