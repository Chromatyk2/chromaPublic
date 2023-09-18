import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function MyCardsSet(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [myCards, setMyCards] = useState([]);
    useEffect(() => {
        fetch("https://api.tcgdex.net/v2/fr/sets/"+props.idBooster)
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
            .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
            .then(function(response){
              console.log(response);
              setMyCards(response.data);
            })
    }, [])
    console.log(myCards);
    return (
        <>
            <div id={"cardsContainer"}>
                {items &&
                    items.cards.map((val, key) => {
                      if(myCards.includes(val.id)){
                        return(
                            <img class="fit-picture" src={val.image+"/high.webp"} alt="Grapefruit slice atop a pile of other slices"/>
                        )
                      }else{
                          <img class="fit-picture" src={"https://images.pokemontcg.io/none/1.png"} alt="Grapefruit slice atop a pile of other slices"/>
                      }
                    })
                }
            </div>
        </>
    )
}
export default MyCardsSet
