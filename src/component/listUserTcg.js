import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import OpeningBooster from "./openingBooster";

function ListUserTcg(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [list, setList] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [boosterId, setBoosterId] = React.useState(null);

    useEffect(() => {
        Axios
            .get("/api/getListUser")
            .then(function(response){
                setList(response.data);
            })
    }, [])

    return (
        <>
            <div className={"listUser"}>
                {list &&
                    list.map((val, key) => {
                        return(
                            <div className="listUserElement">
                                <p>{val.user}</p>
                                <p>{val.nbCardUser}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default ListUserTcg
