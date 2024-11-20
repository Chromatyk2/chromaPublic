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
    const [isLoaded, setIsLoaded] = useState(true);
    const [things, setThings] = useState(true);
    const [error, setError] = useState(null);
    const [tenCards, setTenCards] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(true);
    let [state, setState] = useState("Initial");
    let [rarities, setRarities] = useState(null);
    function handleState() {
        setTimeout(() => {
            props.change();
        }, 1000);
    }
    useEffect(() => {
        fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster)
            .then(res => res.json())
            .then(
                (result) => {console.log(result)
                    setItems(result.data.cards);
                    setIsLoaded(false);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    console.log(items)
    useEffect(() => {
        Axios
            .get("/api/getRaritiesByBooster/"+props.idBooster)
            .then(function(response){
                setRarities(response.data);
            })
    }, [])
    const customStyles = {
        textModal: {
            fontSize:'30px',
            textAlign:'center',
            color:"white"
        },
        imgModal: {
            width:'200px',
            marginBottom:'30px',
            borderRadius: "25px",
            filter: "drop-shadow(2px 4px 6px black)"
        },imgModal2: {
            width:'200px',
            marginBottom:'30px',
            borderRadius: "25px",
            filter: "grayscale(1)"
        },
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoaded(false)
            const timeout = setTimeout(() => {
                setThings(false)

            }, 1000)
            return () => clearTimeout(timeout)
        }, 5000)

        return () => clearTimeout(timeout)
    }, []);
    return (
        <>
            <div className={"discoveredCardsContainer"}>
                <div style={{
                    display: things === true ? "flex" : "none" ,
                    justifyContent: "center",
                    height: "280px",
                    width: "300px"
                }}>
                    <div
                         className={isLoaded === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                        <img style={customStyles.imgModal2} src={"/Boosters/" + props.idBooster + ".png"}
                             alt="Grapefruit slice atop a pile of other slices"/>
                    </div>
                    <div style={{overflow: "hidden"}}
                         className={isLoaded === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                        <img style={customStyles.imgModal} src={"/Boosters/" + props.idBooster + ".png"}
                             alt="Grapefruit slice atop a pile of other slices"/>
                    </div>
                </div>
                {
                    items &&
                    <OpeningCards user={props.user} change={handleState} idBooster={props.idBooster} items={items}
                                  rarities={rarities}/>

                }
            </div>
        </>
    )
}

export default OpeningBooster
