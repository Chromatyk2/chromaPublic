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
    const [isLoaded, setIsLoaded] = useState(true);
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
                        console.log(result.data.rarity);
                        if(tenCards.length < 7){
                            if(result.data.rarity == "Common"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }else if(tenCards.length > 6 && tenCards.length < 9){
                            if(result.data.rarity == "Uncommon"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }else if(tenCards.length == 9){
                            if(result.data.rarity.includes("Rare" ) || result.data.rarity == "LEGEND" || result.data.rarity == "Promo"){
                                setTenCards(tenCards => [...tenCards,result]);
                                setNbCards (nbCards + 1);
                                setIsLoaded(false);
                            }else{
                                setNbCards(nbCards + 1);
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
        if(index === tenCards.length - 1){
            Axios.post('/api/addCard',
                {
                    pseudo:props.user,
                    idCard:e.target.getAttribute("cardId"),
                    booster:props.idBooster
                })
            e.target.classList.toggle('gettedCard');
            setEndPull(true);
            props.change();
        } else {
            Axios.post('/api/addCard',
                {
                    pseudo:props.user,
                    idCard:e.target.getAttribute("cardId"),
                    booster:props.idBooster
                })
            e.target.classList.toggle('gettedCard');
            setIndex(index + 1);
        }
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
            <div onClick={showCards} class={isHidden === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                <img style={customStyles.imgModal} src={"https://images.pokemontcg.io/" + props.idBooster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                <p style={customStyles.textModal}>Appuie pour découvrir tes cartes</p>

            </div>
            {tenCards &&
                tenCards.slice(0).reverse().map((val, key) => {
                    return(
                        <img cardId={val.id} onClick={getCard} class={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull" : "fit-picture dropCards showCards"} src={"https://images.pokemoncard.io/images/"+props.idBooster+"/"+val.id+"_hiresopt.jpg"} alt="Grapefruit slice atop a pile of other slices"/>
                    )
                })
            }
        </>
    )
}
export default OpeningCards
