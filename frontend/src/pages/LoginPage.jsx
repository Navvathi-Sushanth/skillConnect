import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validator } from "../validation";
import "./authentication.css";

export default function LoginPage(){


    
    //string variable for user out put
    const [outputText , setOutputText] = useState("");

    //for navigating from login to signup page

    const navigate = useNavigate();
    const handleSignUpNav = ()=>{ 
        navigate("/signup");
    }

    //this for dynamically handling the input data

    const [credentials, setCredentials] = useState({
        userEmail: "",
        userPIN: "",
        userPassword: ""
    });

    const textInputHandler = (e)=>{
       const {id, value} = e.target;
        setCredentials((prevData)=> ({
            ...prevData,
            [id]: value
        }));
    }

    const handleLogin = async () => {
        
        setOutputText("");
        const validation = validator(credentials);
        setOutputText(validation);
        if(validation!=""){
            return;
        }
       
        try{
            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/login`, {
                method: "post",
                headers : {
                    'Content-Type' : "application/json",
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if(data.message == "authorized"){
                localStorage.setItem("token",data.token);
                localStorage.setItem("userEmail",credentials.userEmail);
                navigate("/");
            }
            else {
                setOutputText("Enter the valid credentials");
            }
          
        }catch(err){
            console.log("Error from loginHandler : " + err);
        }
        finally{
            setCredentials((prevData)=>({
                ...prevData,
                userPassword: ""
            }));
        }
    }

    return (
        <div className="LoginPage page">
            <h1 className="login-header">Login</h1>
            <div className="login-box">
                <p className="login-title">login into Skill Mate </p>
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
                    onClick={handleLogin}
                     >
                        Login
                </button>
                <button className="login-input-btn login-input" onClick={handleSignUpNav}>SignUp</button>
            </div>
        </div>
    ) 
}