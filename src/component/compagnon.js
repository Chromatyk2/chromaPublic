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
    const [compagnon,setCompagnon] = useState(null);
    const [name,setName] = useState(null);
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
                Axios.get("/api/getCompagnon/"+pseudo)
                    .then(function(response) {
                        if(response.data.length > 0){
                            setCompagnon(response.data[0])
                            fetch("https://pokeapi.co/api/v2/pokemon-species/"+response.data[0].pokemon+"/")
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        setName(result.names);
                                    }
                                )
                        }
                    })
            })
    }, []);
    function handleTeam(e) {
        setIsOpenTeam(true);
    }
    function closeModalTeam() {
        setIsOpenTeam(false);
    }

    function handleState(e,f) {
        console.log(e)
        console.log(f)
        Axios.post('/api/addCompagnon',
            {
                user: pseudo,
                pokemon: e,
                pkm: e,
                level: 1,
                xp:0,
                shiny:f,
                shine:f
            })
            .then(function(response){
                Axios.get("/api/getCompagnon/"+pseudo)
                    .then(function(response) {
                        setCompagnon(response.data[0])
                        fetch("https://pokeapi.co/api/v2/pokemon-species/"+response.data[0].pokemon+"/")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    setName(result.names);
                                }
                            )
                    })
            })
    }
    return (
        <>
            <Modal isOpen={modalTeamIsOpen} onRequestClose={closeModalTeam} style={customStyles}
                   contentLabel="Example Modal">
                <PokedexTeam pkmToUpdate={"none"} list={list} change={(e,f) => handleState(e,f)} cookies={props.cookies}/>
            </Modal>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center", width: '100%', height: '100vh', backgroundImage: "url(/images/pasture.jpg)"}}>

                <div>
                    {compagnon ?
                        name &&
                        <>
                            <p className="namePokemonPage">{name[4].name}</p>
                            <img style={{
                                width: "280px",
                                marginBottom: "30px",
                                animation: "floatArrow 5s linear infinite",
                                filter: "drop-shadow(0px 0px 6px #066d04)"
                            }}
                                 src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" + compagnon.pokemon + ".png"}/>
                            <button
                                onClick={handleTeam}
                                className="anchorTooltip uniquePokemonContainerTeam">
                                Changer le compagnon
                            </button>
                        </>
                        :
                        <button
                            onClick={handleTeam}
                            className="anchorTooltip uniquePokemonContainerTeam">
                            Choisir un compagnon
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default Compagnon;
