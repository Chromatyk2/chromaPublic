import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import OpeningCards from "./openingCards";

function UniqueCard(props) {
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
        return (
            <>
                <div class={"discoveredCardsContainer"}>
                    <img myCardNb={cardNb.nbCard} image={val.image} className="fit-picture-card" src={props.cardImage + "/high.webp"}/>
                    <p>{props.cardNb}</p>
                </div>
            </>
        )
    }
}
export default UniqueCard
