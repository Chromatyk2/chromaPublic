import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import Pokedex from './component/pokedex.js';
import LaderBoard from './component/laderboard.js';
import NavBar from './component/navbar.js';
import Login from './services/auth.services.js';
import PokemonPage from './component/pokemonPage.js';
import MyTradePlace from './component/myTradePlace.js';
import TradePlace from './component/tradePlace.js';
import GuessTrade from './component/guessTrade.js';
import Guess from './component/guess.js';
import MyNote from './component/myNote.js';
import AllNotes from './component/allNotes.js';
import ViewersNote from './component/viewersNote.js';
import NostalPick from './component/nostalPick.js';
import CurrentGameImage from "./component/currentGameImage";
function App() {
  const [cookies, setCookie] = useCookies();
  if(Object.keys(cookies).length == 0) {
    return <Login />
  }
  return(
    <>
      <BrowserRouter>
        {cookies.user !== undefined &&
          <NavBar cookies={cookies} />
        }
        <Routes>
          <Route path="/" element={<HomePage cookies={cookies} />} />
          <Route path="/pokedex" element={<Pokedex cookies={cookies} />} />
          <Route path="/leaderboard" element={<LaderBoard cookies={cookies} />} />
          <Route path="/pokemon/:id" element={<PokemonPage cookies={cookies} />} />
          <Route path="/myTrades" element={<MyTradePlace cookies={cookies} />} />
          <Route path="/tradePlace" element={<TradePlace cookies={cookies} />} />
          <Route path="/guessTrade/:id" element={<GuessTrade cookies={cookies} />} />
          <Route path="/guess/:id" element={<Guess cookies={cookies} />} />
          <Route path="/aNu5YwZ5X75m5j" element={<MyNote cookies={cookies} />} />
          <Route path="/t4m4Q2zE3LV8ue" element={<AllNotes cookies={cookies} />} />
          <Route path="/t4m4Q2zE3LV8uf" element={<ViewersNote cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGS" element={<NostalPick cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGM" element={<CurrentGameImage cookies={cookies} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
