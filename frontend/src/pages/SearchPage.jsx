import "./Profile.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import arrowIcon from "../icons/left-arrow-icon.svg";
import searchIcon from "../icons/search-icon-black.svg";
import SearchComponent from "../components/SearchComponent";

export default function SearchPage(){

    const [search, setSearch ] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const inputHandler = (e)=>{
       const value = e.target.value;
       setSearch(value)
    }

    const getUsers = async () => {

        window.scrollTo(0,0);

        try {

            if(search.trim()==""){
                return;
            }
            const response = await fetch("http://localhost:3000/api/user/get-users",{
                method  : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    search: search
                }),
            });
            const data = await response.json();
            if(data.users&&data.users.length>0){
                setSearchResult(data.users);
            }
        }catch(err){
            console.log("Error from getUsers in the search : "+ err);
        }
    }

    useEffect(()=>{
       getUsers();
    },[search]);

     useEffect(()=>{
        console.log("result data : ")
      console.log(searchResult)
    },[searchResult]);

    return (
        <div className="search-page page">
            <header className="search-header">
                <Link to="../" >
                    <img src ={arrowIcon} className="icons"/>
                </Link>
                <div className="search-box">
                    <label htmlFor="searchId" >
                        <img 
                            src={searchIcon} 
                            alt="search-icon" 
                            className="search-icon"
                        />
                    </label>
                    <input 
                        id="searchId"
                        type="text" 
                        className="search-input" 
                        placeholder="Search..." 
                        onChange={inputHandler}
                        value={search}
                    />
                </div>
            </header>
            {
                searchResult.map(
                    (user)=><SearchComponent 
                        user={user} 
                        key = {user.userId}
                    />)
            }
        </div>
    )
}