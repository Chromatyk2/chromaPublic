import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import NostalPickV2 from "./component/stream/nostalPickv2";
import Mentions from "./component/Mentions";    
import OneBox from "./component/stream/OneBox";
function App() {
  return(
      <>
              <div style={{background: window.location.href.startsWith('https://chromatyk.fr/29ct92B3Zrvx') && 'transparent'}} className={"contentContainer"}>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/29ct92B3ZrvxGS" element={<NostalPickV2 />}/>
                    <Route path="/29ct92B3ZrvxGSO" element={<OneBox />}/>
                    <Route path="/Mentions" element={<Mentions />}/>
                  </Routes>
                </BrowserRouter>
              </div>
      </>
  );
}

export default App;
