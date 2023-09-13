import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';

function OpeningCards(props) {
    const [tenCards, setTenCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [nbCards, setNbCards] = useState(0);
    useEffect(() => {
        if (tenCards.length < 11) {
            fetch("https://api.tcgdex.net/v2/fr/cards/"+props.items[[Math.floor(Math.random() * props.items.length)]].id)
                .then(res => res.json())
                .then(
                    (result) => {
                        if(tenCards.length < 8){
                            if(result.rarity == "Commune"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }else if(tenCards.length > 7 && tenCards.length < 10){
                            if(result.rarity == "Peu Commune"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }else if(tenCards.length == 9){
                            if(result.rarity == "Rare"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }
                    }
                )
        }
    }, [nbCards])
   console.log(tenCards.length);
   console.log(nbCards);
    return (
        <>
            {tenCards &&
                tenCards.map((val, key) => {
                    return(
                        <img class="fit-picture" src={val.image+"/high.webp"} alt="Grapefruit slice atop a pile of other slices"/>
                    )
                })
            }
        </>
    )
}
export default OpeningCards
