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
    const [compagnonList,setCompagnonList] = useState(null);
    const [customStyles,setCustomStyles] = useState(null);
    const [name,setName] = useState(null);
    const [compagnon,setCompagnon] = useState(null);
    const [profil,setProfil] = useState(null);
    const [load,setLoad] = useState(false);
    const pseudo = cookies.user.data[0].login;
    useEffect(() => {Axios
        .get("/api/getProfil/"+pseudo)
        .then(function(response) {
            setProfil(response.data[0])
            Axios
                .get("/api/getByUser/" + pseudo)
                .then(function (response) {
                    setList(response.data);
                    Axios
                        .get("/api/getCompagnonList/" + pseudo)
                        .then(function (response) {
                            setCompagnonList(response.data);
                            Axios.get("/api/getCompagnon/" + pseudo)
                                .then(function (response) {
                                    setCustomStyles({
                                        extBar: {
                                            width: '100%',
                                            backgroundColor: '#fff',
                                            position: 'relative',
                                            zIndex: '1',
                                            borderRadius: '50px',
                                            margin: 'auto',
                                            marginBottom: '15px'
                                        },
                                        intBar: {
                                            width: parseFloat((response.data[0].xp / (response.data[0].level * 2)) * 100).toFixed(2) + "%",
                                            position: 'relative',
                                            background: '#15a3ea',
                                            textWrap: 'nowrap',
                                            color: 'white',
                                            borderRadius: '50px 50px 50px 50px',
                                            filter: "drop-shadow(0px 0px 6px blue)",
                                            transition: "width 2s"
                                        },
                                    });
                                    if (response.data.length > 0) {
                                        setCompagnon(response.data[0])
                                        fetch("https://pokeapi.co/api/v2/pokemon-species/" + response.data[0].pokemon + "/")
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
        })
    }, []);
    function handleTeam(e) {
        setIsOpenTeam(true);
    }
    function closeModalTeam() {
        setIsOpenTeam(false);
    }
    function xpPokemon() {
        if(profil.berry - 1 > -1 && compagnon.level < 100){
            Axios.post("/api/removeBerry/" + pseudo,
                {
                    user: pseudo,
                    pokemon:compagnon.pokemon
                })
                .then(function (response) {
                    Axios.post('/api/addXpPokemon',
                        {
                            user: pseudo,
                            pokemon:compagnon.pokemon
                        }
                    ).then(function (response) {
                        Axios.get("/api/getCompagnon/" + pseudo)
                            .then(function (response) {
                                if(response.data[0].xp >= response.data[0].level * 2 ){
                                    Axios.post('/api/lvlUpPokemon',
                                        {
                                            pseudo: pseudo,
                                            pokemon:compagnon.pokemon
                                        })
                                    Axios.get("/api/getCompagnon/" + pseudo)
                                        .then(function (response) {
                                            setCompagnon(response.data[0]);
                                            setCustomStyles({
                                                extBar: {
                                                    width: '100%',
                                                    backgroundColor: '#fff',
                                                    position: 'relative',
                                                    zIndex: '1',
                                                    borderRadius: '50px',
                                                    margin: 'auto',
                                                    marginBottom: '15px'
                                                },
                                                intBar: {
                                                    width: parseFloat((response.data[0].xp / (response.data[0].level * 2)) * 100).toFixed(2) + "%",
                                                    position: 'relative',
                                                    background: '#15a3ea',
                                                    textWrap: 'nowrap',
                                                    color: 'white',
                                                    borderRadius: '50px 50px 50px 50px',
                                                    filter: "drop-shadow(0px 0px 6px blue)",
                                                    transition: "width 2s"
                                                },
                                            });
                                            Axios
                                                .get("/api/getProfil/"+pseudo)
                                                .then(function(response) {
                                                    setProfil(response.data[0])
                                                })
                                        })
                                }else{
                                    setCompagnon(response.data[0])
                                    setCustomStyles({
                                        extBar: {
                                            width: '100%',
                                            backgroundColor: '#fff',
                                            position: 'relative',
                                            zIndex: '1',
                                            borderRadius: '50px',
                                            margin: 'auto',
                                            marginBottom: '15px'
                                        },
                                        intBar: {
                                            width: parseFloat((response.data[0].xp / (response.data[0].level * 2)) * 100).toFixed(2) + "%",
                                            position: 'relative',
                                            background: '#15a3ea',
                                            textWrap: 'nowrap',
                                            color: 'white',
                                            borderRadius: '50px 50px 50px 50px',
                                            filter: "drop-shadow(0px 0px 6px blue)",
                                            transition: "width 2s"
                                        },
                                    });
                                    Axios
                                        .get("/api/getProfil/"+pseudo)
                                        .then(function(response) {
                                            setProfil(response.data[0])
                                        })
                                }
                            })
                    })
                })
        }
    }
    function handleState(e,f) {
        setLoad(true)
        setTimeout(function() {
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
                                                        width: parseFloat((response.data[0].xp/(response.data[0].level*2))*100).toFixed(2)+"%",
                                                        position: 'relative',
                                                        background: '#15a3ea',
                                                        textWrap: 'nowrap',
                                                        color: 'white',
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
                                                            setLoad(false);
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
                                                        width: parseFloat(response.data[0].xp/(response.data[0].level*2)*100).toFixed(2)+"%",
                                                        position: 'relative',
                                                        background: '#15a3ea',
                                                        textWrap: 'nowrap',
                                                        color: 'white',
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
                                                            setLoad(false);
                                                        }
                                                    )
                                            })
                                    })
                            })
                    }
                })
        }.bind(this), 500)
    }
    return (
        <>
            <Modal isOpen={modalTeamIsOpen} onRequestClose={closeModalTeam}
                   contentLabel="Example Modal">
                <PokedexTeam pkmToUpdate={"none"} list={list} change={(e,f) => handleState(e,f)} cookies={props.cookies}/>
            </Modal>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center", width: '100%', height: '100vh', backgroundImage: "url(/images/pasture.jpg)"}}>

                <div style={{position:"relative",marginTop:"-40px"}}>
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
                            <p style={{lineHeight: "normal",marginTop: "15px"}} className="namePokemonPage">{name[4].name}</p>
                            <button disabled={load} style={{border:"none", background:"none"}} onClick={xpPokemon}>
                                <img style={{
                                width: "280px",
                                marginBottom: "30px",
                                animation: "floatArrow 5s linear infinite",
                                filter: "drop-shadow(0px 0px 6px #066d04)"
                            }}
                                src={compagnon.shiny == 1 ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" + compagnon.pokemon + ".png" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" + compagnon.pokemon + ".png"}/>
                            </button>
                            {profil.berry > 0 &&
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                    alignItems: "start",
                                    position: "absolute",
                                    right: "0",
                                    marginRight: "10px",
                                    marginTop: "-10px",
                                    color: "white"
                                }}>
                                    {profile.berr > 0 &&
                                        <button className={"buttonToXp"}
                                                onClick={xpPokemon}
                                                style={{position: "absolute", zIndex: 1}}> {"Utiliser 1 : x" + profil.berry}
                                        </button>
                                    }
                                    {profile.berr > 10 &&
                                        <button className={"buttonToXp"}
                                                onClick={xpPokemon}
                                                style={{position: "absolute", zIndex: 1}}> {"Utiliser 10 : x" + profil.berry}
                                        </button>
                                    }
                                    {profile.berr > 100 &&
                                        <button className={"buttonToXp"}
                                                onClick={xpPokemon}
                                                style={{position: "absolute", zIndex: 1}}> {"Utiliser 100 : x" + profil.berry}
                                        </button>
                                    }
                                </div>}
                            <p style={{
                                color: "white",
                                margin: "0 0 0 10px",
                                marginTop: "20px"
                            }}>{"N." + compagnon.level}</p>
                            <div style={customStyles.extBar} className="fullProgressBar">
                                <div
                                    style={customStyles.intBar}><p
                                    style={{marginLeft: "15px"}}>{compagnon.xp + " / " + compagnon.level * 2 + " (" + parseFloat(compagnon.xp / (compagnon.level * 2) * 100).toFixed(2) + "%)"}</p></div>
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
