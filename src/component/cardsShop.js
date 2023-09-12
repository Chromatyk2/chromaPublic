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
    return (
        <>
                {items &&
                    items.slice(0,1).map((val, key) => {
                        return(
                            <div className="uniqueTradeContainer">
                                <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.id + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                                <p className="pokemonNameTrade">{val.name}</p>
                                <p className="pokemonNameTrade">1000 Cards Points</p>
                                {props.points > 1000 ?
                                    <button className="guessTradeButton">Acheter</button>
                                    :
                                    <button className="guessTradeButton">Card Points manaquants</button>
                                }
                            </div>
                        )
                    })
                }
        </>
    )
}
export default CardsShop
