import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import LastGames from "./component/stream/lastGame.js";
import Onstream from "./component/stream/onstream";
import NostalPickV2 from "./component/stream/nostalPickv2";
import LastBangerAlert from "./component/stream/lastBangerAlert";
import Mentions from "./component/Mentions";    
import SpawnPokemon from "./component/stream/spawnPokemon";
import RandomProfil from "./component/stream/randomProfil";
import Prediction from "./component/stream/prediction";
import OneBox from "./component/stream/OneBox";
function App() {
  return(
      <>
              <div style={{background: window.location.href.startsWith('https://chromatyk.fr/29ct92B3Zrvx') && 'transparent'}} className={"contentContainer"}>
                <BrowserRouter>
                  <Onstream/>
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
