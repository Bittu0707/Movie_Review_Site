import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const logininfo = { ...loginData };
    logininfo[name] = value;
    setLoginData(logininfo);
    console.log(loginData, "data");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data: ", loginData);
    const { email, password } = loginData;

    if (!password || !email) {
      return handleError("email,pass are required");
    }
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      console.log("API response: ", result);

      const { success, message, name } = result;
      if (result.success) {
        localStorage.setItem("token", result.jwtToken);
        if (result.name) {
          localStorage.setItem("username", result.name);
        } else {
          console.warn("Username is missing from API response!");
        }
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      handleError(err, "Login failed! Please try again.");
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
          style={{ cursor: "pointer" }} />
          <h1>Log In</h1>
          <div className="underline"></div>
          <div className="login">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="email"
              value={loginData.email}
            />
            <br />
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="password"
              value={loginData.password}
            />
          </div>
          <div className="passwordText">
            <p>Forgot password?</p>
          </div>
          <button type="submit">Login</button>
          <div className="register">
            Don't have an account? <a href="http://localhost:5173/signup">Signup now</a>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};