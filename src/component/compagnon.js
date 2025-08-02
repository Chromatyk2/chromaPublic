import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";
import {useCookies} from "react-cookie";
import Twitch from '../twitch.png'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2";
import PokedexTeam from "./pokedexTeam";


function Compagnon(props) {
    const [cookies, setCookie] = useCookies();
    const [modalTeamIsOpen, setIsOpenTeam] = React.useState(false);
    const [list,setList] = useState([]);
    const pseudo = cookies.user.data[0].login;
    const customStyles = {
        extBar: {
            backgroundColor: '#00368a',
            position: 'relative',
            zIndex: '1',
            borderRadius: '50px',
            height:'30px',
            width:'300px'
        }
    };
    useEffect(() => {
        Axios
            .get("/api/getByUser/"+pseudo)
            .then(function(response){
                setList(response.data);
            })
    }, []);
    function handleTeam(e) {
        setIsOpenTeam(true);
    }
    function closeModalTeam() {
        setIsOpenTeam(false);
    }

    function handleState(e) {
        Axios.post('/api/addCompagnon',
            {
                user: pseudo,
                pokemon: e,
                pkm: e,
                level: 1,
                xp:0
            })
            .then(function(response){
                setIsOpenTeam(false);
            })
    }
    return (
        <>
            <Modal isOpen={modalTeamIsOpen} onRequestClose={closeModalTeam} style={customStyles}
                   contentLabel="Example Modal">
                <PokedexTeam pkmToUpdate={"none"} list={list} change={(e) => handleState(e)} cookies={props.cookies}/>
            </Modal>
            <div style={{width:'100%', height:'auto', backgroundImage: "url(/images/pasture.jpg)"}}>

            </div>
            <button
                style={{position:"absolute", top:"300px", left:"500px"}}
                onClick={handleTeam}
                className="anchorTooltip uniquePokemonContainerTeam">
                Changer le compagnon
            </button>
        </>
    );
}

export default Compagnon;
