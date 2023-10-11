import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';

function MyUniqueBooster(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [nbCards, setNbCards] = useState(null);
    const [nbCard, setNbCard] = useState(null);
    const [page, setPage] = useState(null);
    function displayPage(e) {
        props.change();
        props.setPage(e.target.value)
        props.setNbCard(e.target.getAttribute("nbCard"))
    }
    function backPage() {
        setPage(null)
    }
    useEffect(() => {
        Axios
            .get("/api/getNbCards/"+props.user)
            .then(function(response){
                setNbCards(response.data);
            })
    }, [])
    return (
                            <div className="uniqueTradeContainer">
                                <div className={"containerImgBooster"}>
                                    <img className="fit-picture" src={"https://images.pokemontcg.io/" + props.nbCard.booster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                                </div>
                                <p className="pokemonNameTrade">{props.nbCard.nbCard} carte(s)</p>
                                <button value={props.nbCard.booster} onClick={displayPage} className="guessTradeButton">Voir toute mes cartes</button>
                            </div>
    )
}
export default MyUniqueBooster
