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
            background:'none'
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
        console.log(e.target.value);
        console.log(e.target.getAttribute("myCardNb"));
        console.log(e.target);
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
                            <p className={"nbCardList"}>{cardNb.nbCard}</p>
                            <img myCardNb={cardNb.nbCard} value={val.image} class="fit-picture-card" src={val.image+"/high.webp"} />
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
                    <UniqueCard cardNb={myCardNb} change = {handleState}/>
                </Modal>
        </>
    )
}
export default MyCardsSet
