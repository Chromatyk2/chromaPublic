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
import ListUserTcg from "./listUserTcg";
import Countdown from 'react-countdown';
import SellCards from "./SellCards.js";
import Succes from "./Succes.js";
import OnStream from "./onStream";
function CardsHub(props) {
    const [points,setPoints] = useState(-1);
    const [timer,setTimer] = useState(null);
    const [diff,setDiff] = useState(null);
    const pseudo = props.cookies.user.data[0].login;
    const [canGetPoint,setCanGetPoint] = useState(false);
    const [twoHour,setTwoHour] = useState(null);
    const [timestamp,setTimestamp] = useState(null);
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
    useEffect(() => {
        if(timer !== null){
            if(timer.length > 0) {
                setTimestamp((new Date(timer[0].hour).getTime() / 1000)  + 3600);
                setTwoHour((new Date().getTime() / 1000));
                setDiff((((new Date(timer[0].hour).getTime() / 1000)  + 3600)  - (new Date().getTime() / 1000)) * 1000);
                if ((new Date(timer[0].hour).getTime() / 1000)  + 3600 <= (new Date().getTime() / 1000)) {
                    setCanGetPoint(true);
                } else {
                    setCanGetPoint(false);
                }
            }else{
                setCanGetPoint(true);
            }
        }
    }, [timer])
    function addPointButton() {
        setCanGetPoint(false);
            if (timer.length == 0) {
                    Axios.post('/api/addButtonClick',
                        {
                            pseudo: pseudo,
                            hour: new Date()
                        }).then(
                        (result) => {
                            Axios
                                .get("/api/getDateButton/" + pseudo)
                                .then(function (response) {
                                    setTimer(response.data);
                                }).then(
                                (result) => {
                                    Axios.post('/api/registerCards',
                                        {
                                            pseudo: pseudo
                                        }
                                    )
                                }
                            )
                        }
                    )
            } else{
                    Axios
                        .get("/api/getDateButton/"+pseudo)
                        .then(function(response){
                            setTimestamp((new Date(response.data[0].hour).getTime() / 1000)  + 3600);
                            setTwoHour((new Date().getTime() / 1000));
                            setDiff((((new Date(response.data[0].hour).getTime() / 1000)  + 3600)  - (new Date().getTime() / 1000)) * 1000);
                            if((new Date(response.data[0].hour).getTime() / 1000)  + 3600 <= (new Date().getTime() / 1000)){
                                Axios.post('/api/updateButtonTime',
                                    {
                                        hour: new Date(),
                                        pseudo: pseudo
                                    }
                                ).then(
                                    (result) => {
                                        Axios
                                            .get("/api/getDateButton/" + pseudo)
                                            .then(function (response) {
                                                setTimer(response.data);
                                            }).then(
                                            (result) => {
                                                Axios.post('/api/addCardsPointButton',
                                                    {
                                                        user: pseudo
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        })
            }
    }
    return(
        <>
            <OnStream />
            <div className={"allCards"}>
                <div className={"countdown"}>
                    <p>Prochain drop dans : </p>
                    {diff &&
                        <Countdown date={Date.now() + diff}>
                            <p>Points disponibles!</p>
                        </Countdown>
                    }
                </div>
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
                    {props.page === null &&
                        <div className={"introTCGtext"}>
                            <p>
                                Bienvenue sur la partie du site consacrée à la collection de cartes Pokémon !!!<br />
                                Ici, l'aventure commence dès que tu cliques sur le bouton rouge !<br />
                                Le premier clique t'offre 10 000 points pour la boutique !<br />
                                Ensuite reviens cliquer sur le bouton tous les 1h pour en gagner 1 000 à chaque fois !<br />

                                Ce mini site a été fait par Chromatyk !<br />
                                Retrouve le en stream ici : <a className={"introTCGLink"} href={"https://twitch.tv/chromatyk"}>Chaîne de Chromatyk</a><br />
                                Il est également possible de gagner des points grâce aux points de chaines cumulés lors des streams !<br />

                                N'hésite pas à Follow ça fait toujours plaisir !<br />

                                Amuse toi bien !
                            </p>
                        </div>
                    }
                {timer &&
                timer.length == 0 ?
                    canGetPoint === true ?
                        <div className={"buttonToPointContainer"}>
                            <p className={"textButtonPoint"}>Appuie pour gagner 10000 points</p>
                            <p className={'buttonArrow'}>↓</p>
                            <button className={"buttonToPoint"} onClick={addPointButton}>+</button>
                        </div>
                        :
                        <div className={"buttonToPointContainer disableButtonPoint"}>
                            <p className={"textButtonPoint"}>Appuie pour gagner 10000 points</p>
                            <p className={'buttonArrow'}>↓</p>
                            <button className={"buttonToPoint"} onClick={addPointButton} disabled>+</button>
                        </div>
                    :
                    canGetPoint === true ?
                        <div className={"buttonToPointContainer"}>
                            <p className={"textButtonPoint"}>Appuie pour gagner 1000 points</p>
                            <p className={'buttonArrow'}>↓</p>
                            <button className={"buttonToPoint"} onClick={addPointButton}>+</button>
                        </div>
                        :
                        <div className={"buttonToPointContainer disableButtonPoint"}>
                            <p className={"textButtonPoint"}>Appuie pour gagner 1000 points</p>
                            <p className={'buttonArrow'}>↓</p>
                            <button className={"buttonToPoint"} onClick={addPointButton} disabled>+</button>
                        </div>
                }
                    {props.page == "myCards" &&
                        <MyCards user={pseudo} />
                    }
                    {props.page == "cardsShop" &&
                        <CardsShop user={pseudo} points={points}/>
                    }
                    {props.page == "myBoosters" &&
                        <MyBoosters user={pseudo}/>
                    }
                    {props.page == "listuserTcg" &&
                        <ListUserTcg user={pseudo}/>
                    }
                    {props.page == "sellCards" &&
                        <SellCards user={pseudo}/>
                    }
                    {props.page == "succes" &&
                        <Succes user={pseudo}/>
                    }
            </div>
        </>
    );
}

export default CardsHub;