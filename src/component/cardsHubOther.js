import React,{useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
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
import OnStream from "./onStream";
import OtherMyCards from "./myCardsOther";
function CardsHubOther(props) {
    const [points,setPoints] = useState(-1);
    const [canOpen,setCanOpen] = useState(-1);
    const { pseudo } = useParams()
    const myPseudo = props.cookies.user.data[0].login;
    useEffect(() => {
        Axios
            .get("/api/getCardsPoint/"+pseudo)
            .then(function(response){
                Axios.get("/api/getCanOpen/"+pseudo)
                    .then(function(response){
                        setCanOpen(response.data[0].canOpen)
                        Axios.get("/api/getCanOpen/"+pseudo)
                            .then(function(response){
                                setCanOpen(response.data[0].canOpen)
                            })
                    })
                setPoints(response.data[0].points);
            })
    }, [])
    return(
        <>
                <div className={"allCards"}>
                    {props.page == "myCards" &&
                        <OtherMyCards myPseudo={myPseudo} user={pseudo}/>
                    }
                    {props.page == "cardsShop" &&
                        <CardsShop canOpen={canOpen} user={pseudo} points={points}/>
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
                </div>
        </>
    );
}

export default CardsHubOther;