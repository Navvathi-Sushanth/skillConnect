import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

export default function VerificationPage(){

    const [email, setEmail] = useState();
    const [status, setStatus] = useState("sending");
    const [inputOTP, setInputOTP] = useState("");
    const [OTP_Status, setOTP_Status] = useState("");

    const navigate = useNavigate();
    const handleVerifyNav = ()=>{ 
        navigate(`/login`);
    }


    const verificationBtnHandler = async ()=>{

        try{

            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/verify-OTP`,{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    userEmail: email,
                    otp: inputOTP,
                })
            });

            const data = await response.json();

            console.log(data)

            if(data.message=="verified"){
                handleVerifyNav();
            }
            if(data.message=="OTP expired"){
                setOTP_Status("OTP Expired, use resent one (or) click on resend button")
            }

        }catch(err){
            console.log("Error in the verificationBtnHandler : "+err);
        }

    }

    const sendOTP = async ()=>{
        try{

            const localEmail = localStorage.getItem("email");
            setEmail(localEmail);

            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/email-verification`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email: localEmail,
                })
            })

            const data = await response.json()
            if(data.message=="successfully sent the OTP"){
                setStatus("sent");
            }
            if(data.message=="internal server error"){
                setStatus("failed try again")
            }

            console.log(data)

        }catch(err){
            console.log("Error form the getOTP : "+err);
        }
    }

    useEffect(()=>{

        sendOTP();

    },[])


    return (
        <div className="verification-page">
            <div className="verification-container">
                <h1>OTP Verification</h1>
                <p className="p-text">Enter OTP Code {status} to your {email}</p>
                <input 
                    autoFocus
                    type="text" 
                    className="OTP-input" 
                    maxLength={6}
                    placeholder="1****8"
                    value={inputOTP}
                    onChange={(e)=>{
                        setInputOTP(e.target.value);
                    }}
                />
                <p className="p-text">Don't receive OTP code ?</p>
                <button className="resend-otp">Resend Code</button>
                <p className="p-text">{OTP_Status}</p>
                <button 
                    className="verify-btn"
                    onClick={verificationBtnHandler}
                >Verify & Proceed</button>
            </div>
        </div>
    )
}