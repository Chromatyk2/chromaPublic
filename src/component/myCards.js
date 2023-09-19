import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';

function MyCards(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [nbCards, setNbCards] = useState(null);
    const [page, setPage] = useState(null);
    function displayPage(e) {
        setPage(e.target.value)
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
        <>
                { page ?
                      <>
                        <button onClick={backPage} className="guessTradeButton">Retour</button>
                        <MyCardsSet user={props.user} idBooster={page}/>
                      </>
                :
                    <div id={"cardsContainer"}>
                        {nbCards &&
                            nbCards.map((val, key) => {
                                return(
                                    <div className="uniqueTradeContainer">
                                        <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.booster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                                        <p className="pokemonNameTrade">{val.nbCard} carte(s)</p>
                                        <button value={val.booster} onClick={displayPage} className="guessTradeButton">Voir toute mes cartes</button>
                                    </div>
                                )
                            })}
                    </div>
                }
        </>
    )
}
export default MyCards
