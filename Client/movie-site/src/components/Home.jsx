import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faStar } from '@fortawesome/free-solid-svg-icons';

const Home = ({ query }) => {
  const [bollywoodMovies, setBollywoodMovies] = useState([]);
  const [hollywoodMovies, setHollywoodMovies] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const allMovies = [...bollywoodMovies, ...hollywoodMovies];
    allMovies.forEach(movie => {
      if (!ratings[movie.id]) {
        fetch(`http://localhost:5000/auth/api/average-rating/${movie.id}`)
          .then(res => res.json())
          .then(data => {
            setRatings(prev => ({
              ...prev,
              [movie.id]: data.averageRating
            }));
          })
          .catch(err => console.error("Error fetching rating for movie", movie.id, err));
      }
    });

    fetch('/data/bollywood-api.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('Bollywood Movies: ', data);
        setBollywoodMovies(data);
      })
      .catch((error) => console.error("Error fetching Bollywood movies:", error));

    fetch('/data/hollywood-api.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('Hollywood Movies: ', data);
        setHollywoodMovies(data);
      })
      .catch((error) => console.error("Error fetching Hollywood movies:", error));

  }, [bollywoodMovies, hollywoodMovies]);

  function addTolocalStorage(movie) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const isAlreadyInWatchlist = watchlist.some(item => item.id === movie.id);
    if (!isAlreadyInWatchlist) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${movie.title} added to watchlist!`);
    } else {
      alert(`${movie.title} is already in your watchlist`);
    }
  }

  return (
    <div className='home-page'>
      <div className='section'>
        <div><h2>Bollywood Movies</h2></div>
        <div className="movie-list">
          {bollywoodMovies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase()))
            .map((movie) => {
              return (
                <div key={movie.id} className="card">
                  <div>
                    <div className="image">
                      <img className="movie-image" src={movie.image} alt={movie.title} />
                    </div>
                    <div className="card-body">
                      <Link to={`/details/${movie.id}`}>
                        <h4>{movie.title}</h4></Link>
                      <p className="rating">
                        <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />{" "}
                        {ratings[movie.id] !== undefined ? ratings[movie.id].toFixed(1) : "Loading..."}
                      </p>
                    </div>
                    <button onClick={() => addTolocalStorage(movie)} className='add-to-watchlist'>Add to Watchlist
                      <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faAdd} fontSize={'15px'} display={{ margin: '5px' }} />
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <div className='section'>
        <div><h2>Hollywood Movies</h2></div>
        <div className="movie-list">
          {hollywoodMovies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase()))
            .map((movie) => {
              return (
                <div key={movie.id} className="card">
                  <div>
                    <div className="image">
                      <img className="movie-image" src={movie.image} alt={movie.title} />
                    </div>
                    <div className="card-body">
                      <Link to={`/details/${movie.id}`}>
                        <h4>{movie.title}</h4></Link>
                      {<p className="rating">
                        <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />{" "}
                        {ratings[movie.id] !== undefined ? ratings[movie.id].toFixed(1) : "Loading..."}
                      </p>}

                    </div>
                    <button onClick={() => addTolocalStorage(movie)} className='add-to-watchlist'>Add to Watchlist
                      <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faAdd} fontSize={'15px'} display={{ margin: '5px' }} />
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Home