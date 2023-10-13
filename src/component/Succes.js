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

function Succes(props) {
    const [nbCards, setNbCards] = useState(null);
    const [totalCard, setTotalCard] = useState(null);
    const [boosterList, setBoosterList] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getNbCards/"+props.user)
            .then(function(response){
                setNbCards(response.data);
                let sum = (response.data.reduce(function(prev, current) {
                    return prev + +current.nbCard
                }, 0));
                Axios.get("/api/getBoosterTotalCard")
                    .then(function(response){
                        setBoosterList(response.data);
                        let sumBooster = (response.data.reduce(function(prev, current) {
                            return prev + +current.totalCards
                        }, 0));
                        setTotalCard(sumBooster);
                    })
            })
    }, [])
    return (
        <>
            <div id={"cardsContainer"}>
                {totalCard &&
                    nbCards &&
                    totalCard &&
                    nbCards.sort((a, b) => b.nbCard - a.nbCard).map((val, key) => {
                        return(
                            <p>Oui</p>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Succes
