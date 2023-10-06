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

function MyCardsSet(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [items, setItems] = useState(null);
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [myCardNb, setMyCardNb] = React.useState(null);
    const [myCardImage, setMyCardImage] = React.useState(null);
    const [pokemonName, setPokemonName] = React.useState(null);
    const [cardId, setCardId] = React.useState(null);
    const [errorCard, setErrorCard] = React.useState("");
    const [rarities, setRarities] = useState(null);
    const [stadeCard, setStadeCard] = useState(0);
    const [filterRarity, setFilterRarity] = React.useState("");
    const [onlyMine, setOnlyMine] = React.useState(true);
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
        Axios
            .get("/api/getRaritiesByBooster/"+props.idBooster)
            .then(function(response){
                setRarities(response.data);
            })
    }, [])
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
    function openModal(e) {
        setMyCardImage(e.target.getAttribute("image"));
        setMyCardNb(e.target.getAttribute("myCardNb"));
        setPokemonName(e.target.getAttribute("pokemonId"));
        setCardId(e.target.getAttribute("cardId"));
        setStadeCard(e.target.getAttribute("stade"));
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    function handleState() {
        setIsOpen(false);
    }
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+e.target.getAttribute("cardId")+".png";
    }
    function handleState() {
        setIsOpen(false);
    }
    const handleChangeOnlyMine = event => {
        if (event.target.checked) {
            setOnlyMine(false);
        } else {
            setOnlyMine(true);
        }
    };
    const handleRarity = event => {
        setFilterRarity(event.target.value);
    };
    console.log(rarities);
    return (
        <>

            {isLoaded === false &&
                <ProgressBarCard getNb={myCards.length} item={{items}}/>
            }
            {isLoaded === true &&
                <>
                    <div className={"loaderPokemon"}>
                        <h2 className="u-text-center">Chargement ...</h2>
                        <div className="pokemon"></div>
                    </div>

                    <div style={{display:"flex",width:"100%",justifyContent:"center",flexWrap:"wrap"}}>
                        <label htmlFor="subscribe">
                            <input
                                type="checkbox"
                                onChange={handleChangeOnlyMine}
                                id="subscribe"
                                name="subscribe"
                            />
                            Voir les cartes manquantes
                        </label>
                        <button value={""} onClick={handleRarity}>Toutes</button>
                        <button value={"Common"} onClick={handleRarity}>Toutes</button>
                        <button value={"Uncommon"} onClick={handleRarity}>Toutes</button>
                        { rarities.map((uR, key) => {
                            <p>{uR.rarity}</p>
                        })}
                    </div>
                </>
            }
            {isLoaded === false &&
                <>
                    <div id={"cardsContainer"}>
                        {items &&
                            items.data.filter(item => item.rarity.includes(filterRarity)).sort((a, b) => a.number - b.number).map((val, key) => {
                                if (myCardsId.includes(val.id)) {
                                    if(val.rarity != "Common" && val.rarity != "Uncommon" && typeof stadeB !== "undefined"){
                                        var stadeC = rarities.find((uc) => uc.rarity.includes(val.rarity)).stade;
                                    }else{
                                        var stadeC = 0;
                                    }
                                    let cardNb = myCards.find((myCard) => myCard.card.includes(val.id));
                                    return (
                                        <button style={customStyles.buttonMyCard} onClick={openModal} className={"cardBox"}>
                                            <img stade={stadeC} style={{filter:stadeC == 1 ? "drop-shadow(rgb(17, 208, 154) 0px 0px 5px) drop-shadow(rgb(17, 210, 154) 0px 0px 5px) drop-shadow(rgb(17, 208, 154) 0px 0px 5px)" : stadeC == 2 ? "drop-shadow(rgb(14, 208, 214) 0px 0px 3px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px)" : stadeC == 3 && "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"}} cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                                 image={val.image} className={stadeC == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}
                                                 src={"https://images.pokemoncard.io/images/" + props.idBooster + "/" + val.id + "_hiresopt.jpg"}
                                                 onError={errorImage}/>
                                        </button>
                                    )
                                }else if(!onlyMine){
                                    return (
                                        <img style={{filter:"grayscale(1)"}} className={"fit-picture-card"} src={"https://images.pokemoncard.io/images/" + props.idBooster + "/" + val.id + "_hiresopt.jpg"} onError={errorImage}/>
                                    )
                                }
                            })
                        }
                    </div>
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                           contentLabel="Example Modal">
                        <UniqueCard stade={stadeCard} pokemonName={pokemonName} onClick={closeModal} cardImage={myCardImage} cardNb={myCardNb}
                                    cardId={cardId} idBooster={props.idBooster} change={handleState}/>
                    </Modal>
                </>
            }
        </>
    )
}
export default MyCardsSet
