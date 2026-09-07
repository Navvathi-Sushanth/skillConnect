import "./Profile.css";
import {Link} from 'react-router-dom';
import xImg from "../images/x-img1.png";
import { useState } from "react";
import starsIcon from "../images/stars-icon.svg";
import mirrorStars from "../images/stars-mirror-icon.png";

export default function AddPost(){
    
    const [description, setDescription] = useState("");
    const textInputHandler = (e)=>{
        setDescription(e.target.value??"error in the texthandler");
    }
    
    const [ selectedImg, setSelectedImg ] = useState(null);
    function handleImageChange(e){
       const file = e.target.files[0];
        if(file){
            setSelectedImg(URL.createObjectURL(file));
        }
    }

    const postHandler = async ()=>{
        const formData = new FormData();
        formData.append("description",description);
        formData.append("image",selectedImg);
        try{
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/post/add-post",{
                method: "POST",
                headers : {
                    "token": token,
                },
                body: formData
            })
        }catch(err){
            console.log(err);
        }
        finally{
            setDescription("");
            setSelectedImg(null);
        }
    }

    return (
        <div className="page add-post">
            <header className="addPost-header">
                <Link to="../" ><img src ={xImg} className="icons"/></Link>
                <h2 className="header-text">
                    <img className="icons" src={starsIcon} />
                    Create Post
                    <img className="icons" src={mirrorStars} />
                </h2>
                <button className="post-btn"
                        onClick={postHandler}
                >
                    post
                </button>
            </header>
            <div className="description-box">
                <textarea 
                    rows="4"
                    placeholder="share your thoughts...."
                    className="post-description"
                    onChange={textInputHandler}
                    value={description}
                    autoFocus
                    >
                
                </textarea>
            </div>
            <h3 style={{padding : "10px"}}>Add to your post </h3>
            <input type="file"
                className="image-upload"
                accept="image/*"
                onChange={handleImageChange}
            />
            <div className="img-container">
                {
                    selectedImg 
                    &&
                    <img src={selectedImg} className="selected-img"/>
                }
            </div>

        </div>
    )
}