import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import Mentions from "./component/Mentions";    
function App() {
  return(
      <>
              <div style={{background: window.location.href.startsWith('https://chromatyk.fr/29ct92B3Zrvx') && 'transparent'}} className={"contentContainer"}>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/Mentions" element={<Mentions />}/>
                  </Routes>
                </BrowserRouter>
              </div>
      </>
  );
}

export default App;
