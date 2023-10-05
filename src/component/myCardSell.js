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
    const [cardToSell, setCardToSell] = useState([]);
    const [pointToWin, setPointToWin] = useState(0);
    const [rarities, setRarities] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
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
            overflow:'hidden',
            zIndex:"20px"
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
        Axios
            .get("/api/getRaritiesByBooster/"+props.idBooster)
            .then(function(response){
                setRarities(response.data);
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
        var rarityCard = e.target.getAttribute("rarity");
        var cartItemIndex = cardToSell.findIndex(item => item.card === cardId);
                if(cardToSell.find((card) => card.card == cardId)){
                    e.target.style.opacity = '0.5';
                    document.getElementById("unsellButton"+cardId).style.display = 'flex';
                        if(cardToSell[cartItemIndex].nbToSell + 1 <= cardNb) {
                            cardToSell[cartItemIndex] = {
                                ...cardToSell[cartItemIndex],
                                nbToSell: cardToSell[cartItemIndex].nbToSell + 1
                            }
                            if(rarities.find((rarity) => rarity.rarity.includes(rarityCard))){
                                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 1){
                                    setPointToWin(pointToWin + 50);
                                }
                                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 2){
                                    setPointToWin(pointToWin + 25);
                                }
                                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 3){
                                    setPointToWin(pointToWin + 250);
                                }
                                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 4){
                                    setPointToWin(pointToWin + 1000);
                                }
                            }else{
                                if(rarityCard == "Common"){
                                    setPointToWin(pointToWin + 5);
                                }
                                if(rarityCard == "Uncommon"){
                                    setPointToWin(pointToWin + 10);
                                }
                            }
                        }
                }else{
                    e.target.style.opacity = '0.5';
                    document.getElementById("unsellButton"+cardId).style.display = 'flex';
                    setCardToSell(cardToSell => [...cardToSell,{card: cardId,nbToSell:1}]);
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard))){
                        if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 1){
                            setPointToWin(pointToWin + 50);
                        }
                        if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 2){
                            setPointToWin(pointToWin + 25);
                        }
                        if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 3){
                            setPointToWin(pointToWin + 250);
                        }
                        if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 4){
                            setPointToWin(pointToWin + 1000);
                        }
                    }else{
                        if(rarityCard == "Common"){
                            setPointToWin(pointToWin + 5);
                        }
                        if(rarityCard == "Uncommon"){
                            setPointToWin(pointToWin + 10);
                        }
                    }
                }
    }
    function confirmSelling(e) {
        Axios.post('/api/addCardsPointFromSelling',
            {
                user:props.user,
                cardPoint:pointToWin
            }
        )
        cardToSell.map((val, key) => {
            Axios.delete("/api/sellCards/"+props.user+"/"+val.card+"/"+val.nbToSell)
        })
    }
    function unsellCard(e) {
        var cardId = e.target.getAttribute("cardId");
        var cardNb = e.target.getAttribute("myCardNb");
        var rarityCard = e.target.getAttribute("rarity");
        var cartItemIndex = cardToSell.findIndex(item => item.card === cardId);
        if(cardToSell.find((card) => card.card == cardId)){
            if(cardToSell[cartItemIndex].nbToSell - 1 >= 0) {
                if(cardToSell[cartItemIndex].nbToSell - 1 > 0){
                    cardToSell[cartItemIndex] = {
                        ...cardToSell[cartItemIndex],
                        nbToSell: cardToSell[cartItemIndex].nbToSell -1
                    }
                    document.getElementById("unsellButton"+cardId).style.display = 'flex';
                }else{
                    document.getElementById("card"+cardId).style.opacity = '1';
                    document.getElementById("unsellButton"+cardId).style.display = 'none';
                    cardToSell.splice(cartItemIndex, 1);
                }
                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard))){
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 1){
                        setPointToWin(pointToWin - 50);
                    }
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 2){
                        setPointToWin(pointToWin - 25);
                    }
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 3){
                        setPointToWin(pointToWin - 250);
                    }
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 4){
                        setPointToWin(pointToWin - 1000);
                    }
                }else{
                    if(rarityCard == "Common"){
                        setPointToWin(pointToWin - 5);
                    }
                    if(rarityCard == "Uncommon"){
                        setPointToWin(pointToWin - 10);
                    }
                }
            }
        }
    }
    function openModal(e) {
        setIsOpen(true);
    }
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+e.target.getAttribute("cardId")+".png";
    }
    function closeModal() {
        setIsOpen(false);
    }
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
                        {pointToWin > 0 &&
                            <>
                                <div className={"buttonToSellContainer"}>
                                    <button onClick={openModal} className={"buttonToSell"}>Vendre ces cartes pour {pointToWin} points</button>
                                </div>
                            </>
                        }
                        {items &&
                            items.data.map((val, key) => {
                                if (myCardsId.includes(val.id)) {
                                    let cardNb = myCards.find((myCard) => myCard.card.includes(val.id));
                                    return (
                                        <>
                                            <button style={customStyles.buttonMyCard} className={"cardBox"}>
                                                <div className={"nbToSellContainer"}>
                                                    <p className={"nbToSell"}>Carte(s) possédée(s) : {cardNb.nbCard}</p>
                                                </div>
                                                <div className={"nbSellPickContainer"}>
                                                    {cardToSell.find((card) => card.card == val.id) &&
                                                        <p className={"nbSellPick"}>{cardToSell.find((card) => card.card == val.id).nbToSell}</p>
                                                     }
                                                </div>
                                                <button cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                                        image={val.image} rarity={val.rarity} className={"unsellButton"} id={"unsellButton"+val.id} onClick={unsellCard}>-</button>
                                                <img id={"card"+val.id} onClick={handleClick} cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                                     image={val.image} rarity={val.rarity} className="fit-picture-card"
                                                     src={"https://images.pokemoncard.io/images/" + props.idBooster + "/" + val.id + "_hiresopt.jpg"}
                                                     onError={errorImage}/>
                                            </button>
                                        </>
                                    )
                                }
                            })
                        }
                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                            <div>
                                <p>Valider la vente pour {pointToWin} points ?</p>
                                <div className={"validationSellContainer"}>
                                    <button onClick={confirmSelling} className={"validationSellButton"} >Valider</button>
                                    <button className={"cancelSellButton"} onClick={closeModal}>Annuler</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </>
            }
        </>
    )
}
export default MyCardSell
