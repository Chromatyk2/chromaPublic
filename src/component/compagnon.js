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
    const [compagnonList,setCompagnonList] = useState(null);
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
                Axios
                    .get("/api/getCompagnonList/"+pseudo)
                    .then(function(response){
                        setCompagnonList(response.data);
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
            })
    }, []);
    function handleTeam(e) {
        setIsOpenTeam(true);
    }
    function closeModalTeam() {
        setIsOpenTeam(false);
    }

    function handleState(e,f) {
        Axios
            .get("/api/getCompagnonList/"+pseudo)
            .then(function(response) {
                const compagnonList = response.data;
                console.log(compagnonList)
                console.log(e)
                console.log(compagnonList.find((item) => item.pokemon == e))
                console.log(compagnonList.filter((item) => item.pokemon == e))
                if (compagnonList.length == 0 || compagnonList.filter((item) => item.pokemon == e).length == 0) {
                    Axios.post('/api/updateCompagnon',
                        {
                            pseudo: pseudo
                        })
                        .then(function (response) {
                            Axios.post('/api/addCompagnon',
                                {
                                    user: pseudo,
                                    pokemon: e,
                                    pkm: e,
                                    level: 1,
                                    xp: 0,
                                    shiny: f,
                                    shine: f,
                                    actif: 1
                                })
                                .then(function (response) {
                                    Axios.get("/api/getCompagnon/" + pseudo)
                                        .then(function (response) {
                                            setCompagnon(response.data[0])
                                            fetch("https://pokeapi.co/api/v2/pokemon-species/" + e + "/")
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {
                                                        setName(result.names);
                                                        setIsOpenTeam(false);
                                                    }
                                                )
                                        })
                                })
                        })
                } else {
                    Axios.post('/api/updateCompagnon',
                        {
                            pseudo: pseudo
                        })
                        .then(function (response) {
                            Axios.post('/api/activeCompagnon',
                                {
                                    pseudo: pseudo,
                                    pokemon: e
                                })
                                .then(function (response) {
                                    Axios.get("/api/getCompagnon/" + pseudo)
                                        .then(function (response) {
                                            setCompagnon(response.data[0])
                                            fetch("https://pokeapi.co/api/v2/pokemon-species/" + e + "/")
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {
                                                        setName(result.names);
                                                        setIsOpenTeam(false);
                                                    }
                                                )
                                        })
                                })
                        })
                }
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
                            <button
                                style={{
                                    width: "fit-content",
                                    display: "block",
                                    margin: "auto",
                                    borderRadius: "10px",
                                    height: "50px",
                                    color: "white"
                                }}
                                onClick={handleTeam}
                                className="anchorTooltip uniquePokemonContainerTeam">
                                Changer le compagnon
                            </button>
                            <p style={{lineHeight: "normal"}} className="namePokemonPage">{name[4].name}</p>
                            <img style={{
                                width: "280px",
                                marginBottom: "30px",
                                animation: "floatArrow 5s linear infinite",
                                filter: "drop-shadow(0px 0px 6px #066d04)"
                            }}
                                 src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" + compagnon.pokemon + ".png"}/>
                        </>
                        :
                        <button
                            style={{
                                width: "fit-content",
                                display: "block",
                                margin: "auto",
                                borderRadius: "10px",
                                height: "50px",
                                color: "white"
                            }}
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
