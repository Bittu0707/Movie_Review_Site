import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Signup } from "./components/Signup";
import { Route, Routes, useLocation } from "react-router";
import { Login } from "./components/Login";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import Details from "./components/Details";
import IsAuthorized from "./components/isAuthorized";
import Footer from "./components/footer";


function App() {

  const [message, setMessage] = useState([]);
  const [query, setquery] = useState('');
  const location = useLocation();
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!isAuthRoute && <Navbar setquery={setquery} />}

      <Routes>
        <Route path ="/" element ={ <IsAuthorized>
          <>
          <Home query={query}/>
          <Footer setquery={setquery}/>
          </>
          </IsAuthorized>}/>
        <Route path ="/signup" element ={<Signup/>}/>
        <Route path ="/login" element ={<Login/>}/>
        <Route path ="/watchlist" element ={<IsAuthorized>
          <>
          <Watchlist/>
          <Footer setquery={setquery} />
          </>
          </IsAuthorized>} />
        <Route path ="/details/:id" element={<IsAuthorized><>
          <Details/>
          <Footer setquery={setquery} />
          </>
          </IsAuthorized>} />
      </Routes>
      <ul>
      {
        message.map((res)=>{
          return(
            <div>
              <li key={res.id}>
                {res.title} <br/>
                {res.body} <br/>
              </li>
            </div>
          )
        })
      }
      </ul>
      {/* {!isAuthRoute && <Footer setquery= {setquery}/>} */}
    </div>
  );
}

export default App;
