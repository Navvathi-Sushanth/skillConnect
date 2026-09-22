import { Link } from "react-router-dom"
import arrowIcon from "../icons/left-arrow-icon.svg";
import searchIcon from "../icons/search-icon-black.svg";

export default function SearchBarComponent(props){
    const {
        search,
        setSearch,
    } = props;
    return (
        <header className="search-header">
            <Link to="../profile" >
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
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value);
                    }}
                />
            </div>
        </header>
    )
}