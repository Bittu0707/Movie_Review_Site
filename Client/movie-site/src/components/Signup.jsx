import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "./signup.css";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const signupinfo = { ...signupData };
    signupinfo[name] = value;
    setSignupData(signupinfo);
    console.log(signupData, "data");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data: ", signupData);
    const { username, email, password } = signupData;
    if (!username || !password || !email) {
      return handleError("name,email,pass are required");
    }
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        console.log("NAVIGATE");
      }
      console.log(result);
    } catch (err) {
      handleError(err, "failed");
    }
  };
  return (
    <>
      <div className="container">
        
        <form className="formContainer" onSubmit={handleSubmit}>
        <FontAwesomeIcon 
                          icon={faTimes} 
                            className="cross" 
                            onClick={() => navigate("/")}
                            style={{ cursor: "pointer" }}/>
          <h1>Sign Up</h1>
          <div className="underline"></div>
          <div className="signup">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
              value={signupData.username}
            />
            <br />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="email"
              value={signupData.email}
            />
            <br />
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="password"
              value={signupData.password}
            />
          </div>
          <div className="btn">
            <button type="submit">Signup</button>
          </div>
          <div className="back-to-login">
          <a href="http://localhost:5173/login">Back to login</a>
          </div>
          
        </form>
        <ToastContainer />
      </div>
    </>
  );
};