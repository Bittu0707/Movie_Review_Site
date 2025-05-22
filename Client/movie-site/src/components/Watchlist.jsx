import React, { useState, useEffect } from "react";
import './watchlist.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []); 

  const removeFromWatchlist = (id) => {
    console.log("Removing movie with ID:", id);
    const updatedList = watchlist.filter((movie) => String(movie.id) !== String(id));
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <>

      {watchlist.map((data) => (
        <div className="movie-in-watchlist" key={data.id}>
          <FontAwesomeIcon 
          icon={faTimes} 
          className="cross" 
          onClick={() => removeFromWatchlist(data.id)}
          style={{ cursor: "pointer" }}/>
          <img src={data.image} alt={data.title} />
          <ul>
          <li><b>{data.title}</b></li>
          <li>{data.year}</li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default Watchlist;
