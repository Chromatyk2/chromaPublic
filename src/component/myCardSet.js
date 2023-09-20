import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import ProgressBarCard from "./progressBarCard";

function MyCardsSet(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    useEffect(() => {
        fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster)
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
              setMyCards(response.data);
            })
    }, [])
    useEffect(() => {
      myCards.map((val, key) => {
        setMyCardsId(myCardsId => [...myCardsId,val.card]);
      })
    }, [myCards]);

    return (
        <>
            {items &&
                <ProgressBarCard getNb={myCards.length} item={{items}}/>
            }
            <div id={"cardsContainer"}>
                {items &&
                    items.cards.map((val, key) => {
                      if(myCardsId.includes(val.localId)){
                        return(
                          <div className={"cardBox"}>
                            <img value={val.localId} class="fit-picture-card" src={"https://images.pokemontcg.io/"+props.idBooster+"/"+val.localId+"_hires.png"} />
                          </div>
                        )
                      }else{
                        return(
                          <img value={val.localId} class="fit-picture-card" src={"/images/backCard.png"} />
                        )
                      }
                    })
                }
            </div>
        </>
    )
}
export default MyCardsSet
