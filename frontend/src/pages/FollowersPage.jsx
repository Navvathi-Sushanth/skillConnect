import "./Profile.css"
import SearchBarComponent from "../components/SearchBarComponent";
import FollowComponent from "../components/FollowComponent";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function FollowersPage(){



    const [search, setSearch] = useState("");
    const [connections, setconnections] = useState([]);
    const isLoadingRef = useRef(true);
    const currentPageRef = useRef(1);
    const hasConnectionsRef = useRef(true);
 
    const location = useLocation();

    const fetchType = location.pathname.split("/").filter(Boolean).pop();


    const loadProfiles = async ()=>{
        try{

            isLoadingRef.current = true;

            const userEmail = localStorage.getItem("userEmail");
            
            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/user/connections/:${currentPageRef}`,{
                method: "POST",

                headers: {
                    "Content-Type" : "application/json",
                },

                body: JSON.stringify({
                    userEmail: userEmail,
                    fetchType: fetchType,
                    reqUserId: null,
                })
            });
            
            const data = await response.json();

            if(data.connections.length == 0){
                return hasConnectionsRef.current=false;
            }
            currentPageRef.current++;

            console.log(data.connections)

            setconnections(data.connections);

        }catch(err){
            console.log("Error in the loadProfiles : "+err); 
        }
        finally{
            isLoadingRef.current = false;
        }
    }

    useEffect(()=>{

        if(search.trim()==""){
            console.log("inside the loadProfile")
            loadProfiles();
        }
        
    },[search])


    return (
        
        <div className="followers-page page">
           <SearchBarComponent 
                search={search}
                setSearch={setSearch}
            />
           {
            connections.map((connection)=><FollowComponent 
                key={connection._id}
                connectionDetails = {connection}
                loadProfiles = {loadProfiles}
            />)
           }
           
        </div>
    )
}