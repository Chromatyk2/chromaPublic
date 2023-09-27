import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import 'react-tooltip/dist/react-tooltip.css'
import MyCards from './myCards.js';
import CardsShop from './cardsShop.js';
import NavBar from "./navbar";
import Axios from 'axios'
import MyBoosters from "./myBoosters";
function CardsHub(props) {
    const [points,setPoints] = useState(-1);
    const [timer,setTimer] = useState(null);
    const pseudo = props.cookies.user.data[0].login;
    const oneHour = 60*60*1000;
    useEffect(() => {
        Axios
            .get("/api/getCardsPoint/"+pseudo)
            .then(function(response){
                setPoints(response.data[0].points);
            })
    }, [])
    useEffect(() => {
        Axios
            .get("/api/getDateButton/"+pseudo)
            .then(function(response){
                setTimer(response.data);
            })
    }, [])
    const [page, setPage] = useState(null);
    function displayTcgContent(e) {
        setPage(e.target.value)
    }
    function addPointButton() {
        if(timer.length == 0){
            Axios.post('/api/addButtonClick',
                {
                    pseudo:pseudo,
                    hour:new Date()
                }).then(
                (result) => {
                    Axios
                        .get("/api/getDateButton/"+pseudo)
                        .then(function(response){
                            setTimer(response.data);
                        }).then(
                        (result) =>{
                            Axios.post('/api/registerCards',
                                {
                                    pseudo:pseudo
                                }
                            )
                        }
                    ).then(
                        (result) =>{
                            console.log(timer);
                            console.log(new Date(timer[0].hour).getTime());
                        }
                    )
                }
            )
        }else{
            Axios.post('/api/updateButtonTime',
                {
                    hour:new Date(),
                    pseudo:pseudo
                }
            ).then(
                (result) => {
                    Axios
                        .get("/api/getDateButton/"+pseudo)
                        .then(function(response){
                            setTimer(response.data);
                        }).then(
                        (result) =>{
                            Axios.post('/api/addCardsPointButton',
                                {
                                    user:pseudo
                                }
                            )
                        }
                    ).then(
                        (result) =>{
                            console.log(timer);
                            console.log(new Date(timer[0].hour).getTime());
                        }
                    )
                }
            )
        }
    }

    return(
        <>
            <div className="leaderBoardSwitch">
                <button value="myCards" onClick={displayTcgContent}>Mes Cartes</button>
                <button value="myBoosters" onClick={displayTcgContent}>Mes Boosters</button>
                <button value="cardsShop" onClick={displayTcgContent}>Boutique</button>
            </div>
            <div className={"allCards"}>
                <div>
                    {/*<iframe id="twitch-chat-embed"*/}
                    {/*        src="https://www.twitch.tv/embed/chromatyk/chat?parent=chromatyk.fr"*/}
                    {/*        height="500"*/}
                    {/*        width="350">*/}
                    {/*</iframe>*/}
                    {/*<iframe*/}
                    {/*    src="https://player.twitch.tv/?channel=chromatyk&parent=chromatyk.fr"*/}
                    {/*    height="<height>"*/}
                    {/*    width="<width>"*/}
                    {/*    allowFullScreen>*/}
                    {/*</iframe>*/}
                    <button onClick={addPointButton}>Prendre les points</button>
                </div>
                    {page == "myCards" &&
                        <MyCards user={pseudo} />
                    }
                    {page == "cardsShop" &&
                        <CardsShop user={pseudo} points={points}/>
                    }
                    {page == "myBoosters" &&
                        <MyBoosters user={pseudo}/>
                    }
            </div>
        </>
    );
}

export default CardsHub;