import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import OpeningCards from "./openingCards";

function OpeningBooster(props) {
    const [items, setItems] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [tenCards, setTenCards] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(true);
    let [state, setState] = useState("Initial");
    function handleState() {
        setTimeout(() => {
            props.change();
        }, 2000);
    }
    useEffect(() => {
        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:"+props.idBooster)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(false);
                    setItems(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    return (
        <>
            {isLoaded === true &&
                <div className={"discoveredCardsContainer"}>
                    <h2 className="u-text-center">Chargement ...</h2>
                    <div className="pokemon"></div>
                </div>
            }
            {isLoaded === false &&
                <div className={"discoveredCardsContainer"}>
                    {items &&
                        <OpeningCards user={props.user} change={handleState} idBooster={props.idBooster} items={items}/>
                    }
                </div>
            }
        </>
    )
}
export default OpeningBooster
