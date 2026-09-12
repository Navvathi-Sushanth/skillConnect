import "./authentication.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validator } from "../validation";

export default function SignUp(){

    const [outputText , setOutputText] = useState("");
    const [credentials, setCredentials] = useState({
        userName: "",
        userEmail: "",
        userPIN: "",
        userPassword: ""
    });

    const navigate = useNavigate();
    const handleSignUpNav = ()=>{ 
        navigate(`/verify-email`);
    }
    
    const signUpHandler = async ()=>{

        setOutputText("")
        const validation = validator(credentials);
        setOutputText(validation);
    
        if(outputText!=""){
            return;
        }

        try {

            setCredentials((prev)=>({
                ...prev,
                userEmail: prev.userEmail.toLocaleLowerCase(),
            }))

            const response = await fetch("http://localhost:3000/api/sign-up", {

                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if(data.message == "signUp successfully"){
                localStorage.setItem("email",credentials.userEmail);
                handleSignUpNav();
            }
            if(data.message == "User is already exists"){
                setOutputText("cridential already exists");
            }

            if(data.message == "Internal server error from data base"){
                setOutputText("Internal server error from data base");
            }

            console.log(response, data)

            if(response.status == 409){
                setOutputText(data.message);
            }

        }catch(err){
            console.log("Error from signUpHandler : " + err);
        }
        finally{
            setCredentials((prevData)=>({
                ...prevData,
                userPassword: ""
            }));
        }
        
    }

    const textInputHandler = (e)=>{
        const {id, value} = e.target;
        setCredentials((prevData)=> ({
            ...prevData,
            [id]: value
        }));
    }
    
    return (

        <div className="sign-up-page page">
            <h1 className="login-header">SignUp</h1>
            <div className="login-box">
                <p className="login-title">SignUp into Skill Mate </p>
                <input 
                    id="userName" 
                    type="text" 
                    onChange={textInputHandler} 
                    className="login-input" 
                    placeholder="User Name " 
                    value={credentials.userName}
                    autoFocus
                />
                <input 
                    id="userEmail" 
                    type="text" 
                    onChange={textInputHandler} 
                    className="login-input" 
                    placeholder="User  Email" 
                    value={credentials.userEmail}
                />
                <input 
                    id="userPIN" 
                    type="text" 
                    onChange={textInputHandler} 
                    className="login-input" 
                    placeholder="User PIN" 
                    value={credentials.userPIN}
                />
                <input 
                    id="userPassword" 
                    type="password" 
                    onChange={textInputHandler} 
                    className="login-input" 
                    placeholder="User Password"
                    value={credentials.userPassword}
                />
                {outputText && <p className="output-text">{outputText}</p>}
                <button 
                    className="login-input-btn login-input" 
                    onClick={signUpHandler}
                    >SignUP</button>
            </div>+
        </div>
    )
}