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
                        const commonArray = props.items.filter(item => item.rarity == 'Common');
                        const uncommonArray = props.items.filter(item => item.rarity == 'Uncommon');
                        const rareArray = props.items.filter(item => item.rarity == 'Rare');
                        const epicArray = props.items.filter(item => item.rarity =="Rare"  || item.rarity == "Classic Collection"  || item.rarity == "Promo"  || item.rarity == "Radiant Rare"  || item.rarity == "Double Rare"  || item.rarity == "Amazing Rare" || item.rarity == "Promo" || item.rarity == "Rare ACE" || item.rarity == "Rare Holo" || item.rarity == "Rare Holo Star" || item.rarity == "Rare Holo LV.X" || item.rarity == "Rare Holo" || item.rarity == "Rare Holo EX" || item.rarity == "Rare Prime" || item.rarity == "Rare Prism Star" || item.rarity == "Rare Shining" || item.rarity == "Rare Shiny");
                        const ultraArray = props.items.filter(item => item.rarity =="Rare"  || item.rarity == "Classic Collection"  || item.rarity == "Promo"  || item.rarity == "Radiant Rare"  || item.rarity == "Double Rare"  || item.rarity == "Amazing Rare" || item.rarity == "Promo" || item.rarity == "Rare ACE" || item.rarity == "Rare Holo" || item.rarity == "Rare Holo Star" || item.rarity == "Rare Holo LV.X" || item.rarity == "Rare Holo" || item.rarity == "Rare Holo EX" || item.rarity == "Rare Prime" || item.rarity == "Rare Prism Star" || item.rarity == "Rare Shining" || item.rarity == "Rare Shiny"  || item.rarity == "Ultra Rare"  || item.rarity == "Trainer Gallery Rare Holo"  || item.rarity == "Special Illustration"  || item.rarity == "Special Illustration Rare"  || item.rarity == "Rare BREAK" || item.rarity == "Illustration Rare" || item.rarity == "Hyper Rare"  || item.rarity == "LEGEND" || item.rarity == "Promo" || item.rarity == "Rare Holo GX" || item.rarity == "Rare Holo V" || item.rarity == "Rare Holo VMAX" || item.rarity == "Rare Rainbow" || item.rarity == "Rare Secret" || item.rarity == "Rare Shiny GX" || item.rarity == "Rare Ultra");
                        if(tenCards.length < 7){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,commonArray[[Math.floor(Math.random() * commonArray.length)]]]);
                                setNbCards (nbCards + 1);
                        }else if(tenCards.length > 6 && tenCards.length < 9){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,uncommonArray[[Math.floor(Math.random() * uncommonArray.length)]]]);
                        }else if(tenCards.length == 9){
                            var holo = Math.floor(Math.random() * 5);
                            if(holo == 0){
                                var ultra = Math.floor(Math.random() * 2);
                                if(ultra == 0){
                                        setTenCards(tenCards => [...tenCards,ultraArray[[Math.floor(Math.random() * ultraArray.length)]]]);
                                        setNbCards (nbCards + 1);
                                        setIsLoaded(false);
                                }else{
                                        setTenCards(tenCards => [...tenCards,epicArray[[Math.floor(Math.random() * epicArray.length)]]]);
                                        setNbCards (nbCards + 1);
                                        setIsLoaded(false);
                                }
                            }else{
                                    setTenCards(tenCards => [...tenCards,rareArray[[Math.floor(Math.random() * rareArray.length)]]]);
                                    setNbCards (nbCards + 1);
                                    setIsLoaded(false);
                            }
                        }
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
        e.target.classList.toggle(' endPull');
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
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+e.target.getAttribute("cardId")+".png";
    }
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
                        <img keyCard={key} cardId={val.id}  onClick={key == 0 ? getLastCard : getCard} class={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ?  "fit-picture dropCards showCards gettedCard endPull" : "fit-picture dropCards showCards"} src={"https://images.pokemoncard.io/images/"+props.idBooster+"/"+val.id+"_hiresopt.jpg" } onError={errorImage} alt="Grapefruit slice atop a pile of other slices"/>
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
