import "./Profile.css";
import Post from "../components/Post";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function PostPage(){

    const userId = useParams()?.id;

    const [posts,setPosts] = useState([]);
    const loadingRef = useRef(true);
    const hasPostRef = useRef(true);
    const pageRef = useRef(1);

    const getPosts = async () =>{

        const token = localStorage.getItem("token");

        try{
            loadingRef.current = true;
            const response = await fetch(`http://localhost:3000/api/post/get-user-posts?page=${pageRef.current}`,{
                headers : {
                    "token": token,
                    "userid": userId,
                }
            })
            const data = await response.json();
            if(data.posts&&data.posts.length>0){
                setPosts((prev)=>[
                    ...prev,
                    ...data.posts,
                ])
            }
            else {
                hasPostRef.current = false;
            }
        }catch(err){
            console.log("Error in the User Post page : " + err);
        }
        finally{
            loadingRef.current=false;
        }
    }


    const scrollHandler = ()=>{
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

        if(nearBottom){
            getPosts()
        }
    }

    useEffect(()=>{
        getPosts();
    },[])

    return (
        <div className="page">

            {
                (posts.length==0)?
                    <h1 style={
                        {
                            margin: "20px",
                            textAlign: "center"
                        }
                    }>NO POSTS YET</h1>
                :
                    posts.map((details)=><Post details={details} key = {details.postId} />)
            }

        </div>
    )
}


