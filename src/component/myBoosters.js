import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function MyBoosters(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
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
                        return(
                            <div className="uniqueTradeContainer">
                                <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.booster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default MyBoosters
