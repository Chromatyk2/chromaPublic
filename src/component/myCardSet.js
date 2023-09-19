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
    const [myCardsId, setMyCardsId] = useState([]);
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
                <div className="fullProgressBar">
                    <div style="width:25%">{items.cardCount.total+"/"+props.card}</div>
                 </div>
            }
            <div id={"cardsContainer"}>
                {items &&
                    items.cards.map((val, key) => {
                      if(myCardsId.includes(val.id)){
                        let cardNb = myCards.find((myCard) => myCard.card.includes(val.id));
                        return(
                          <div className={"cardBox"}>
                            <p className={"nbCardList"}>{cardNb.nbCard}</p>
                            <img class="fit-picture" src={val.image+"/high.webp"} />
                          </div>
                        )
                      }else{
                        return(
                          <img class="fit-picture" src={"/images/backCard.png"} />
                        )
                      }
                    })
                }
            </div>
        </>
    )
}
export default MyCardsSet
