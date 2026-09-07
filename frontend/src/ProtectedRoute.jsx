import {Outlet, Navigate} from "react-router-dom";
import { useEffect, useState } from "react";


export default function ProtectedRoute(){

    const [ flag, setFlag ] = useState(false);
    const [ loadding, setLoading ] = useState(false);

    useEffect(()=>{
        async function authenticationHandler(){

            try {
                console.log("authentiacationHandeler");
                const token = localStorage.getItem("token");
                if(token){
                    const response = await fetch("http://localhost:3000/api/authenticate",{
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json",
                            "Authorization" : `Bearer ${token}`,
                        },
                    })

                    const data = await response.json();
                    if(data.message == "authorized"){
                        setFlag(true);
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
        if(flag){
            return <Outlet />;
        }
        else {
            return <Navigate to="/login" />;
        }
    }
}