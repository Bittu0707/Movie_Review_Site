import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import './details.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [rating, setRating] = useState(null);
  const [rateColor, setRateColor] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/data/bollywood-api.json").then((res) => res.json()),
      fetch("/data/hollywood-api.json").then((res) => res.json()),
      fetch(`http://localhost:5000/api/comments/${id}`).then((res) => res.json())
    ])
      .then(([bollywoodData, hollywoodData, commentData]) => {
        const allMovies = [...bollywoodData, ...hollywoodData];
        const selectedMovie = allMovies.find((m) => m.id === parseInt(id));

        if (selectedMovie) {
          setDetails(selectedMovie);
        }
        setComments(commentData);
      })
      .catch((error) => console.error("Error fetching movie data:", error));
  }, [id]);

  const submitRating = async () => {
    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }
    const username = localStorage.getItem("username");
  if (!username) {
    alert("You must be logged in to rate.");
    return;
  }
    console.log("Submitting rating:", { id, username, rating });

    try {
      const response = await fetch("http://localhost:5000/auth/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, username, rating }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Rating submitted successfully!");
      } else {
        alert(`Failed to submit rating: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Error submitting rating. Please try again.");
    }
  };

  const submitComment = async () => {
    const username = localStorage.getItem("username");
    if (!text.trim()) return alert("Comment can't be empty.");

    try {
      const res = await fetch("http://localhost:5000/auth/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: id, text, username }),
      });

      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, { text, username, createdAt: new Date().toISOString() }]);
        setText("");
      } else {
        alert("Failed to save comment: " + data.error);
      }
    } catch (err) {
      console.error("Error submitting comment", err);
    }
  };

  if (!details) {
    return <h2>Loading movie details...</h2>;
  }

  return (
    <div className="details">
      <h1>{details.title}</h1>
      <div className="movie-content">
        <img src={details.image} alt={details.title} className="image" />
        <div className="content">
          <p>Title: <b>{details.title}</b></p>
          <p>Stars: {details.stars}</p>
          <p>Year: {details.year}</p>
          <p>Directors: {details.director}</p>
          <p>Description: {details.description}</p>
          <br /><br />

          {[...Array(5)].map((star, index) => {
            const currentRate = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rate"
                  style={{ display: 'none' }}
                  value={currentRate}
                  onClick={() => setRating(currentRate)}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="star-icon"
                  style={{ fontSize: "25px" }} 
                  color={currentRate <= (rating || rateColor) ? "yellow" : "grey"}
                />
              </label>
            );
          })}
          <br /><br />
          <button className='details-btn' onClick={submitRating}>Submit Rating</button>
        </div>
      </div>

      <div className="comment-section">
        <h3>Comments</h3>
        {comments.length === 0 && <p>No comments yet.</p>}
        <ul>
          {comments.map((c, i) => (
            <li key={i}>
              <strong>{c.username}</strong>: {c.text} <br />
              <small>{new Date(c.createdAt).toLocaleString()}</small></li>
          ))}
        </ul>

        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />
        <button className='details-btn' onClick={submitComment}>Post Comment</button>
      </div>
    </div>
  );
};
export default Details;