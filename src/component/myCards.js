import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';
import MyUniqueBooster from "./myUniqueBooster";
import ProgressBarCard from "./progressBarCard";

function MyCards(props) {
    const [nbCards, setNbCards] = useState(null);
    const [nbCard, setNbCard] = useState(null);
    const [totalCard, setTotalCard] = useState(null);
    const [totalCardUser, setTotalCardUser] = useState(null);
    const [page, setPage] = useState(null);
    function displayPage(e,f) {
        setPage(e);
        setNbCard(f);
    }
    function backPage() {
        setPage(null)
    }
    useEffect(() => {
        Axios
            .get("/api/getNbCards/"+props.user)
            .then(function(response){
                setNbCards(response.data);
                let sum = (response.data.reduce(function(prev, current) {
                    return prev + +current.nbCard
                }, 0));
                setTotalCardUser(sum);
                Axios.get("/api/getTotalCard")
                    .then(function(response){
                        setTotalCard(response.data);
                        console.log(response.data);
                    })
            })
    }, [])
    return (
        <>
            {totalCard &&
                <ProgressBarCard getNb={totalCardUser} item={totalCard.totalCard}/>
            }
            <div id={"cardsContainer"}>
                { page ?
                        <>
                            <button style={{width:"100%",margin:"0",padding:"0"}}onClick={backPage} className="backButton">Retour</button>
                            <MyCardsSet user={props.user} card={nbCard} idBooster={page}/>
                        </>
                    :
                        nbCards &&
                            nbCards.map((val, key) => {
                                return(
                                    <MyUniqueBooster page={val.booster} change = {displayPage} nbCard={val} />
                                )
                            })
                }
            </div>
        </>
    )
}
export default MyCards
