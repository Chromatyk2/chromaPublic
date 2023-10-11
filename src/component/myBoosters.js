import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import OpeningBooster from "./openingBooster";
import UniqueBooster from "./uniqueBooster";

function MyBoosters(props) {
    const [boosters, setBoosters] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getMyBoosters/"+props.user)
            .then(function(response){
                setBoosters(response.data);
            })
    }, [])
    return (
        <>
            <div id={"cardsContainer"}>
                {boosters &&
                    boosters.map((val, key) => {
                        if(val.nbBooster > 0){
                            return(
                                <UniqueBooster booster={val}/>
                            )
                        }
                    })
                }
            </div>
        </>
    )
}
export default MyBoosters
