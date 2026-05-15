import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/Stream/home.js';
import LastGames from "./component/Stream/lastGame.js";
import OnStream from "./component/Stream/onStream";
import NostalPickV2 from "./component/Stream/nostalPickv2";
import LastBangerAlert from "./component/Stream/lastBangerAlert";
import Mentions from "./component/Mentions";    
import SpawnPokemon from "./component/Stream/spawnPokemon";
import RandomProfil from "./component/Stream/randomProfil";
import Prediction from "./component/Stream/prediction";
import OneBox from "./component/Stream/OneBox";
function App() {
  return(
      <>
              <div style={{background: window.location.href.startsWith('https://chromatyk.fr/29ct92B3Zrvx') && 'transparent'}} className={"contentContainer"}>
                <BrowserRouter>
                  <OnStream/>
                  <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/29ct92B3ZrvxGS" element={<NostalPickV2 />}/>
                    <Route path="/29ct92B3ZrvxGSO" element={<OneBox />}/>
                    <Route path="/29ct92B3ZrvxGL" element={<LastGames />}/>
                    <Route path="/29ct92B3ZrvxGK" element={<LastBangerAlert />}/>
                    <Route path="/Mentions" element={<Mentions />}/>
                    <Route path="/29ct92B3ZrvxGSpw" element={<SpawnPokemon />}/>
                    <Route path="/29ct92B3ZrvxGSrp" element={<RandomProfil />}/>
                    <Route path="/29ct92B3Zrvxpre" element={<Prediction/>}/>
                  </Routes>
                </BrowserRouter>
              </div>
      </>
  );
}

export default App;
