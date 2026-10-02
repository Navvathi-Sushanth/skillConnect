import Header from "../components/Header.jsx";
import "./Profile.css";
import Post from "../components/Post.jsx";
import { useState, useEffect, useRef } from "react"

// const Style = {
//     height: "100vh",
//     border: "2px solid pink",
//     width: "100%",
//     maxWidth: "650px"
// }


export default function Home(){
     
    const [ posts, setPosts ] = useState([]);
    const [ postsComponent, setPostsComponents ] = useState(null);
    const loadingRef = useRef(true);
    const pageRef = useRef(1);
    const hasPostRef = useRef(true);

    const handleScroll = ()=>{
        const nearBottom = 
            window.innerHeight + window.scrollY >= document.body.offsetHeight-500;
        if(nearBottom&&!loadingRef.current&&hasPostRef.current == true){
            getPosts();
        }
    }

    async function getPosts() { 
        try{
            loadingRef.current = true;
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_END_POINT}/api/post/get-posts?page=${pageRef.current}`,{
                method: "GET",
                headers : {
                    "token" : token,
                }
            });
            const data = await response.json();

            if(data.posts&&data.posts.length>0){
                setPosts((prev)=>([...prev,...data.posts]));
                pageRef.current++;
            }
            else {
                hasPostRef.current=false;
            }

        }catch(err){
            console.log("Error from home page : "+ err);
        }
        finally{
            loadingRef.current = false;
        }
    }
    
    useEffect(()=>{

        window.addEventListener("scroll",handleScroll);

        getPosts();
        
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        }
    },[])



     

    useEffect(()=>{

        const newPosts = posts.map((details)=><Post details = {details} key={Math.random()}/>);
        setPostsComponents(newPosts);

    },[posts])

    return (
        <div className="home-page page" >
          <Header />
          {
            postsComponent && postsComponent
          }
        </div>
    );
}