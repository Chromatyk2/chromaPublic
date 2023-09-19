import React,{useState, useEffect} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function CardsShop(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [points,setPoints] = useState(-1);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        fetch("https://api.tcgdex.net/v2/en/sets")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    useEffect(() => {
        Axios
            .get("/api/getCardsPoint/"+props.user)
            .then(function(response){
                setPoints(response.data[0].points);
            })
    }, [])
    function buyBooster(e) {
        setLoading(true);
        var idBooster = e.target.value;
        return Axios.post('/api/removeCardsPoint',
                {
                    user:props.user
                }
        ).then(
            (result) => {
                Axios
                    .get("/api/getCardsPoint/"+props.user)
                    .then(function(response){
                        setPoints(response.data[0].points);
                    }).then(
                    (result) => {
                        Axios.post('/api/addBooster',
                            {
                                pseudo:props.user,
                                booster:idBooster
                            }).then(
                            (result) => {
                                setLoading(false);
                            }
                        )
                    }
                )
            }
        )
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
                        setPoints(response.data[0].points);
                    })
            }
        )
    }
    return (
        <>
                <div>
                    {points &&
                    points == -1 ?
                        <div className="myPointsDisplay">
                        </div>
                        :
                        <div className="myPointsDisplay">
                            <p>Cards Point : {points}</p>
                        </div>
                    }
                </div>
                <div id={"cardsContainer"}>
                    {items &&
                        items.slice(0,2).map((val, key) => {
                            return(
                                <div className="uniqueTradeContainer">
                                    <div className={"containerImgBooster"}>
                                        <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.id + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                                    </div>
                                    <p className="pokemonNameTrade">1000 Cards Points</p>
                                    {points > 999 ?
                                        loading === false ?
                                            <button value={val.id} onClick={buyBooster} className="guessTradeButton">Acheter</button>
                                            :
                                            <button className="guessTradeButton">Chargement</button>
                                        :
                                        <button className="guessTradeButton">Card Points manquants</button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
        </>
    )
}
export default CardsShop
