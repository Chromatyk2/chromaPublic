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
import OnStream from "./onStream";
function CardsHub(props) {
    const pseudo = props.cookies.user.data[0].login;
    const idUser = props.cookies.user.data[0].id;
    return(
        <>
                <div className={"allCards"}>
                    {props.page == "myCards" &&
                        <MyCards idUser={idUser} user={pseudo}/>
                    }
                    {props.page == "cardsShop" &&
                        <CardsShop idUser={idUser} user={pseudo}/>
                    }
                    {props.page == "myBoosters" &&
                        <MyBoosters idUser={idUser} user={pseudo}/>
                    }
                    {props.page == "listuserTcg" &&
                        <ListUserTcg idUser={idUser} user={pseudo}/>
                    }
                    {props.page == "sellCards" &&
                        <SellCards idUser={idUser} user={pseudo}/>
                    }
                </div>
        </>
    );
}

export default CardsHub;