import toast from "react-hot-toast";
import dp from "../images/dp.jpg"
import "./toast.css"

export default function newMessageToast(props){


    console.log(props);

    const {
        message,
        userName,
        userProfileImg
    } = props
    toast.custom(
        <div className="toast-div">
            <img src = {userProfileImg} className="toast-icon"/>
            <div className="toast-content">
                <h3 className="h1-toast">{userName}</h3>
                <p className="p-text">{message}</p>
            </div>
        </div>,
        {
            duration: 3000,
            position: "top-right"
        }
    )
}