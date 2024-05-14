import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import NavBar from './component/navbar.js';
import Login from './services/auth.services.js';
import Mentions from "./component/Mentions";
import StreamOnLayout from "./component/StreamOnLayout";
function App(props) {
  const [cookies, setCookie] = useCookies();
  if(Object.keys(cookies).length == 0) {
    return <Login />
  }
  return(
    <>
      {cookies.user !== undefined &&
      <BrowserRouter>
          <NavBar cookies={cookies} />
        <Routes>
          <Route path="/" element={<HomePage cookies={cookies} />} />
          <Route path="/Mentions" element={<Mentions cookies={cookies} />} />
          <Route path="/StreamOnForKids" element={<StreamOnLayout cookies={cookies} />} />
        </Routes>
        {/*<Footer cookies={cookies} />*/}
      </BrowserRouter>
      }
    </>
  );
}

export default App;
