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
    const [modalIsOpenSkin, setIsOpenSkin] = React.useState(false);
    const [berryToWin, setBerryToWin] = React.useState(null);
    const [tokenCardToWin, setTokenCardToWin] = React.useState(null);
    const [tokenPkmToWin, setTokenPkmToWin] = React.useState(null);
    const [powderToWin, setPowderToWin] = React.useState(null);
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
                                            width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100) + "%",
                                            position: 'relative',
                                            background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
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
                                                    setName(result.names.find((uc) => uc.language.name === "fr"));
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
    function levelUpPokemon() {
        setLoad(true)
        if(profil.berry - (((compagnon.level + 1) * 2) - compagnon.xp) > -1 && compagnon.level < 100){
            Axios.post("/api/removeBerryLevelUp",
                {
                    user: pseudo,
                    win:((compagnon.level + 1) * 2) - compagnon.xp
                })
                .then(function (response) {
                        Axios.post('/api/lvlUpPokemon',
                            {
                                pseudo: pseudo,
                                pokemon:compagnon.pokemon
                            })
                            .then(function (response) {
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
                                                width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100) + "%",
                                                position: 'relative',
                                                background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
                                                textWrap: 'nowrap',
                                                color: 'white',
                                                borderRadius: '50px 50px 50px 50px',
                                                filter: "drop-shadow(0px 0px 6px blue)",
                                                transition: "width 2s"
                                            },
                                        });

                                        if(response.data[0].level == 100){
                                            if(response.data[0].shiny == 1){
                                                var berryToWin = Math.floor(Math.random() * (1501 - 1000) ) + 1000;
                                                var tokenCardToWin = Math.floor(Math.random() * (20 - 10) ) + 10;
                                                var tokenPkmToWin = Math.floor(Math.random() * (20 - 10) ) + 10;
                                                var powderToWin = Math.floor(Math.random() * (4500 - 3000) ) + 3000;
                                                openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                                            }else{
                                                var berryToWin = Math.floor(Math.random() * (1001 - 500) ) + 500;
                                                var tokenCardToWin = Math.floor(Math.random() * (10 - 5) ) + 5;
                                                var tokenPkmToWin = Math.floor(Math.random() * (10 - 5) ) + 5;
                                                var powderToWin = Math.floor(Math.random() * (3000 - 1500) ) + 1500;
                                                openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                                            }
                                        }
                                        Axios
                                            .get("/api/getProfil/"+pseudo)
                                            .then(function(response) {
                                                setProfil(response.data[0])
                                                setLoad(false)
                                            })
                                    })
                            })
                })
        }
    }
    function xpPokemon() {
        setLoad(true)
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
                                if(response.data[0].xp >= (response.data[0].level + 1) * 2 ){
                                    Axios.post('/api/lvlUpPokemon',
                                        {
                                            pseudo: pseudo,
                                            pokemon:compagnon.pokemon
                                        })

                                        .then(function (response) {
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
                                                            width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100) + "%",
                                                            position: 'relative',
                                                            background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
                                                            textWrap: 'nowrap',
                                                            color: 'white',
                                                            borderRadius: '50px 50px 50px 50px',
                                                            filter: "drop-shadow(0px 0px 6px blue)",
                                                            transition: "width 2s"
                                                        },
                                                    });

                                                    if(response.data[0].level == 100){
                                                        if(response.data[0].shiny == 1){
                                                            var berryToWin = Math.floor(Math.random() * (1501 - 1000) ) + 1000;
                                                            var tokenCardToWin = Math.floor(Math.random() * (20 - 10) ) + 10;
                                                            var tokenPkmToWin = Math.floor(Math.random() * (20 - 10) ) + 10;
                                                            var powderToWin = Math.floor(Math.random() * (4500 - 3000) ) + 3000;
                                                            openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                                                        }else{
                                                            var berryToWin = Math.floor(Math.random() * (1001 - 500) ) + 500;
                                                            var tokenCardToWin = Math.floor(Math.random() * (10 - 5) ) + 5;
                                                            var tokenPkmToWin = Math.floor(Math.random() * (10 - 5) ) + 5;
                                                            var powderToWin = Math.floor(Math.random() * (3000 - 1500) ) + 1500;
                                                            openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                                                        }
                                                    }
                                                    Axios
                                                        .get("/api/getProfil/"+pseudo)
                                                        .then(function(response) {
                                                            setProfil(response.data[0])
                                                            setLoad(false)
                                                        })
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
                                            width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100) + "%",
                                            position: 'relative',
                                            background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
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
                                            setTimeout(function() { setLoad(false)}.bind(this), 500)
                                        })
                                }
                            })
                    })
                })
        }
    }
    function xpPokemonDix() {
        setLoad(true)
        if(profil.berry - 10 > -1 && compagnon.level < 100){
            Axios.post("/api/removeBerryDix/" + pseudo,
                {
                    user: pseudo,
                    pokemon:compagnon.pokemon
                })
                .then(function (response) {
                    Axios.post('/api/addXpPokemonDix',
                        {
                            user: pseudo,
                            pokemon:compagnon.pokemon
                        }
                    ).then(function (response) {
                        Axios.get("/api/getCompagnon/" + pseudo)
                            .then(function (response) {
                                if(response.data[0].xp >= (response.data[0].level + 1) * 2 ){
                                    Axios.post('/api/lvlUpPokemon',
                                        {
                                            pseudo: pseudo,
                                            pokemon:compagnon.pokemon
                                        })
                                        .then(function (response) {
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
                                                            width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100).toFixed(2) + "%",
                                                            position: 'relative',
                                                            background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
                                                            textWrap: 'nowrap',
                                                            color: 'white',
                                                            borderRadius: '50px 50px 50px 50px',
                                                            filter: "drop-shadow(0px 0px 6px blue)",
                                                            transition: "width 2s"
                                                        },
                                                    });

                                                    if(response.data[0].level == 100){
                                                        if(response.data[0].shiny == 1){
                                                            var berryToWin = Math.floor(Math.random() * (1501 - 1000) ) + 1000;
                                                            var tokenCardToWin = Math.floor(Math.random() * (20 - 10) ) + 10;
                                                            var tokenPkmToWin = Math.floor(Math.random() * (20 - 10) ) + 10;
                                                            var powderToWin = Math.floor(Math.random() * (4500 - 3000) ) + 3000;
                                                            openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                                                        }else{
                                                            var berryToWin = Math.floor(Math.random() * (1001 - 500) ) + 500;
                                                            var tokenCardToWin = Math.floor(Math.random() * (10 - 5) ) + 5;
                                                            var tokenPkmToWin = Math.floor(Math.random() * (10 - 5) ) + 5;
                                                            var powderToWin = Math.floor(Math.random() * (3000 - 1500) ) + 1500;
                                                            openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                                                        }
                                                    }
                                                    Axios
                                                        .get("/api/getProfil/"+pseudo)
                                                        .then(function(response) {
                                                            setProfil(response.data[0])
                                                            setLoad(false)
                                                        })
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
                                            width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100).toFixed(2) + "%",
                                            position: 'relative',
                                            background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
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
                                            setTimeout(function() { setLoad(false)}.bind(this), 500)
                                        })
                                }
                            })
                    })
                })
        }
    }
    function xpPokemonCent() {
        setLoad(true)
        if(profil.berry - 100 > -1 && compagnon.level < 100){
            Axios.post("/api/removeBerryCent/" + pseudo,
                {
                    user: pseudo,
                    pokemon:compagnon.pokemon
                })
                .then(function (response) {
                    Axios.post('/api/addXpPokemonCent',
                        {
                            user: pseudo,
                            pokemon:compagnon.pokemon
                        }
                    ).then(function (response) {
                        Axios.get("/api/getCompagnon/" + pseudo)
                            .then(function (response) {
                                if(response.data[0].xp >= (response.data[0].level + 1) * 2 ){
                                    Axios.post('/api/lvlUpPokemon',
                                        {
                                            pseudo: pseudo,
                                            pokemon:compagnon.pokemon
                                        })
                                        .then(function (response) {
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
                                                            width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100).toFixed(2) + "%",
                                                            position: 'relative',
                                                            background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
                                                            textWrap: 'nowrap',
                                                            color: 'white',
                                                            borderRadius: '50px 50px 50px 50px',
                                                            filter: "drop-shadow(0px 0px 6px blue)",
                                                            transition: "width 2s"
                                                        },
                                                    });

                                                    if(response.data[0].level == 100){
                                                        if(response.data[0].shiny == 1){
                                                            var berryToWin = Math.floor(Math.random() * (1501 - 1000) ) + 1000;
                                                            var tokenCardToWin = Math.floor(Math.random() * (20 - 10) ) + 10;
                                                            var tokenPkmToWin = Math.floor(Math.random() * (20 - 10) ) + 10;
                                                            var powderToWin = Math.floor(Math.random() * (4500 - 3000) ) + 3000;
                                                            openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                                                        }else{
                                                            var berryToWin = Math.floor(Math.random() * (1001 - 500) ) + 500;
                                                            var tokenCardToWin = Math.floor(Math.random() * (10 - 5) ) + 5;
                                                            var tokenPkmToWin = Math.floor(Math.random() * (10 - 5) ) + 5;
                                                            var powderToWin = Math.floor(Math.random() * (3000 - 1500) ) + 1500;
                                                            openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                                                        }
                                                    }
                                                    Axios
                                                        .get("/api/getProfil/"+pseudo)
                                                        .then(function(response) {
                                                            setProfil(response.data[0])
                                                            setLoad(false)
                                                        })
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
                                            background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
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
                                            setTimeout(function() { setLoad(false)}.bind(this), 500)
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
                                                        width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100).toFixed(2)+"%",
                                                        position: 'relative',
                                                        background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
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
                                                            if(result.status == 404){
                                                                fetch("https://pokeapi.co/api/v2/pokemon-form/" + e + "/")
                                                                    .then(res => res.json())
                                                                    .then(
                                                                        (result) => {
                                                                            setName(result.names.find((uc) => uc.language.name === "fr"));
                                                                            setIsOpenTeam(false);
                                                                            setLoad(false);
                                                                        }
                                                                    )
                                                            }else{
                                                                setName(result.names.find((uc) => uc.language.name === "fr"));
                                                                setIsOpenTeam(false);
                                                                setLoad(false);
                                                            }
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
                                                        width: parseFloat((response.data[0].xp / ((response.data[0].level + 1 ) * 2)) * 100).toFixed(2)+"%",
                                                        position: 'relative',
                                                        background: "linear-gradient(90deg,rgba(20, 106, 133, 1) 0%, rgba(49, 146, 176, 1) 100%)",
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
    function openModalBerry(e,f,g,h) {
        Axios.post('/api/addBerry',
            {
                user:pseudo,
                berry:e
            })
            .then(function(response) {
                Axios.post('/api/addPkmPointRoulette',
                    {
                        user:pseudo,
                        nbToken:g
                    })
                    .then(function(response) {
                        Axios.post('/api/addCardsPointRoulette',
                            {
                                user:pseudo,
                                nbToken:f
                            })
                            .then(function(response) {
                                Axios.post('/api/addPowder',
                                    {
                                        user:pseudo,
                                        win:h,
                                        wins:h
                                    })
                            })
                            .then(function(response) {
                                Axios
                                    .get("/api/getProfil/"+pseudo)
                                    .then(function(response) {
                                        console.log(response.data[0])
                                        setProfil(response.data[0])
                                        setTimeout(function() {
                                            setLoad(false)}.bind(this), 500
                                        )
                                    })
                            })
                    })
            })
        setBerryToWin(e)
        setTokenCardToWin(f)
        setTokenPkmToWin(g)
        setPowderToWin(h)
        setIsOpenSkin(true);
    }
    function closeModalBerry() {
        setIsOpenSkin(false);
    }
    console.log(name);
    return (
        <>
            <Modal isOpen={modalTeamIsOpen} onRequestClose={closeModalTeam}
                   contentLabel="Example Modal">
                <PokedexTeam pseudo={pseudo} pkmToUpdate={"none"} list={list} change={(e,f) => handleState(e,f)} cookies={props.cookies}/>
            </Modal>
            <Modal overlayClassName={"overlayModalToken"} className={"modalTokenProfil"} isOpen={modalIsOpenSkin}
                   onRequestClose={closeModalBerry} contentLabel="Example Modal">

                <div style={{flexFlow:"column"}} className="pokemonContentToken">
                    <div style={{display: "flex", justifyContent: "center", marginTop: "150px"}}>
                        <div>
                            <p style={{
                                textAlign: "center",
                                fontSize: "30px",
                                marginTop: "-100px"
                            }}>{"X " + tokenCardToWin}</p>
                            <img style={{marginBottom: "30px"}} className={"badgeToWinXp"}
                                 src={"/cards.png"}/>
                        </div>
                        <div>
                            <p style={{
                                textAlign: "center",
                                fontSize: "30px",
                                marginTop: "-100px"
                            }}>{"X " + tokenPkmToWin}</p>
                            <img style={{marginBottom: "30px"}} className={"badgeToWinXp"}
                                 src={"/token.png"}/>
                        </div>
                        <div>
                            <p style={{
                                textAlign: "center",
                                fontSize: "30px",
                                marginTop: "-100px"
                            }}>{"X " + powderToWin}</p>
                            <img style={{marginBottom: "30px"}} className={"badgeToWinXp"}
                                 src={"/images/powder.png"}/>
                        </div>
                        <div>
                            <p style={{
                                textAlign: "center",
                                fontSize: "30px",
                                marginTop: "-100px"
                            }}>{"X " + berryToWin}</p>
                            <img style={{marginBottom: "30px"}} className={"badgeToWinXp"}
                                 src={"/images/berry.png"}/>
                        </div>
                    </div>
                    <button style={{display: "block", margin: "auto"}} className={"filterButton"}
                            onClick={closeModalBerry}>Cool !
                    </button>
                </div>
            </Modal>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: '100%',
                height: '100vh',
                backgroundImage: "url(/images/pasture.jpg)",
                marginTop:'-75px'
            }}>

                <div style={{position: "relative", marginTop: "-40px"}}>
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
                            <p style={{display: "flex",alignItems: "anchor-center",justifyContent: "center",gap: "10px",lineHeight: "normal", marginTop: "15px",marginBottom:"0"}} className="namePokemonPage">{name.name}</p>
                            <div style={{display:"flex", justifyContent:"center",gap:"5px"}}>
                                <img style={{margin: 0, height: "20px", width: "20px"}} src={"/images/berry.png"}/>
                                <span style={{fontSize:"15px",color:"white"}}>{"x" + profil.berry}</span>
                            </div>
                            <button disabled={load} style={{border: "none", background: "none"}} onClick={profil.berry >= ((compagnon.level + 1) * 2) - compagnon.xp ? levelUpPokemon : xpPokemon}>
                                <img style={{
                                    width: "280px",
                                    marginBottom: "50px",
                                    animation: "floatArrow 5s linear infinite",
                                    filter: profil.berry >= ((compagnon.level + 1) * 2) - compagnon.xp ? "drop-shadow(0px 0px 6px yellow)" : "drop-shadow(0px 0px 6px #066d04)"
                            }}
                                src={compagnon.shiny == 1 ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" + compagnon.pokemon + ".png" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" + compagnon.pokemon + ".png"}/>
                            </button>
                            {profil.berry > 0 &&
                                compagnon.level < 100 &&
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                    alignItems: "start",
                                    position: "absolute",
                                    right: "0",
                                    marginRight: "10px",
                                    marginTop: "-40px",
                                    color: "white"
                                }}>
                                    {profil.berry >= ((compagnon.level + 1) * 2) - compagnon.xp &&
                                        <button disabled={load} className={"buttonToXp"}
                                                onClick={levelUpPokemon}> {"Niveau + 1"}
                                        </button>
                                    }
                                    {profil.berry > 99 &&
                                        ((compagnon.level + 1) * 2) - compagnon.xp >= 100 ?
                                        <button disabled={load} className={"buttonToXp"}
                                                onClick={xpPokemonCent}> {"x100"}
                                        </button>
                                            :
                                        profil.berry > 9 &&
                                        ((compagnon.level + 1) * 2) - compagnon.xp >= 10 ?
                                        <button disabled={load} className={"buttonToXp"}
                                                onClick={xpPokemonDix}> {"x10"}
                                        </button>
                                            :
                                        profil.berry > 0 &&
                                        <button disabled={load} className={"buttonToXp"}
                                                onClick={xpPokemon}> {"x1"}
                                        </button>
                                    }
                                </div>}
                            <p style={{
                                color: "white",
                                margin: "0 0 0 10px",
                                marginTop: "-30px"
                            }}>{"N." + compagnon.level}</p>
                            <div style={customStyles.extBar} className="fullProgressBar">
                                <div
                                    style={customStyles.intBar}><p
                                    style={{marginLeft: "15px"}}>{compagnon.xp + " / " + (compagnon.level + 1) * 2 + " (" + parseFloat((compagnon.xp / ((compagnon.level + 1 ) * 2)) * 100).toFixed(2) + "%)"}</p></div>
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
