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
    const pseudo = props.cookies.user.data[0].login;
    return(
        <>
            <div className={"contentContainer"}>
                <div className={"allCards"}>
                    {props.page == "myCards" &&
                        <MyCards user={pseudo}/>
                    }
                    {props.page == "cardsShop" &&
                        <CardsShop user={pseudo}/>
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
            </div>
        </>
    );
}

export default CardsHub;