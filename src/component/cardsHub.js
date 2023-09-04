import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function CardsHub(props) {
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);
  useEffect(() => {
   fetch("https://api.tcgdex.net/v2/fr/sets/base1")
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
          items.map((val, key) => {
          return <img
            class="fit-picture"
            src={val.cards.image+"/high.webp"}
            alt="Grapefruit slice atop a pile of other slices"
          />
        })}
      </>
    )
  }
export default CardsHub
