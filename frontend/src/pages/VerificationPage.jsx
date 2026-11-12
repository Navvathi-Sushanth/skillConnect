import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

export default function VerificationPage(){

    const [email, setEmail] = useState();
    const [status, setStatus] = useState("sending");
    const [inputOTP, setInputOTP] = useState("");
    const [OTP_Status, setOTP_Status] = useState("");
    const [count, setCount] = useState(90);
    const timerRef = useRef(null);

    const navigate = useNavigate();
    const handleVerifyNav = ()=>{ 
        navigate(`/login`);
    }


    const startTimer = ()=>{
        clearInterval(timerRef.current);
        setCount(90);

        timerRef.current = setInterval(()=>{
            setCount(prev=>{
                if(prev<=1){
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    return 0;
                }
                return prev-1;
            });
        }, 1000);
    };


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
            startTimer();
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
                setCount(0);
            }

            console.log("data ")

        }catch(err){
            console.log("Error form the getOTP : "+err);
        }
    }

    useEffect(()=>{
        sendOTP();
        return ()=>{
            clearInterval(timerRef.current);
        }
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
                {
                    (count==0)?
                        <button className="resend-otp"
                            onClick={()=>{
                                sendOTP();
    
                            }}
                        >Resend Code</button>
                    :
                        <p className="p-text">resend code in {`${Math.floor(count/60)}:${String(count%60).padStart(2,0)}`}'s</p>
                }
                <p className="p-text">{OTP_Status}</p>
                <button 
                    className="verify-btn"
                    onClick={verificationBtnHandler}
                >Verify & Proceed</button>
            </div>
        </div>
    )
}