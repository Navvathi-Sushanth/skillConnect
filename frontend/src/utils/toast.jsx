import toast from "react-hot-toast";
import dp from "../images/dp.jpg"
import "./toast.css"

export default function newMessageToast(props){

    const {
        message
    } = props
    toast.custom(
        <div className="toast-div">
            <img src = {dp} className="toast-icon"/>
            <div className="toast-content">
                <h3 className="h1-toast">Sushanth</h3>
                <p className="p-text">{message}</p>
            </div>
        </div>,
        {
            duration: 3000,
            position: "top-right"
        }
    )
}