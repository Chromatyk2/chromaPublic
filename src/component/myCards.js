import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function MyCards(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [nbCards, setNbCards] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getNbCards/"+props.user)
            .then(function(response){
                setNbCards(response.data);
            })
    }, [])
    return (
        <>
            <div id={"cardsContainer"}>
                {nbCards &&
                    nbCards.map((val, key) => {
                        return(
                            <div className="uniqueTradeContainer">
                                <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.booster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                                <p className="pokemonNameTrade">{val.nbCard}</p>
                                <button value={val.booster} className="guessTradeButton">Voir toute mes cartes</button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default MyCards
