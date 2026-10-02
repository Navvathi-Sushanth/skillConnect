import { useState, useEffect } from "react";
import "./Profile.css";
import RequestComponent from "../components/RequestComponent";

export default function Requests(){

    const [requests, setRequests] = useState([]);

    const getRequests = async ()=>{
        try{

            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/get-requests`,{
                method: "GET",
                headers: {
                    "token": token
                }
            });

            const data = await response.json();
            setRequests(data.requests);

        }catch(err){
           console.log("Error from the getRequest "+err.message);
        }
    }

    useEffect(()=>{
       console.log("inside useeffect",requests);
    },[requests])

    useEffect(()=>{

        getRequests();

    },[])

    return(
        <div className="page requests-page">
            <h1>REQUESTS : </h1>
            {
                requests.length>0 
                &&
                requests.map((request)=><RequestComponent requestDetails={request} key={request.sender._id}/>)
            }
        </div>
    )
}