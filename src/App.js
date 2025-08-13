import React from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import Axios from "axios";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import Pokedex from './component/pokedex.js';
import NavBar from './component/navbar.js';
import Login from './services/auth.services.js';
import PokemonPage from './component/pokemonPage.js';
import LastGames from "./component/lastGame.js";
import CardsHub from "./component/cardsHub.js";
import OnStream from "./component/onStream";
import NostalPickV2 from "./component/nostalPickv2";
import LastBangerAlert from "./component/lastBangerAlert";
import Mentions from "./component/Mentions";
import SpawnPokemon from "./component/spawnPokemon";
import Profil from "./component/profil";
import AllProfils from "./component/allProfils";
import OtherDex from "./component/otherDex";
import RandomProfil from "./component/randomProfil";
import OtherProfil from "./component/otherProfil";
import CardsHubOther from "./component/cardsHubOther";
import Compagnon from "./component/compagnon";
import Prediction from "./component/prediction";
import Footer from "./component/footer";
import Log from "./services/log";
function App() {
  const [cookies, setCookie] = useCookies();
  if(typeof cookies.user === "undefined") {
    return <Login />
  }
  return(
      <>
        {typeof cookies.user !== "undefined" &&
            cookies.user.data[0].login &&
              <div style={{background: window.location.href.startsWith('https://chromatyk.fr/29ct92B3Zrvx') && 'transparent'}} className={"contentContainer"}>
                <BrowserRouter>
                  <NavBar cookies={cookies}/>
                  <OnStream/>
                  <Routes>
                    <Route path="/log" element={<Log cookies={cookies}/>}/>
                    <Route path="/" element={<HomePage cookies={cookies}/>}/>
                    <Route path="/profil" element={<Profil cookies={cookies}/>}/>
                    <Route path="/pokedex" element={<Pokedex cookies={cookies}/>}/>
                    <Route path="/pokedex/:pseudo" element={<OtherDex cookies={cookies}/>}/>
                    <Route path="/pokemon/:id" element={<PokemonPage cookies={cookies}/>}/>
                    <Route path="/29ct92B3ZrvxGS" element={<NostalPickV2 cookies={cookies}/>}/>
                    <Route path="/29ct92B3ZrvxGL" element={<LastGames cookies={cookies}/>}/>
                    <Route path="/tcg/cartes" element={<CardsHub page={"myCards"} cookies={cookies}/>}/>
                    <Route path="/tcg/boosters" element={<CardsHub page={"myBoosters"} cookies={cookies}/>}/>
                    <Route path="/tcg/boutique" element={<CardsHub page={"cardsShop"} cookies={cookies}/>}/>
                    <Route path="/tcg/echange" element={<CardsHub page={"sellCards"} cookies={cookies}/>}/>
                    <Route path="/tcg/liste" element={<CardsHub page={"listuserTcg"} cookies={cookies}/>}/>
                    <Route path="/29ct92B3ZrvxGK" element={<LastBangerAlert cookies={cookies}/>}/>
                    <Route path="/Mentions" element={<Mentions cookies={cookies}/>}/>
                    <Route path="/29ct92B3ZrvxGSpw" element={<SpawnPokemon cookies={cookies}/>}/>
                    <Route path="/profil/:pseudo" element={<OtherProfil cookies={cookies}/>}/>
                    <Route path="/tcg/cartes/:pseudo" element={<CardsHubOther page={"myCards"} cookies={cookies}/>}/>
                    <Route path="/tcg/boosters/:pseudo" element={<CardsHubOther page={"myBoosters"} cookies={cookies}/>}/>
                    <Route path="/tcg/boutique/:pseudo" element={<CardsHubOther page={"cardsShop"} cookies={cookies}/>}/>
                    <Route path="/tcg/echange/:pseudo" element={<CardsHubOther page={"sellCards"} cookies={cookies}/>}/>
                    <Route path="/tcg/liste/:pseudo" element={<CardsHubOther page={"listuserTcg"} cookies={cookies}/>}/>
                    <Route path="/allProfils" element={<AllProfils cookies={cookies}/>}/>
                    <Route path="/29ct92B3ZrvxGSrp" element={<RandomProfil cookies={cookies}/>}/>
                    <Route path="/29ct92B3Zrvxpre" element={<Prediction/>}/>
                    <Route path="/compagnon" element={<Compagnon cookies={cookies}/>}/>
                  </Routes>
                </BrowserRouter>
              </div>
        }
      </>
  );
}

export default App;
