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
        fetch("https://api.tcgdex.net/v2/fr/sets/"+props.idBooster)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.cards);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    return (
        <>
            <div class={"discoveredCardsContainer"}>
                {items &&
                    <OpeningCards change = {handleState} idBooster={props.idBooster} items={items}/>
                }
            </div>
        </>
    )
}
export default OpeningBooster
