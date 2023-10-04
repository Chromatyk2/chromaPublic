import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import ProgressBarCard from "./progressBarCard";
import UniqueCard from "./UniqueCard.js";
import Modal from "react-modal";

function MyCardSell(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [items, setItems] = useState(null);
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    const [myCardNb, setMyCardNb] = React.useState(null);
    const [myCardImage, setMyCardImage] = React.useState(null);
    const [pokemonName, setPokemonName] = React.useState(null);
    const [cardId, setCardId] = React.useState(null);
    const [errorCard, setErrorCard] = React.useState("");
    const [cardToSell, setCardToSell] = useState([{}]);
    const customStyles = {
        content: {
            position:'initial',
            border: 'none',
            background: 'none',
            borderRadius: '4px',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow:'hidden'
        },
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
        buttonMyCard: {
            border:'none',
            background:'none',
            padding:0
        },
    };
    useEffect(() => {
        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:"+props.idBooster)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(false);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    useEffect(() => {
        Axios
            .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
            .then(function(response){
                setMyCards(response.data);
            })
    }, [])
    useEffect(() => {
        myCards.map((val, key) => {
            setMyCardsId(myCardsId => [...myCardsId,val.card]);
        })
    }, [myCards]);
    function handleClick(e) {
        var cardId = e.target.getAttribute("cardId");
        var cardNb = e.target.getAttribute("myCardNb");
        setCardToSell(cardToSell => [...cardToSell,{card: 'Carl',nbToSell:1}]);
    }
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+e.target.getAttribute("cardId")+".png";
    }
    console.log(cardToSell);
    return (
        <>

            {isLoaded === false &&
                <ProgressBarCard getNb={myCards.length} item={{items}}/>
            }
            {isLoaded === true &&
                <div className={"loaderPokemon"}>
                    <h2 className="u-text-center">Chargement ...</h2>
                    <div className="pokemon"></div>
                </div>
            }
            {isLoaded === false &&
                <>
                    <div id={"cardsContainer"}>
                        {items &&
                            items.data.map((val, key) => {
                                if (myCardsId.includes(val.id)) {
                                    let cardNb = myCards.find((myCard) => myCard.card.includes(val.id));
                                    return (
                                        <button style={customStyles.buttonMyCard} onClick={handleClick} className={"cardBox"}>
                                            <img cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                                 image={val.image} className="fit-picture-card"
                                                 src={"https://images.pokemoncard.io/images/" + props.idBooster + "/" + val.id + "_hiresopt.jpg"}
                                                 onError={errorImage}/>
                                        </button>
                                    )
                                }
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}
export default MyCardSell
