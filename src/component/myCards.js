import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';
import MyUniqueBooster from "./myUniqueBooster";

function MyCards(props) {
    const [nbCards, setNbCards] = useState(null);
    const [nbCard, setNbCard] = useState(null);
    const [page, setPage] = useState(null);
    function displayPage(e) {
        setPage(props.change(page))
        setNbCard(props.change(nbCard))
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
                                    <MyUniqueBooster setNbCard = {setNbCard(e)} setPage = {setPage(e)} change={displayPage} nbCard={val} />
                                )
                            })
                }
            </div>
        </>
    )
}
export default MyCards
