import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';

function OpeningCards({props,change}) {
    const [tenCards, setTenCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [nbCards, setNbCards] = useState(0);
    const [isHidden, setIsHidden] = useState(true);
    const [index, setIndex] = React.useState(0)
    const [endPull, setEndPull] = React.useState(false)
    const [modalIsOpen, setIsOpen] = React.useState(true);
    useEffect(() => {
        if (tenCards.length < 11) {
            fetch("https://api.tcgdex.net/v2/fr/cards/"+props.items[[Math.floor(Math.random() * props.items.length)]].id)
                .then(res => res.json())
                .then(
                    (result) => {
                        if(tenCards.length < 7){
                            if(result.rarity == "Commune"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }else if(tenCards.length > 6 && tenCards.length < 9){
                            if(result.rarity == "Peu Commune"){
                                setIsLoaded(true);
                                setTenCards(tenCards => [...tenCards,result]);
                                setNbCards (nbCards + 1);
                            }else{
                                setNbCards(nbCards + 1);
                            }
                        }else if(tenCards.length == 9){
                            if(result.rarity == "Rare"){
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
            var idCard = e.target.value;
            var idBooster = props.idBooster;
            e.target.classList.toggle('gettedCard');
            setEndPull(true);
            change();
        } else {
            var idCard = e.target.value;
            var idBooster = props.idBooster;
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
                        <img value={val.id} onClick={getCard} class={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull" : "fit-picture dropCards showCards"} src={val.image+"/high.webp"} alt="Grapefruit slice atop a pile of other slices"/>
                    )
                })
            }
        </>
    )
}
export default OpeningCards
