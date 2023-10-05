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
        Axios
            .get("/api/getRaritiesByBooster/"+props.idBooster)
            .then(function(response){
                setRarities(response.data);
            })
    }, [])
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

        const requests = cardToSell.map((val, key) => {
            var limitNb = parseInt(val.nbToSell);
            return Axios.delete("/api/sellCards/"+props.user+"/"+val.card+"/"+limitNb)
                .then(function(response){
                    Axios.get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
                    .then(function(response){
                        setMyCards(response.data);
                        document.getElementById("unsellButton"+val.card).style.display = 'none';
                        document.getElementById("card"+val.card).style.opacity = '1';
                    })
            })
        });

        return Promise.all(requests).then(() => {
            Axios
                .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
                .then(function(response){
                    setMyCards(response.data);
                    Axios.post('/api/addCardsPointFromSelling',
                        {
                            user:props.user,
                            cardPoint:pointToWin
                        }
                    ).then(function(response){
                        setIsOpen(false);
                        setCardToSell([]);
                    })
                })
        })
    }
    function unsellCard(e) {
        var cardId = e.target.getAttribute("cardId");
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

    useEffect(() => {
        console.log(myCards);
        myCards.map((val, key) => {
            setMyCardsId(myCardsId => [...myCardsId,val.card]);
        })
    }, [myCards]);
    console.log(rarities.find((stadeU) => stadeU.rarity.includes("Common");
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
                            rarities &&
                                myCards.map((val, key) => {
                                    var rarityC = items.data.find((myCard) => myCard.id.includes(val.card)).rarity;
                                    if(rarities.find((stadeU) => stadeU.rarity.includes(rarityC))){
                                        var stadeC = rarities.find((stadeU) => stadeU.rarity.includes(rarityC)).rarity;
                                    }else{
                                        var stadeC = 0;
                                    }
                                        return (
                                            <>
                                                <button style={customStyles.buttonMyCard} className={"cardBox"}>
                                                    <div className={"nbToSellContainer"}>
                                                        <p className={"nbToSell"}>Carte(s) possédée(s) : {val.nbCard}</p>
                                                    </div>
                                                    <div className={"nbSellPickContainer"}>
                                                        {cardToSell.find((card) => card.card == val.card) &&
                                                            <p className={"nbSellPick"}>{cardToSell.find((card) => card.card == val.card).nbToSell}</p>
                                                        }
                                                    </div>
                                                    <button cardId={val.card} myCardNb={val.nbCard}
                                                            rarity={items.data.find((myCard) => myCard.id.includes(val.card)).rarity} className={"unsellButton"} id={"unsellButton"+val.card} onClick={unsellCard}>-</button>
                                                    <img testr={rarityC} test={stadeC} style={{filter:stadeC == 1 ? "drop-shadow(2px 4px 30px #11D09A)" : stadeC == 2 ? "drop-shadow(2px 4px 30px #0ED0D6)" : stadeC == 3 && "drop-shadow(2px 4px 30px #C8B913)"}} id={"card"+val.card} onClick={handleClick} cardId={val.card} myCardNb={val.nbCard}
                                                          rarity={items.data.find((myCard) => myCard.id.includes(val.card)).rarity} className={stadeC == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}
                                                         src={"https://images.pokemoncard.io/images/" + props.idBooster + "/" + val.card + "_hiresopt.jpg"}
                                                         onError={errorImage}/>
                                                </button>
                                            </>
                                        )
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
