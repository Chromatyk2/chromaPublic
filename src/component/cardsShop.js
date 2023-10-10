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
        Axios
            .get("/api/getBoostersList")
            .then(function(response){
                setItems(response.data);
            })
    }, [])
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
        var nbPick = document.getElementById("nbBoosterToBuy"+idBooster).value;
        var totalPointsRemove = 1000 * nbPick;
        Axios
            .get("/api/getCardsPoint/"+props.user)
            .then(function(response){
                if(response.data[0].points - totalPointsRemove >= 0){
                    return Axios.post('/api/removeCardsPoint',
                        {
                            user:props.user,
                            pointRemove:totalPointsRemove
                        }
                    ).then(
                        (result) => {
                            Axios
                                .get("/api/getCardsPoint/"+props.user)
                                .then(function(response){
                                    setPoints(response.data[0].points);
                                }).then(
                                (result) => {
                                    Axios
                                        .get("/api/getMyBoostersByOne/" + props.user + "/" + idBooster)
                                        .then(function (response) {
                                            console.log(response.data)
                                            if (response.data.length < 1) {
                                                Axios.post('/api/addBooster',
                                                    {
                                                        pseudo: props.user,
                                                        booster: idBooster,
                                                        nbBooster: nbPick
                                                    }).then(
                                                    (result) => {
                                                        setLoading(false);
                                                    })
                                            } else {
                                                Axios.post('/api/updateBooster',
                                                    {
                                                        pseudo: props.user,
                                                        booster: idBooster,
                                                        nbBooster: nbPick
                                                    }).then(
                                                    (result) => {
                                                        setLoading(false);
                                                    })
                                            }
                                        })
                                }
                            )
                        }
                    )
                }
            })
    }

    function buyBoosterRandom(e) {
        setLoading(true);
        var nbPick = document.getElementById("nbBoosterToBuyRandom").value;
        for(var i=0;i<nbPick;i++){
            var idBooster = items[Math.floor(Math.random() * items.length)].name;
            Axios
                .get("/api/getCardsPoint/" + props.user)
                .then(function (response) {
                        if (response.data[0].points - 500 >= 0) {
                            return Axios.post('/api/removeCardsPointRandom',
                                {
                                    user: props.user,
                                    pointRemove:500
                                }
                            ).then(
                                (result) => {
                                    Axios
                                        .get("/api/getCardsPoint/" + props.user)
                                        .then(function (response) {
                                            setPoints(response.data[0].points);
                                        }).then(
                                        (result) => {
                                            Axios
                                                .get("/api/getMyBoostersByOne/" + props.user + "/" + idBooster)
                                                .then(function (response) {
                                                    if (response.data === null) {
                                                        Axios.post('/api/addBooster',
                                                            {
                                                                pseudo: props.user,
                                                                booster: idBooster,
                                                                nbBooster: 1
                                                            }).then(
                                                            (result) => {
                                                                setLoading(false);
                                                            })
                                                    } else {
                                                        Axios.post('/api/updateBooster',
                                                            {
                                                                pseudo: props.user,
                                                                booster: idBooster,
                                                                nbBooster: 1
                                                            }).then(
                                                            (result) => {
                                                                setLoading(false);
                                                            })
                                                    }
                                                })
                                        }
                                    )
                                }
                            )
                        }
                    }
                )
        }
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

function selectGen(e) {
    if(e.target.value == "all"){
        Axios
            .get("/api/getBoostersList")
            .then(function(response){
                setItems(response.data);
            })
    }else{
        Axios
            .get("/api/getBoostersListByGen/"+ e.target.value)
            .then(function(response){
                setItems(response.data);
            })
    }
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
                    <p>Points Boutique : {points}</p>
                </div>
            }
        </div>
        <select className={"selectGen"} onChange={selectGen} name="pets" id="pet-select">
            <option value="all">All Gen</option>
            <option value="1">Gen 1</option>
            <option value="2">Gen 2</option>
            <option value="3">Gen 3</option>
            <option value="4">Gen 4</option>
            <option value="5">Gen 5</option>
            <option value="6">Gen 6</option>
            <option value="7">Gen 7</option>
            <option value="8">Gen 8</option>
            <option value="9">Gen 9</option>
        </select>
        <div id={"cardsContainer"}>
            {items &&
                <div className="uniqueTradeContainer">
                    <p className="pokemonNameTrade">Booster Aléatoire</p>
                    <div className={"containerImgBooster"}>
                        <img className="fit-picture" src={"/images/random.png"} alt="Grapefruit slice atop a pile of other slices"/>
                    </div>
                    <p className="pokemonNameTrade">500 Points Boutique</p>
                    {points > 499 ?
                        loading === false ?
                            <>
                                <button value={items[Math.floor(Math.random() * items.length)].name} onClick={buyBoosterRandom} className="guessTradeButton">Acheter</button>
                                <input className={"nbToBuy"} id={"nbBoosterToBuyRandom"} type="number" placeholder={"0"} min="0" max={Math.floor(points/1000)} />
                            </>
                            :
                            <button className="guessTradeButton">Chargement</button>
                        :
                        <button className="guessTradeButton">Card Points manquants</button>
                    }
                </div>
            }
            {items &&
                items.map((val, key) => {
                    return(
                        <div className="uniqueTradeContainer">
                            <div className={"containerImgBooster"}>
                                <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.name + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                            </div>
                            <p className="pokemonNameTrade">1000 Points Boutique</p>
                            {points > 999 ?
                                loading === false ?
                                    <>
                                        <button value={val.name} onClick={buyBooster} className="guessTradeButton">Acheter</button>
                                        <input className={"nbToBuy"} id={"nbBoosterToBuy"+val.name} type="number" placeholder={"0"} min="0" max={Math.floor(points/1000)} />
                                    </>
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
