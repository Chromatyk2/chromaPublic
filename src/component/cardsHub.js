import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import 'react-tooltip/dist/react-tooltip.css'
import MyCards from './myCards.js';
import NavBar from "./navbar";
function CardsHub() {
    const [page, setPage] = useState(null);
    function displayMyCards(e) {
        setPage(e.value)
    }
    console.log(page);
    return(
        <>
            <div className="leaderBoardSwitch">
                <button value="myCards" onClick={displayMyCards}>Mes Cartes</button>
            </div>
            {page == "myCards" &&
                <MyCards />
            }
        </>
    );
}

export default CardsHub;