import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';

function OpeningCards(props) {
    const [tenCards, setTenCards] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch("https://api.tcgdex.net/v2/fr/cards/:"+props.items[[Math.floor(Math.random() * props.items.length)]].id)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTenCards(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    console.log(tenCards)
    return (
        <>
            <p>Test</p>
        </>
    )
}
export default OpeningCards
