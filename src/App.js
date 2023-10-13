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
import CurrentGameImage from "./component/currentGameImage.js";
import LastGames from "./component/lastGame.js";
import BangerOverlay from "./component/BangerOverlay.js";
import CardsHub from "./component/cardsHub.js";
import OnStream from "./component/onStream";
import NostalPickV2 from "./component/nostalPickv2";
function App() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [cookies, setCookie] = useCookies();
  if(Object.keys(cookies).length == 0) {
    return <Login />
  }

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  function onClick(evt) {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return(
    <>
      {cookies.user !== undefined &&
      <BrowserRouter>
          <NavBar cookies={cookies} />
          <button
              style={{background:"none",border:"none",color:"red"}}
              className="link-button"
              id="setup_button"
              aria-label="Install app"
              title="Install app"
              onClick={onClick}
          >
            Télécharger l'appli
          </button>
          <OnStream cookies={cookies} />
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
          <Route path="/29ct92B3ZrvxGS" element={<NostalPickV2 cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGM" element={<CurrentGameImage cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGL" element={<LastGames cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGB" element={<BangerOverlay cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGT" element={<CardsHub cookies={cookies} />} />
        </Routes>
      </BrowserRouter>
      }
    </>
  );
}

export default App;
