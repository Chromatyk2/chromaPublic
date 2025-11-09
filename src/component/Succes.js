import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';
import MyUniqueBooster from "./myUniqueBooster";
import MyUniqueSucces from "./MyUniqueSucces";
import ProgressBarCard from "./progressBarCard";

function Succes(props) {
    const [categorie,setCategorie] = useState("Pokemon");
    const [number,setNumber] = useState(1025);
    return (
        <>
            <div id={"cardsContainer"}>
                {categorie == "Pokemon" &&
                    Array.from(Array(number), (e, i) => {
                        return <img key={i} src={"/Ribbon/pokemon"+number+".png"} />
                    })
                }
            </div>
        </>
    )
}
export default Succes
