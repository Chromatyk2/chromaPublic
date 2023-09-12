import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function CardsShop(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    useEffect(() => {
        fetch("https://api.tcgdex.net/v2/en/sets")
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
    return (
        <>
                {items &&
                    <img className="fit-picture" src={"https://images.pokemontcg.io/" + val[0].id + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                }
        </>
    )
}
export default CardsShop
