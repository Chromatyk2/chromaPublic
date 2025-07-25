import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import OpeningBooster from "./openingBooster";
import Modal from 'react-modal';
import PokedexTeam from "./pokedexTeam";
import {useParams} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import OnStream from "./onStream";
import SpawnPokemonToken from "./spawnPokemonToken";
import Lv1 from "../lv1.png";
import Lv2 from "../lv2.png";
import Lv3 from "../lv3.png";
import Lv4 from "../lv4.png";
import Lv5 from "../lv5.png";
import Lv6 from "../lv6.png";
import Lv7 from "../lv7.png";
import Lv8 from "../lv8.png";
import Lv9 from "../lv9.png";
import Lv10 from "../lv10.png";
import Lv11 from "../lv11.png";
import Lv1c from "../lv1c.png";
import Lv2c from "../lv2c.png";
import Lv3c from "../lv3c.png";
import Lv4c from "../lv4c.png";
import Lv5c from "../lv5c.png";
import Lv6c from "../lv6c.png";
import Lv7c from "../lv7c.png";
import Lv8c from "../lv8c.png";
import Lv9c from "../lv9c.png";
import Lv10c from "../lv10c.png";
import Lv11c from "../lv11c.png";
import $ from "jquery";
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [profil, setProfil] = useState(null);
    const [skins, setSkins] = useState(null);
    const [myTotalsCards, setMyTotalsCards] = useState(null);
    const [myLastTenCards, setMyLastTenCards] = useState(null);
    const [badgesList, setBadgesList] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenBadge, setIsOpenBadge] = React.useState(false);
    const [modalTeamIsOpen, setIsOpenTeam] = React.useState(false);
    const [teamToHandle, setTeamToHandle] = React.useState("");
    const [list,setList] = useState([]);
    const [pourcent, setPourcent] = useState();
    const [pourcentCard, setPourcentCard] = useState();
    const [modalIsOpenToken, setIsOpenToken] = React.useState(false);
    const [openTime, setOpenTime] = React.useState(false);
    const [modalIsOpenBadgeHandle, setOpenBadgeHandle] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(true);
    const [badgeToWinStade, setBadgeToWinStade] = React.useState(null);
    const [messageToBadge, setMessageToBadge] = React.useState(null);
    const [badges, setBadges] = useState(null);
    useEffect(() => {
        const progressBars = document.querySelectorAll('.progress-container');

        const animateValue = (selector, start, end, duration) => {
            var obj = selector;
            var range = end - start;

            // no timer shorter than 50ms (not really visible any way)
            var minTimer = 50;

            // calc step time to show all interediate values
            var stepTime = Math.abs(Math.floor(duration / range));

            // never go below minTimer
            stepTime = Math.max(stepTime, minTimer);

            // get current time and calculate desired end time
            var startTime = new Date().getTime();
            var endTime = startTime + duration;
            var timer;

            function run() {
                var now = new Date().getTime();
                var remaining = Math.max((endTime - now) / duration, 0);
                var value = Math.round(end - remaining * range);
                obj.innerHTML = value + "%";
                if (value == end) {
                    clearInterval(timer);
                }
            }

            var timer = setInterval(run, stepTime);
            run();
        }

        const progress = (value) => {
            var progress = value / 100;
            var dashoffset = circumference * (1 - progress);

            progressValue.style.strokeDashoffset = dashoffset;
        }

// Iterate over each progress bar
        for (var el of progressBars) {
            var dataValue = el.getAttribute('data-value');
            var progressValue = el.querySelector('.progress-value');
            var valueContainer = el.querySelector('span');

            var radius = progressValue.getAttribute("r");

            var circumference = 2 * Math.PI * radius;

            progressValue.style.strokeDasharray = circumference;
            progress(dataValue);
        }
    }, []);
    function openToken() {
        setOpenTime(true)
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                if(response.data[0].pkmToken -1 > -1){
                    Axios.post('/api/removeToken',
                        {
                            user:pseudo
                        }
                    )
                        .then(function(response){
                            Axios.get("/api/getProfil/"+pseudo)
                                .then(function(response){
                                    setOpenTime(false)
                                    setIsOpenToken(true);
                                    setTimeout(function (){
                                        Axios.get("/api/getProfil/"+pseudo)
                                            .then(function(response){
                                                setProfil(response.data);
                                                Axios
                                                    .get("/api/getByUser/"+pseudo)
                                                    .then(function(response){
                                                        setList(response.data);
                                                        setPourcent(Math.round((response.data.length / 1025) * 100));
                                                    })
                                            })
                                    },1500);
                                })
                        })
                }
            })
    }
    function openModalZero(e, f) {
        setBadgeToWinStade(e)
        setMessageToBadge(f)
        setIsOpenBadge(true);
    }
    function closeModalToken() {
        setIsOpenToken(false);
        setTimeout(() => {
            checkBadges();
        }, 500)
    }
    useEffect(() => {
        checkBadges();
    }, [])
    useEffect(() => {
        Axios
            .get("/api/getSkins/"+pseudo)
            .then(function(response){
                setSkins(response.data);
            })
    }, [setIsOpen])

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
    function handleProfileImage() {
        setIsOpen(true);
    }
    function handleTeam(e) {
        const teamToUpdate = e.target.value;
        setTeamToHandle(teamToUpdate);
        setIsOpenTeam(true);
    }
    function handleBadge(e) {
        setOpenBadgeHandle(true);
    }function closeBadgeHandle(e) {
        setOpenBadgeHandle(false);
    }
    function closeModalTeam() {
        setIsOpenTeam(false);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function closeModalBadge() {
        setIsOpenBadge(false);
        setTimeout(() => {
            checkBadges();
        }, 500)
    }
    function checkBadges() {
        Axios
            .get("/api/getProfil/" + pseudo)
            .then(function (response) {
                setProfil(response.data);
                Axios.get("/api/getMyTotalCards/" + pseudo)
                    .then(function (response) {
                        setPourcentCard(Math.abs((response.data[0].nbCard / 15937) * 100));
                        const pourcentCard = Math.abs((response.data[0].nbCard / 15937) * 100);
                        setMyTotalsCards(response.data)
                        Axios.get("/api/getMyLastTenCards/" + pseudo)
                            .then(function (response) {
                                setMyLastTenCards(response.data)
                                Axios
                                    .get("/api/getByUser/" + pseudo)
                                    .then(function (response) {
                                        setList(response.data);
                                        setPourcent(Math.round((response.data.length / 1025) * 100));
                                        const pourcent = Math.round((response.data.length / 1025) * 100);
                                        const pourcentShiny = response.data.filter(item => item.shiny == 1).length;
                                        Axios
                                            .get("/api/getBadgesByUser/" + pseudo)
                                            .then(function (response) {
                                                setIsLoad(false)
                                                setBadgesList(response.data)
                                                const badges = response.data;
                                                if (typeof badges.find((item) => item.image === "lv1") === "undefined" && pourcent > 0) {
                                                    openModalZero("lv1", "Au moins 1 Pokemon capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv1",
                                                            stade: 0,
                                                            description: "Au moins 1 Pokemon capturé !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv2") === "undefined" && pourcent >= 10) {
                                                    openModalZero("lv2", "10% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv2",
                                                            stade: 0,
                                                            description: "10% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv3") === "undefined" && pourcent >= 20) {
                                                    openModalZero("lv3", "20% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv3",
                                                            stade: 0,
                                                            description: "20% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv4") === "undefined" && pourcent >= 30) {
                                                    openModalZero("lv4", "30% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv4",
                                                            stade: 0,
                                                            description: "30% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv5") === "undefined" && pourcent >= 40) {
                                                    openModalZero("lv5", "40% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv5",
                                                            stade: 0,
                                                            description: "40% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv6") === "undefined" && pourcent >= 50) {
                                                    openModalZero("lv6", "50% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv6",
                                                            stade: 0,
                                                            description: "50% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv7") === "undefined" && pourcent >= 60) {
                                                    openModalZero("lv7", "60% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv7",
                                                            stade: 0,
                                                            description: "60% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv8") === "undefined" && pourcent >= 70) {
                                                    openModalZero("lv8", "70% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv8",
                                                            stade: 0,
                                                            description: "70% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv9") === "undefined" && pourcent >= 80) {
                                                    openModalZero("lv9", "80% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv9",
                                                            stade: 0,
                                                            description: "80% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv10") === "undefined" && pourcent >= 90) {
                                                    openModalZero("lv10", "90% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv10",
                                                            stade: 0,
                                                            description: "90% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv11") === "undefined" && pourcent === 100) {
                                                    openModalZero("lv11", "100% du Pokédex complété !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv11",
                                                            stade: 0,
                                                            description: "100% du Pokédex complété !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv1c") === "undefined" && pourcentCard > 0) {
                                                    openModalZero("lv1c", "Au moins 1 carte obtenue !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv1c",
                                                            stade: 0,
                                                            description: "Au moins 1 carte obtenue !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv2c") === "undefined" && pourcentCard >= 10) {
                                                    openModalZero("lv2c", "10% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv2c",
                                                            stade: 0,
                                                            description: "10% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv3c") === "undefined" && pourcentCard >= 20) {
                                                    openModalZero("lv3c", "20% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv3c",
                                                            stade: 0,
                                                            description: "20% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv4c") === "undefined" && pourcentCard >= 30) {
                                                    openModalZero("lv4c", "30% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv4c",
                                                            stade: 0,
                                                            description: "30% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv5c") === "undefined" && pourcentCard >= 40) {
                                                    openModalZero("lv5c", "40% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv5c",
                                                            stade: 0,
                                                            description: "40% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv6c") === "undefined" && pourcentCard >= 50) {
                                                    openModalZero("lv6c", "50% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv6c",
                                                            stade: 0,
                                                            description: "50% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv7c") === "undefined" && pourcentCard >= 60) {
                                                    openModalZero("lv7c", "60% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv7c",
                                                            stade: 0,
                                                            description: "60% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv8c") === "undefined" && pourcentCard >= 70) {
                                                    openModalZero("lv8c", "70% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv8c",
                                                            stade: 0,
                                                            description: "70% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv9c") === "undefined" && pourcentCard >= 80) {
                                                    openModalZero("lv9c", "80% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv9c",
                                                            stade: 0,
                                                            description: "80% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv10c") === "undefined" && pourcentCard >= 90) {
                                                    openModalZero("lv10c", "90% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv10c",
                                                            stade: 0,
                                                            description: "90% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                } else if (typeof badges.find((item) => item.image === "lv11c") === "undefined" && pourcentCard === 100) {
                                                    openModalZero("lv11c", "100% de la Cartodex complétée !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo: pseudo,
                                                            image: "lv11c",
                                                            stade: 0,
                                                            description: "100% de la Cartodex complétée !"
                                                        })
                                                        .then(function (response) {
                                                            Axios.get("/api/getBadgesByUser/" + pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny1") === "undefined" && pourcentShiny > 0){
                                                    openModalZero("shiny1", "Au moins 1 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny1",
                                                            stade:0,
                                                            description:"Au moins 1 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny2") === "undefined" && pourcentShiny >= 10){
                                                    openModalZero("shiny2", "Au moins 10 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny2",
                                                            stade:0,
                                                            description:"Au moins 10 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny3") === "undefined" && pourcentShiny >= 50){
                                                    openModalZero("shiny3", "Au moins 50 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny3",
                                                            stade:0,
                                                            description:"Au moins 50 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny4") === "undefined" && pourcentShiny >= 100){
                                                    openModalZero("shiny4", "Au moins 100 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny4",
                                                            stade:0,
                                                            description:"Au moins 100 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny5") === "undefined" && pourcentShiny >= 150){
                                                    openModalZero("shiny5", "Au moins 150 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny5",
                                                            stade:0,
                                                            description:"Au moins 150 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny6") === "undefined" && pourcentShiny >= 200){
                                                    openModalZero("shiny6", "Au moins 200 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny6",
                                                            stade:0,
                                                            description:"Au moins 200 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny7") === "undefined" && pourcentShiny >= 250){
                                                    openModalZero("shiny7", "Au moins 250 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny7",
                                                            stade:0,
                                                            description:"Au moins 250 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny8") === "undefined" && pourcentShiny >= 300){
                                                    openModalZero("shiny8", "Au moins 300 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny8",
                                                            stade:0,
                                                            description:"Au moins 300 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny9") === "undefined" && pourcentShiny >= 350){
                                                    openModalZero("shiny9", "Au moins 350 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny9",
                                                            stade:0,
                                                            description:"Au moins 350 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny10") === "undefined" && pourcentShiny >= 400){
                                                    openModalZero("shiny10", "Au moins 400 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny10",
                                                            stade:0,
                                                            description:"Au moins 400 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }else if(typeof badges.find((item) => item.image === "shiny11") === "undefined" && pourcentShiny >= 500){
                                                    openModalZero("shiny11", "Au moins 500 Shiny capturé !");
                                                    Axios.post('/api/addBadge',
                                                        {
                                                            pseudo:pseudo,
                                                            image:"shiny11",
                                                            stade:0,
                                                            description:"Au moins 500 Shiny capturé !"
                                                        })
                                                        .then(function(response) {
                                                            Axios.get("/api/getBadgesByUser/"+pseudo)
                                                                .then(function (response) {
                                                                    setBadges(response.data);
                                                                })
                                                        })
                                                }
                                            })
                                    })
                            })
                    })
            })
    }
    function changeSkin(e) {
        const skin = e.target.value;
        Axios.post('/api/updateSkin',
            {
                user:pseudo,
                skin:e.target.value
            }
        )
            .then(function(response){
                Axios
                    .get("/api/getProfil/"+pseudo)
                    .then(function(response){
                        setProfil(response.data);
                        setIsOpen(false);
                    })
            })
    }
    function changeBadge(e) {
        const skin = e.target.value;
        Axios.post('/api/updateBadge',
            {
                user:pseudo,
                image:e.target.value
            }
        )
            .then(function(response){
                Axios
                    .get("/api/getProfil/"+pseudo)
                    .then(function(response){
                        setProfil(response.data);
                        setOpenBadgeHandle(false);
                    })
            })
    }
    function openSkin(e) {
        if(profil[0].box - 1 > -1){
            Axios.post('/api/removeBoxSkin',
                {
                    user:pseudo
                }
            )
            .then(function(response){
                Axios
                    .get("/api/getSkins/"+pseudo)
                    .then(function(response){
                        setSkins(response.data);
                        var n = Math.floor((Math.random() * 2153) + 1);
                        while (response.data.filter(item => item.skin == n).length != 0) {
                            n = Math.floor((Math.random() * 2153) + 1);
                        }
                        Axios.post('/api/addSkin',
                            {
                                user:pseudo,
                                skin:n
                            }
                        )
                        .then(function(response){
                            Axios.get("/api/getProfil/"+pseudo)
                                .then(function(response){
                                    setProfil(response.data);
                                Axios.get("/api/getSkins/"+pseudo)
                                        .then(function(response) {
                                            setSkins(response.data);
                                        })
                                })
                        })
                    })
            })
        }
    }
    function handleState() {
        Axios.get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
                Axios
                    .get("/api/getSkins/"+pseudo)
                    .then(function(response){
                        setSkins(response.data);
                        setIsOpenTeam(false);
                        setIsOpen(false);
                    })
            })
    }
    function errorImage(e){
        e.target.onerror = null;
        if(e.target.getAttribute("booster") == "sm3.5"){
            e.target.src = "https://images.pokemontcg.io/sm35/"+e.target.getAttribute("number")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sm7.5"){
            e.target.src = "https://images.pokemontcg.io/sm75/"+e.target.getAttribute("number")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sm11.5"){
            e.target.src = "https://images.pokemontcg.io/sm115/"+e.target.getAttribute("number")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh3.5"){
            e.target.src = "https://images.pokemontcg.io/swsh35/"+e.target.getAttribute("number")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh4.5"){
            e.target.src = "https://images.pokemontcg.io/swsh4.5/"+e.target.getAttribute("number")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh12.5"){
            e.target.src = "https://images.pokemontcg.io/swsh12pt5/"+e.target.getAttribute("number")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv03.5"){
            e.target.src = "https://images.pokemontcg.io/sv3pt5/"+e.target.getAttribute("number")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv04.5"){
            e.target.src = "https://images.pokemontcg.io/sv4pt5/"+e.target.getAttribute("number")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv06.5"){
            e.target.src = "https://images.pokemontcg.io/sv6pt5/"+e.target.getAttribute("number")+"_hires.png";
        }else{
            e.target.src = "https://images.pokemontcg.io/"+e.target.getAttribute("booster")+"/"+e.target.getAttribute("number")+"_hires.png";
        }
    }
    return (
        <>
            <div className={"contentContainer"}>
                <div className={"profilContainer"}>
                    {isLoad === false &&
                        profil &&
                        badgesList &&
                        profil.length > 0 &&
                        <>
                            <p className={"pseudoProfil"}>{profil[0].pseudo}</p>
                            <div className={"profilVisuals"}>
                                <div style={{width: "120px"}}>
                                    {profil[0].pkmToken > 0 ?
                                        <button className="anchorTooltip"
                                                data-tooltip-content="Clique our capturer un pokemon"
                                                disabled={openTime}
                                                className={"openLeaderBoardButton"} onClick={openToken}
                                                style={{
                                                    width: "120px",
                                                    backgroundSize: "80%",
                                                    filter: "drop-shadow(0px 0px 5px lightblue) drop-shadow(0px 0px 0 lightblue)",
                                                    backgroundImage: "url(/token.png)",
                                                }}>
                                            <div className="infoPkm">
                                                <div
                                                    className="infoNbPkmToken">{profil[0].pkmToken != 0 ? profil[0].pkmToken : 0}</div>
                                            </div>
                                        </button>
                                        :
                                        <button disabled={openTime} className={"openLeaderBoardButton"}
                                                style={{
                                                    width: "120px",
                                                    backgroundSize: "80%",
                                                    filter: "drop-shadow(0px 0px 15px white)",
                                                    backgroundImage: "url(/token.png)"
                                                }}>
                                            <div className="infoPkm">
                                                <div
                                                    className="infoNbPkmToken">0
                                                </div>
                                            </div>
                                        </button>
                                    }
                                </div>
                                <div onClick={handleProfileImage} className="progress-container" data-value="100">
                                    <svg className="progress-bar" id="svg" width="120" height="120"
                                         viewPort="0 0 100 100"
                                         version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="progress-meter" r="16" cx="30" cy="90" fill="transparent"
                                                stroke-width="13" strokeDashoffset="0"></circle>
                                        <circle className="progress-value" r="16" cx="30" cy="90" fill="transparent"
                                                stroke-width="13"
                                                style={{strokeDashoffset: -parseFloat(profil[0].xp / (profil[0].level * 25) * 100).toFixed(2)}}
                                                stroke-dasharray="301.59"></circle>
                                    </svg>
                                    <span>
                                <button style={{
                                    backgroundPosition: "center center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundImage: profil[0].profil_picture ? 'url('+ '/images/Trainers/Trainer'+ profil[0].profil_picture +'.png)' : 'url(/images/random.png)',
                                    borderRadius: "25px",
                                    padding: "20px",
                                    width: "100px",
                                    height:"100px",
                                    backgroundSize: "contain"
                                }}
                                        className="uniquePokemonContainer">
                                    {profil[0].box > 0 &&
                                        <div className="infoPkm">
                                            <div className="infoNbBox">{profil[0].box}</div>
                                        </div>
                                    }
                                    <div className="infoPkm">
                                        <div className="infoEdit"><i style={{marginLeft: "-6px", marginTop: "4px"}}
                                                                     className="fa-solid fa-pencil"></i></div>
                                    </div>
                                </button>
                            </span>
                                    <div
                                        style={{width: "max-content", left: "-20px", position: "absolute", top: "85px"}}
                                        className={"xpText"}>
                                        <p style={{fontSize: "13px", textAlign: "left", width: "fit-content"}}
                                           className={"levelProfil"}>N.{profil[0].level}</p>
                                        <p style={{fontSize: "13px", textAlign: "left", width: "fit-content"}}
                                           className={"levelProfil"}>{profil[0].xp + " / " + profil[0].level * 25}</p>
                                    </div>
                                </div>

                                <button
                                    data-tooltip-content={profil[0].badge !== null ? badgesList.find((item) => item.image === profil[0].badge).description : "Ajoute un badge"}
                                    style={{backgroundImage: profil[0].badge ? 'url(/Ribbon/'+profil[0].badge+'.png)' : 'url(/images/random.png)'}}
                                    onClick={handleBadge} value={"first_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <Tooltip style={{zIndex: "1"}} anchorSelect=".anchorTooltip"/>
                            </div>
                            <p className={"pseudoProfil"}>Mon équipe</p>
                            <div className={"threePokemon"}>
                                <button
                                    style={{backgroundImage: profil[0].first_pokemon ? 'url(' + profil[0].first_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"first_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].second_pokemon ? 'url(' + profil[0].second_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"second_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].third_pokemon ? 'url(' + profil[0].third_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"third_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                            </div>
                            <div className={"threePokemon"}>
                                <button
                                    style={{backgroundImage: profil[0].fourth_pokemon ? 'url(' + profil[0].fourth_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"fourth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].fifth_pokemon ? 'url(' + profil[0].fifth_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"fifth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].sixth_pokemon ? 'url(' + profil[0].sixth_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"sixth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                            </div>
                            { pourcentCard > 0 &&
                                <>
                                    <div className={"profilVisualsCard"}>
                                        <Tooltip style={{zIndex: "1"}} anchorSelect=".anchorTooltip"/>
                                        <img style={{width: "110px"}} className="anchorTooltip"
                                             data-tooltip-content={pourcentCard + "% du Cartodex Complété"}
                                             src={pourcentCard == 100 ? Lv11c : pourcentCard >= 90 ? Lv10c : pourcentCard >= 80 ? Lv9c : pourcentCard >= 70 ? Lv8c : pourcentCard >= 60 ? Lv7c : pourcentCard >= 50 ? Lv6c : pourcentCard >= 40 ? Lv5c : pourcentCard >= 30 ? Lv4c : pourcentCard >= 20 ? Lv3c : pourcentCard >= 10 ? Lv2c : Lv1c}/>
                                    </div>
                                    <p style={{marginTop: "20px", marginBottom: "20px"}}
                                       className={"pseudoProfil"}>Dernier Booster</p>
                                    <div style={{display: "flex", flexWrap: "wrap"}}>
                                        <img style={{width: "130px"}}
                                             src={"/Boosters/" + myLastTenCards[0].booster + ".png"}/>
                                        <div className={"profilCards"}>
                                            {myLastTenCards.sort((a, b) => b.stade - a.stade).map((val, key) => {
                                                {
                                                    if (val.number !== null && val.block !== null) {
                                                        if (val.booster.startsWith("sv")) {
                                                            var cardNumber = val.number.toString().padStart(3, '0');
                                                        } else {
                                                            var cardNumber = val.number;
                                                        }
                                                        return (
                                                            <img
                                                                number={val.number}
                                                                booster={val.booster}
                                                                block={val.block}
                                                                className={val.stade == 4 ? "profilCard glowGetRainbowCard" : "profilCard"}
                                                                onError={errorImage}
                                                                alt="Grapefruit slice atop a pile of other slices"
                                                                style={{filter: val.stade == 1 ? "drop-shadow(rgb(17, 208, 154) 0px 0px 5px) drop-shadow(rgb(17, 210, 154) 0px 0px 5px) drop-shadow(rgb(17, 208, 154) 0px 0px 5px)" : val.stade == 2 ? "drop-shadow(rgb(14, 208, 214) 0px 0px 3px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px)" : val.stade == 3 && "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"}}
                                                                src={"https://assets.tcgdex.net/fr/" + val.block + "/" + val.booster + "/" + cardNumber + "/high.png"}/>

                                                        )
                                                    }
                                                }
                                            })

                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </>
                    }
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <p style={{textAlign: "center"}}>Choisis ton Skin</p>
                {profil &&
                    profil.length > 0 &&
                    profil[0].box > 0 &&
                    <button className={"openSkinBox"} onClick={openSkin}
                            style={{backgroundImage: "url(/images/skinClose.png)"}}>
                        <div className="infoPkm">
                            <div className="infoNbBoxSkin">{profil[0].box}</div>
                        </div>
                    </button>
                }
                <div style={{
                    overflow: "overlay",
                    display: "flex",
                    gap: "10px",
                    flexFlow: "row",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {skins &&
                        skins.map((val, key) => {
                            return (
                                <button value={val.skin} style={{
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundImage: "url(/images/Trainers/Trainer"+val.skin+".png)",
                                    border: "solid",
                                    borderRadius: "25px",
                                    padding: "20px",
                                    width: "100px",
                                    height: "100px",
                                    backgroundSize:"contain"
                                }} onClick={changeSkin}></button>
                            )
                        })
                    }
                < /div>
            </Modal>
            <Modal isOpen={modalTeamIsOpen} onRequestClose={closeModalTeam} style={customStyles}
                   contentLabel="Example Modal">
                <PokedexTeam list={list} change={handleState} pkmToUpdate={teamToHandle} cookies={props.cookies}/>
            </Modal>
            <Modal style={{}} overlayClassName={"overlayModalToken"} className={"modalTokenProfil"} isOpen={modalIsOpenToken} onRequestClose={closeModalToken} contentLabel="Example Modal">
                <SpawnPokemonToken  change={closeModalToken} pseudo={pseudo}/>
            </Modal>

            <Modal overlayClassName={"overlayModalToken"} className={"modalTokenProfil"} isOpen={modalIsOpenBadge}
                   onRequestClose={closeModalBadge} contentLabel="Example Modal">

                <div style={{flexFlow:"column"}} className="pokemonContentToken">
                    <p style={{textAlign: "center", fontSize: "40px", marginTop: "-100px"}}>Félicitations !!! </p>
                    <img style={{marginBottom: "30px"}} className={"badgeToWin"}
                         src={"/Ribbon/" + badgeToWinStade + ".png"}/>
                    <p style={{textAlign: "center", fontStyle: "20px"}}>{messageToBadge}</p>
                    <button style={{display: "block", margin: "auto"}} className={"filterButton"}
                            onClick={closeModalBadge}>Cool !
                    </button>
                </div>
            </Modal>

            <Modal isOpen={modalIsOpenBadgeHandle} onRequestClose={closeBadgeHandle} style={customStyles} contentLabel="Example Modal">
                <p style={{textAlign: "center"}}>Choisis ton Badge</p>
                <div style={{
                    overflow: "overlay",
                    display: "flex",
                    gap: "10px",
                    flexFlow: "row",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {badgesList &&
                        badgesList.map((val, key) => {
                            return (
                                <>

                                    <button value={val.image} style={{
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundImage: "url(/Ribbon/" + val.image + ".png)",
                                        backgroundSize:"contain",
                                        border: "none",
                                        borderRadius: "25px",
                                        padding: "20px",
                                        width: "100px",
                                        height: "100px",
                                        backgroundColor:"transparent"
                                    }} onClick={changeBadge}></button>
                                </>
                            )
                        })
                    }
                < /div>
            </Modal>
        </>
    )
}

export default Profil
