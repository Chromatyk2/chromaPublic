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
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [myCardNb, setMyCardNb] = React.useState(null);
    const [myCardImage, setMyCardImage] = React.useState(null);
    const [pokemonName, setPokemonName] = React.useState(null);
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
            justifyContent: 'center'
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
        fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
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
        setPokemonName(e.target.getAttribute("pokemonName"));
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    function handleState() {
        setIsOpen(false);
    }
    return (
        <>
            {items &&
                <ProgressBarCard getNb={myCards.length} item={{items}}/>
            }
            <div id={"cardsContainer"}>
                {items &&
                    items.cards.map((val, key) => {
                      if(myCardsId.includes(val.id)){
                        let cardNb = myCards.find((myCard) => myCard.card.includes(val.id));
                        return(
                          <button style={customStyles.buttonMyCard} onClick={openModal} className={"cardBox"}>
                            <img pokemonName={val.name} myCardNb={cardNb.nbCard} image={val.image} class="fit-picture-card" src={val.image+"/high.webp"} />
                          </button>
                        )
                      }else{
                        return(
                          <img class="fit-picture-card" src={"/images/backCard.png"} />
                        )
                      }
                    })
                }
            </div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                    <UniqueCard pokemonName={pokemonName} onRequestClose={closeModal} cardImage={myCardImage} cardNb={myCardNb} change = {handleState}/>
                </Modal>
        </>
    )
}
export default MyCardsSet
