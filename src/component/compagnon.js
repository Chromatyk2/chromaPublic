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
    const [customStyles,setCustomStyles] = useState(null);
    const [name,setName] = useState(null);
    const pseudo = cookies.user.data[0].login;
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
                                setCustomStyles({
                                    extBar: {
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        position: 'relative',
                                        zIndex: '1',
                                        borderRadius: '50px',
                                        margin:'auto',
                                        marginBottom: '15px'
                                    },
                                    intBar: {
                                        width: parseFloat((response.data[0].xp/(response.data[0].level*10))*100).toFixed(2)+"%",
                                        position: 'relative',
                                        background: '#15a3ea',
                                        textWrap: 'nowrap',
                                        color: 'white',
                                        padding: '0 15px 0 15px',
                                        borderRadius: '50px 50px 50px 50px',
                                        filter: "drop-shadow(0px 0px 6px blue)",
                                        transition: "width 2s"
                                    },
                                });
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
                                            setCustomStyles({
                                                extBar: {
                                                    width: '100%',
                                                    backgroundColor: '#fff',
                                                    position: 'relative',
                                                    zIndex: '1',
                                                    borderRadius: '50px',
                                                    margin:'auto',
                                                    marginBottom: '15px'
                                                },
                                                intBar: {
                                                    width: parseFloat((response.data[0].xp/(response.data[0].level*10))*100).toFixed(2)+"%",
                                                    position: 'relative',
                                                    background: '#15a3ea',
                                                    textWrap: 'nowrap',
                                                    color: 'white',
                                                    padding: '0 15px 0 15px',
                                                    borderRadius: '50px 50px 50px 50px',
                                                    filter: "drop-shadow(0px 0px 6px blue)",
                                                    transition: "width 2s"
                                                },
                                            });
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
                                            setCustomStyles({
                                                extBar: {
                                                    width: '100%',
                                                    backgroundColor: '#fff',
                                                    position: 'relative',
                                                    zIndex: '1',
                                                    borderRadius: '50px',
                                                    margin:'auto',
                                                    marginBottom: '15px'
                                                },
                                                intBar: {
                                                    width: parseFloat(response.data[0].xp/(response.data[0].level*10)*100).toFixed(2)+"%",
                                                    position: 'relative',
                                                    background: '#15a3ea',
                                                    textWrap: 'nowrap',
                                                    color: 'white',
                                                    padding: '0 15px 0 15px',
                                                    borderRadius: '50px 50px 50px 50px',
                                                    filter: "drop-shadow(0px 0px 6px blue)",
                                                    transition: "width 2s"
                                                },
                                            });
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

                <div style={{marginTop:"-40px"}}>
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

                            <p style={{color:"white",margin:"0 0 0 10px"}}>{"N."+compagnon.level}</p>
                            <div style={customStyles.extBar} className="fullProgressBar">
                                <div
                                    style={customStyles.intBar}>{compagnon.xp + " / " + compagnon.level * 10 + " (" + parseFloat(compagnon.xp / (compagnon.level * 10) * 100).toFixed(2) + "%)"}</div>
                            </div>
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
