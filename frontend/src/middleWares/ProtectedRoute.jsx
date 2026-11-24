import {Outlet, Navigate} from "react-router-dom";
import { useEffect, useRef, useState } from "react";


export default function ProtectedRoute(){

    const flagRef = useRef(false);
    const [ loadding, setLoading ] = useState(false);

    useEffect(()=>{
        async function authenticationHandler(){

            try {
                console.log("authentiacationHandeler");
                const token = localStorage.getItem("token");
                console.log(import.meta.env.VITE_END_POINT);
                if(token){
                    const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/authenticate`,{
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json",
                            "Authorization" : `Bearer ${token}`,
                        },
                    })

                    const data = await response.json();
                    if(data.message == "authorized"){
                        flagRef.current=true;
                    }
                }
            }catch(err){
               console.log("error from login : "+ err)
            }
            finally{
               setLoading(true);
            }
        
        }
        
        authenticationHandler();

    },[])


    if(!loadding){
        return (
            <div>loading.....</div>
        )
    }
    else {
        if(flagRef.current){
            return <Outlet />;
        }
        else {
            return <Navigate to="/login" />;
        }
    }
}