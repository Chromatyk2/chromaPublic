import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import 'react-tooltip/dist/react-tooltip.css'
import MyCards from './myCards.js';
import CardsShop from './cardsShop.js';
import NavBar from "./navbar";
import Axios from 'axios'
function CardsHub(props) {
    const [points,setPoints] = useState(null);
    const pseudo = props.cookies.user.data[0].login;
    useEffect(() => {
        Axios
            .get("/api/getCardsPoint/"+pseudo)
            .then(function(response){
                setPoints(response.data);
            })
    }, [])
    const [page, setPage] = useState(null);
    function displayTcgContent(e) {
        setPage(e.target.value)
    }
    function registerCards(e) {
        return Axios.post('/api/registerCards',
            {
                pseudo:e.target.value
            }
            ).then(
            (result) => {
                Axios
                    .get("/api/getCardsPoint/"+e.target.value)
                    .then(function(response){
                        setPoints(response.data);
                    })
            }
        )
    }
    return(
        <>
            <div className="leaderBoardSwitch">
                <button value="myCards" onClick={displayTcgContent}>Mes Cartes</button>
                <button value="cardsShop" onClick={displayTcgContent}>Boutique</button>
            </div>
            <div>
                {points &&
                    points.length == 0 ?
                        <div className="leaderBoardSwitch">
                            <button value={pseudo} onClick={registerCards}>S'enregistrer</button>
                        </div>
                    :
                    <>
                        <p>Cards Point : {points.data[0].points}</p>
                    </>
                }
            </div>
            <div className={"allCards"}>
                <div>
                    <iframe id="twitch-chat-embed"
                            src="https://www.twitch.tv/embed/chromatyk/chat?parent=chromatyk.fr"
                            height="500"
                            width="350">
                    </iframe>
                    <iframe
                        src="https://player.twitch.tv/?channel=chromatyk&parent=chromatyk.fr"
                        height="<height>"
                        width="<width>"
                        allowFullScreen>
                    </iframe>
                </div>
                <div id={"cardsContainer"}>
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