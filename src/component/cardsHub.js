import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import 'react-tooltip/dist/react-tooltip.css'
import MyCards from './myCards.js';
import CardsShop from './cardsShop.js';
import NavBar from "./navbar";
function CardsHub() {
    const [page, setPage] = useState(null);
    function displayTcgContent(e) {
        setPage(e.target.value)
    }
    return(
        <>
            <div className="leaderBoardSwitch">
                <button value="myCards" onClick={displayTcgContent}>Mes Cartes</button>
                <button value="cardsShop" onClick={displayTcgContent}>Boutique</button>
            </div>

            <div className={"allCards"}>
                <div>
                    <iframe id="twitch-chat-embed"
                            src="https://www.twitch.tv/embed/chromatyk/chat?parent=chromatyk.fr"
                            height="500"
                            width="350">
                    </iframe>
                </div>
                <div>
                    {page == "myCards" &&
                        <MyCards />
                    }
                    {page == "cardsShop" &&
                        <CardsShop />
                    }
                </div>
            </div>
        </>
    );
}

export default CardsHub;