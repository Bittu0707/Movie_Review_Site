import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSignOut } from "@fortawesome/free-solid-svg-icons";

export const Navbar = ({ setquery }) => {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const navigate = useNavigate();
    console.log(setquery);
    

useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        setUsername(storedUsername);
    }

    const handleStorageChange = () => {
        setUsername(localStorage.getItem("username") || '');
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
        window.removeEventListener("storage", handleStorageChange);
    };
}, [navigate]);


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUsername("");
        window.dispatchEvent(new Event("storage"));
        navigate("/login");
    };

    return (
        <>
            <div className="nav">
                <div className="logo">
                    <Link to='/'><h2>Screen Stories</h2></Link>
                </div>
                <div className="searchBar">
                    <input onChange={(e) => setquery(e.target.value.toLowerCase())} type="text" placeholder="Please enter a movie name" />
                    <FontAwesomeIcon icon={faSearch} className="searchIcon"></FontAwesomeIcon>
                </div>

                <ul>
                    {!username ? (
                        <>
                            <li><Link to='/signup'>Signup</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </>
                    ) : (
                        <>
                            <li className="username">
                                {username}
                            </li>
                            <li>
                                <button onClick={handleLogout} className="logout-btn">
                                    Logout

                                    <FontAwesomeIcon style={{marginLeft:'10px'}} icon={faSignOut} />
                                </button>
                            </li>
                        </>
                    )}
                    <li><Link to='/watchlist'>Watchlist</Link></li>

                </ul>
            </div>
        </>
    )
}