import React,{useState, useEffect} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";

function CardsShop(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [points,setPoints] = useState(-1);
    const [loading,setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [boosterId, setBoosterId] = React.useState(null);
    const [canOpenLive, setCanOpenLive] = React.useState(null);
    console.log()
    const customStyles = {
        content: {
            position:'initial',
            border: 'none',
            background: 'none',
            borderRadius: '4px',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
    };
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
                setPoints(response.data[0].cardToken);
                Axios.get("/api/getProfil/"+props.user)
                    .then(function(response){
                        console.log(Date.now());
                        console.log(new Date(moment(response.data[0].lastOpening).format('YYYY-MM-DD h:mm:ss')).getTime());
                        if(response.data[0].canOpen == 1){
                            setCanOpenLive(response.data[0].canOpen)
                        }else{
                            if(Date.now() - new Date(moment(response.data[0].lastOpening).format('YYYY-MM-DD h:mm:ss')).getTime() + 36000 > 3600){
                                setCanOpenLive(0)
                            }else{
                                setCanOpenLive(1)
                            }
                        }
                    })
            })
    }, [])

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
                    setPoints(response.data[0].cardToken);
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
    function openModal(e) {
        var button = e.currentTarget;
        var nbBooster = e.target.getAttribute("nbBooster");
        button.disabled = true;
        var id = e.target.value;
        setBoosterId(id);
        Axios
            .get("/api/getCardsPoint/"+props.user)
            .then(function(response){
                if(response.data[0].cardToken - 1 > -1){
                    return Axios.post('/api/removeCardsPoint',
                        {
                            user:props.user
                        }
                    )
                        .then(function(response) {
                            Axios
                                .get("/api/getCardsPoint/"+props.user)
                                .then(function(response){
                                    setPoints(response.data[0].cardToken);
                                    setIsOpen(true);
                                    button.disabled = false;
                                })
                        })
                }
            })
    }

    function freeBooster(e) {
        var button = e.currentTarget;
        var nbBooster = e.target.getAttribute("nbBooster");
        button.disabled = true;
        var id = e.target.value;
        setBoosterId(id);
        Axios
            .get("/api/getCanOpen/"+props.user)
            .then(function(response){
                if(response.data[0].canOpen - 1 > -1 || canOpenLive == 1){
                    return Axios.post('/api/removeCanOpen',
                        {
                            pseudo:props.user,
                            today:new Date().toISOString().slice(0, 19).replace('T', ' ')
                        }
                    )
                        .then(function(response) {
                            Axios
                                .get("/api/getCanOpen/"+props.user)
                                .then(function(response){
                                    setCanOpenLive(0);
                                    setIsOpen(true);
                                    button.disabled = false;
                                })
                        })
                }
            })
    }

    function closeModal() {
        setIsOpen(false);
    }
    function handleState() {
        setIsOpen(false);
    }
    console.log(canOpenLive);
return (
    <>
        {canOpenLive !== null &&
            <>
                <div>
                    {points &&
                    points == -1 ?
                        <div className="myPointsDisplay">
                        </div>
                        :
                        <div className="myPointsDisplay">
                            <p style={{color: "white",}}>Token TCG : {points}</p>
                        </div>
                    }
                    {canOpenLive == 1 &&
                        <div className="myPointsDisplay">
                            <p style={{color: "red",}}>Vous avez votre Booster gratuit !</p>
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
                                <img className="fit-picture" src={"/images/random.png"}
                                     alt="Grapefruit slice atop a pile of other slices"/>
                            </div>
                            {points > 0 ?
                                loading === false ?
                                    <div>
                                        <button value={items[Math.floor(Math.random() * items.length)].name}
                                                onClick={openModal}
                                                className="guessTradeButton">Ouvrir
                                        </button>
                                    </div>
                                    :
                                    <button className="guessTradeButton">Chargement</button>
                                :
                                <button className="guessTradeButton">Aucun Token</button>
                            }
                            {canOpenLive == 1 &&
                                <div style={{position: "relative", bottom: "-44px"}}>
                                    <button value={items[Math.floor(Math.random() * items.length)].name}
                                            onClick={freeBooster}
                                            className="guessTradeButton">Booster Gratuit
                                    </button>
                                </div>
                            }
                        </div>
                    }
                    {items &&
                        items.map((val, key) => {
                            return (
                                <div className="uniqueTradeContainer">
                                    <div className={"containerImgBooster"}>
                                        <img className="fit-picture"
                                             src={"https://images.pokemontcg.io/" + val.name + "/logo.png"}
                                             alt="Grapefruit slice atop a pile of other slices"/>
                                    </div>
                                    {points > 0 ?
                                        loading === false ?
                                            <div style={{position: "relative", bottom: "-44px"}}>

                                                <button value={val.name}
                                                        onClick={openModal}
                                                        className="guessTradeButton">Ouvrir
                                                </button>
                                            </div>
                                            :
                                            <div style={{position: "relative", bottom: "-44px"}}>
                                                <button className="guessTradeButton">Chargement</button>
                                            </div>
                                        :
                                        <div style={{position: "relative", bottom: "-44px"}}>
                                            <button className="guessTradeButton">Aucun Token</button>
                                        </div>
                                    }
                                    {canOpenLive == 1 &&
                                        <div style={{position: "relative", bottom: "-44px"}}>

                                            <button value={val.name}
                                                    onClick={freeBooster}
                                                    className="guessTradeButton">Booster Gratuit
                                            </button>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </>
        }
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
               contentLabel="Example Modal">
            <OpeningBooster change={handleState} idBooster={boosterId} user={props.user}/>
        </Modal>

    </>
)
}

export default CardsShop
