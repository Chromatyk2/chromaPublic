import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';

function OpeningCards(props) {
    const [tenCards, setTenCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [nbCards, setNbCards] = useState(0);
    const [isHidden, setIsHidden] = useState(true);
    const [index, setIndex] = React.useState(0)
    const [endPull, setEndPull] = React.useState(false)
    useEffect(() => {
        if (tenCards.length < 11) {
            fetch("https://api.pokemontcg.io/v2/cards/"+props.items[[Math.floor(Math.random() * props.items.length)]].id)
                .then(res => res.json())
                .then(
                    (result) => {
                        if(tenCards.length < 7){
                            if(result.data.rarity == "Common"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result.data]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }else if(tenCards.length > 6 && tenCards.length < 9){
                            if(result.data.rarity == "Uncommon"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result.data]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }else if(tenCards.length == 9){
                            var holo = Math.floor(Math.random() * 5);
                            if(holo == 0){
                                var ultra = Math.floor(Math.random() * 2);
                                if(ultra == 0){

                                    if(result.data.rarity =="Rare"  || result.data.rarity == "Classic Collection"  || result.data.rarity == "Promo"  || result.data.rarity == "Radiant Rare"  || result.data.rarity == "Double Rare"  || result.data.rarity == "Amazing Rare" || result.data.rarity == "Promo" || result.data.rarity == "Rare ACE" || result.data.rarity == "Rare Holo" || result.data.rarity == "Rare Holo Star" || result.data.rarity == "Rare Holo LV.X" || result.data.rarity == "Rare Holo" || result.data.rarity == "Rare Holo EX" || result.data.rarity == "Rare Prime" || result.data.rarity == "Rare Prism Star" || result.data.rarity == "Rare Shining" || result.data.rarity == "Rare Shiny"  || result.data.rarity == "Ultra Rare"  || result.data.rarity == "Trainer Gallery Rare Holo"  || result.data.rarity == "Special Illustration"  || result.data.rarity == "Special Illustration Rare"  || result.data.rarity == "Rare BREAK" || result.data.rarity == "Illustration Rare" || result.data.rarity == "Hyper Rare"  || result.data.rarity == "LEGEND" || result.data.rarity == "Promo" || result.data.rarity == "Rare Holo GX" || result.data.rarity == "Rare Holo V" || result.data.rarity == "Rare Holo VMAX" || result.data.rarity == "Rare Rainbow" || result.data.rarity == "Rare Secret" || result.data.rarity == "Rare Shiny GX" || result.data.rarity == "Rare Ultra"){
                                        setTenCards(tenCards => [...tenCards,result.data]);
                                        setNbCards (nbCards + 1);
                                        setIsLoaded(false);
                                    }else{
                                        setNbCards(nbCards + 1);
                                    }
                                }else{
                                    if(result.data.rarity =="Rare"  || result.data.rarity == "Classic Collection"  || result.data.rarity == "Promo"  || result.data.rarity == "Radiant Rare"  || result.data.rarity == "Double Rare"  || result.data.rarity == "Amazing Rare" || result.data.rarity == "Promo" || result.data.rarity == "Rare ACE" || result.data.rarity == "Rare Holo" || result.data.rarity == "Rare Holo Star" || result.data.rarity == "Rare Holo LV.X" || result.data.rarity == "Rare Holo" || result.data.rarity == "Rare Holo EX" || result.data.rarity == "Rare Prime" || result.data.rarity == "Rare Prism Star" || result.data.rarity == "Rare Shining" || result.data.rarity == "Rare Shiny"){
                                        setTenCards(tenCards => [...tenCards,result.data]);
                                        setNbCards (nbCards + 1);
                                        setIsLoaded(false);
                                    }else{
                                        setNbCards(nbCards + 1);
                                    }
                                }
                            }else{
                                if(result.data.rarity =="Rare"){
                                    setTenCards(tenCards => [...tenCards,result.data]);
                                    setNbCards (nbCards + 1);
                                    setIsLoaded(false);
                                }else{
                                    setNbCards(nbCards + 1);
                                }
                            }
                        }
                    }
                )
        }
    }, [nbCards])
    function showCards() {
        setIsHidden(false);
    }
    function getCard(e) {
            Axios.post('/api/addCard',
                {
                    pseudo:props.user,
                    idCard:e.target.getAttribute("cardId"),
                    booster:props.idBooster
                })
            e.target.classList.toggle('gettedCard');
            setIndex(index + 1);
    }

    function getLastCard(e) {
        Axios.post('/api/addCard',
            {
                pseudo: props.user,
                idCard: e.target.getAttribute("cardId"),
                booster: props.idBooster
            })
        setEndPull(true);
        props.change();
        e.target.classList.toggle('lastCard');
    }

    const customStyles = {
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
        imgModal: {
            width:'200px',
            marginBottom:'30px'
        },
    };
    return (
        <>
            {tenCards.length == 10 &&
            <div onClick={showCards} class={isHidden === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                <img style={customStyles.imgModal} src={"https://images.pokemontcg.io/" + props.idBooster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                <p style={customStyles.textModal}>Appuie pour découvrir tes cartes</p>

            </div>
            }
            {tenCards.length == 10 &&
                tenCards.slice(0).reverse().map((val, key) => {
                    return(
                        <img keyCard={key} cardId={val.id}  onClick={key == 0 ? getLastCard : getCard} class={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull" : "fit-picture dropCards showCards"} src={"https://images.pokemoncard.io/images/"+props.idBooster+"/"+val.id+".png"} alt="Grapefruit slice atop a pile of other slices"/>
                    )
                })
            }
            {tenCards.length < 10 &&
                <div className={"loaderPokemon"}>
                    <h2 className="u-text-center">Chargement ...</h2>
                    <div className="pokemon"></div>
                </div>
            }
        </>
    )
}
export default OpeningCards
