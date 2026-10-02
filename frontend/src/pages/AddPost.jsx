import "./Profile.css";
import {Link} from 'react-router-dom';
import xImg from "../images/x-img1.png";
import { useState } from "react";
import starsIcon from "../images/stars-icon.svg";
import mirrorStars from "../images/stars-mirror-icon.png";

export default function AddPost(){
    
    const [description, setDescription] = useState("");
    const [previewImg , setPreviewImg] = useState(null);
    const textInputHandler = (e)=>{
        setDescription(e.target.value??"error in the texthandler");
    }
    
    const [ selectedImg, setSelectedImg ] = useState(null);
    function handleImageChange(e){
       const file = e.target.files[0];
        if(file){
            setSelectedImg(file);
            setPreviewImg(URL.createObjectURL(file));
        }
    }

    const postHandler = async ()=>{
        const formData = new FormData();
        formData.append("description",description);
        formData.append("imageUrl",selectedImg);
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/post/add-post`,{
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
            setPreviewImg(null);
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
                    previewImg 
                    &&
                    <img src={previewImg} className="selected-img"/>
                }
            </div>

        </div>
    )
}