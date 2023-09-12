import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';

function MyBoosters(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [boosters, setBoosters] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor:'rgba(0,0,0,0.75)'
        },
    };
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        Axios
            .get("/api/getMyBoosters/"+props.user)
            .then(function(response){
                setBoosters(response.data);
            })
    }, [])
    return (
        <>
            <div id={"cardsContainer"}>
                {boosters &&
                    boosters.map((val, key) => {
                        return(
                            <div className="uniqueTradeContainer">
                                <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.booster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                                <p className="pokemonNameTrade">Possédé(s) : {val.nbBooster}</p>
                                <button onClick={openModal} className="guessTradeButton">Ouvrir</button>
                            </div>
                        )
                    })
                }
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </>
    )
}
export default MyBoosters
