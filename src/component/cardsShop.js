import React,{useState, useEffect} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment-timezone';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";
import Countdown from "react-countdown";
import token from "../cards.png"
import OpeningBoosterTest from "./test/openingBooster";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Carousel } from 'react-responsive-3d-carousel'
import 'react-responsive-3d-carousel/dist/styles.css'

function CardsShop(props) {
    const [items, setItems] = useState(null);
    const [array, setArray] = useState([]);
    const [points,setPoints] = useState(-1);
    const [loading,setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [boosterId, setBoosterId] = React.useState(null);
    const [canOpenLive, setCanOpenLive] = React.useState(null);
    const [nextFree, setNextFree] = React.useState(null);
    const [onOpen, setOnOpen] = React.useState(false);
    const [selectedBoosterId, setSelectedBoosterId] = React.useState(0);
    const [nameGuru, setNameGuru] = React.useState(0);
    const [block, setBlock] = React.useState(0);
    const [randomBooster, setRandomBooster] = React.useState(null);
    const [globalBooster, setGlobalBoosters] = React.useState(null);
    const [powder,setPowder] = useState(null);
    const [purcents, setPurcents] = useState(null);
    const [purcentsCards, setPurcentsCards] = useState(null);
    const [badges, setBadges] = useState(null);
    const [allBadges, setAllBadges] = useState(null);
    const [boosterName, setBoosterName] = React.useState(null);
    const [badgeToWinStade, setBadgeToWinStade] = React.useState(null);
    const [boosterToDisplay, setBoosterToDisplay] = React.useState(null);
    const [modalIsOpenBadge, setIsOpenBadge] = React.useState(false);
    const [berryToWin, setBerryToWin] = React.useState(null);
    const [tokenCardToWin, setTokenCardToWin] = React.useState(null);
    const [tokenPkmToWin, setTokenPkmToWin] = React.useState(null);
    const [powderToWin, setPowderToWin] = React.useState(null);
    const [modalIsOpenSkin, setIsOpenSkin] = React.useState(false);
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
        modal: {
            border: 'none',
            background: 'none',
            borderRadius: '4px',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
    };

    useEffect(() => {
        Axios.get("/api/getBadgesByUser/"+props.user)
            .then(function(response) {
                setAllBadges(response.data)
                Axios.get("/api/getMyCardsByStade/"+props.user)
                    .then(function(response) {
                        setPurcentsCards(response.data)
                        Axios
                            .get("/api/getCardsPoint/"+props.user)
                            .then(function(response){
                                setPoints(response.data[0].cardToken);
                                Axios.get("/api/getProfil/"+props.idUser)
                                    .then(function(response){
                                        setPowder(response.data[0].powder)
                                        const dateNow = moment(Date.now()).tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss');
                                        const lastDrawing = new Date(response.data[0].lastOpening).toISOString().replace('T', ' ').split(".")[0];
                                        if(response.data[0].canOpen == 1){
                                            setCanOpenLive(response.data[0].canOpen)
                                        }else{
                                            setNextFree(moment(lastDrawing).valueOf() + 3600000);
                                            if(moment(dateNow).valueOf() - moment(lastDrawing).valueOf() >= 3600000){
                                                setCanOpenLive(1)
                                            }else{
                                                setCanOpenLive(0)
                                            }
                                        }

                                        Axios
                                            .get("/api/getBoostersList")
                                            .then(function(response){
                                                setRandomBooster(Math.floor(Math.random() * response.data.length));
                                                setItems(response.data);
                                                response.data.filter(item => item.blockName == "Wizards").map((val, key) => {
                                                    setTimeout(function() { //Start the timer
                                                        setArray(array => [...array,val])
                                                    }.bind(this), 500)
                                                })
                                            })
                                    })
                            })
                    })
            })
            }, [])
    function checkEndCountdown() {
        setCanOpenLive(1)
    }
    function selectGen(e) {
        setArray([])
        items.filter(item => item.blockName == e.target.value).map((val, key) => {
            setArray(array => [...array,val])
        })
    }

    function openModal(e) {
        var button = e.currentTarget;
        var nbBooster = e.target.getAttribute("nbBooster");
        var nameGuru = e.target.getAttribute("nameGuru");
        var block = e.target.getAttribute("block");
        button.disabled = true;
        var id = e.target.value;
        setBoosterId(id);
        setNameGuru(nameGuru);
        setBlock(block);
        Axios
            .get("/api/getCardsPoint/"+props.user)
            .then(function(response){
                if(response.data[0].cardToken - 1 > -1){
                    return Axios.post('/api/removeCardsPoint',
                        {
                            user:props.user
                        }
                    )
                        .then(function(response) {
                            Axios
                                .get("/api/getCardsPoint/"+props.user)
                                .then(function(response){
                                    setPoints(response.data[0].cardToken);
                                    button.disabled = false;
                                    setOnOpen(true);
                                })
                        })
                }else{
                    setOnOpen(false);
                }
            })
    }

    function freeBooster(e) {
        var button = e.currentTarget;
        var nbBooster = e.target.getAttribute("nbBooster");
        var nameGuru = e.target.getAttribute("nameGuru");
        var block = e.target.getAttribute("block");
        button.disabled = true;
        var id = e.target.value;
        setBoosterId(id);
        setNameGuru(nameGuru);
        setBlock(block);
        setCanOpenLive(0)
        Axios.get("/api/getProfil/"+props.idUser)
            .then(function(response){
                const dateNow = moment(Date.now()).tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss');
                const lastDrawing = new Date(response.data[0].lastOpening).toISOString().replace('T', ' ').split(".")[0];
                if(response.data[0].canOpen == 1){
                    Axios.post('/api/removeCanOpen',
                        {
                            pseudo:props.user,
                            today:moment(Date.now()).tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss')
                        }).then(function(response){
                        button.disabled = false;
                        setOnOpen(true);
                    })
                }else{
                    setNextFree(moment(lastDrawing).valueOf() + 3600000);
                    if(moment(dateNow).valueOf() - moment(lastDrawing).valueOf() >= 3600000){
                        setCanOpenLive(0)
                        Axios.post('/api/removeCanOpen',
                            {
                                pseudo:props.user,
                                today:moment(Date.now()).tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss')
                            })
                            .then(function(response){
                                button.disabled = false;
                                setOnOpen(true);
                            })
                    }else{
                        setCanOpenLive(0)
                    }
                }
            })
    }

    function closeModal() {
        setIsOpen(false);
    }
    function openModalZero(e) {
        setBadgeToWinStade(e)
        setIsOpenBadge(true);
    }
    function handleState(e,f) {
        Axios.get("/api/getProfil/"+props.idUser)
            .then(function(response) {
                setPowder(response.data[0].powder)
                const dateNow = moment(Date.now()).tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss');
                const lastDrawing = new Date(response.data[0].lastOpening).toISOString().replace('T', ' ').split(".")[0];
                if (response.data[0].canOpen == 1) {
                    setCanOpenLive(response.data[0].canOpen)
                } else {
                    setNextFree(moment(lastDrawing).valueOf() + 3600000);
                    if (moment(dateNow).valueOf() - moment(lastDrawing).valueOf() >= 3600000) {
                        setCanOpenLive(1)
                    } else {
                        setCanOpenLive(0)
                    }
                }
            })
        Axios.get("/api/getMyCardsByStade/"+props.user)
            .then(function(response) {
                setPurcentsCards(response.data)
                setRandomBooster(Math.floor(Math.random() * items.length));
                setOnOpen(false);
                setBoosterToDisplay(e);
                Axios.get("/api/getMyCardsBySet/"+props.user+"/"+e)
                    .then(function(response) {
                        const myCard = response.data;
                        Axios.get("/api/getMyCardsBySetAndStade/"+props.user+"/"+e)
                            .then(function(response) {
                                setPurcents([{stade: 1, nb: response.data.filter((item) => item.stade == "1").length}, {
                                    stade: 2,
                                    nb: response.data.filter((item) => item.stade == "2").length
                                }, {stade: 3, nb: response.data.filter((item) => item.stade == "3").length}, {
                                    stade: 4,
                                    nb: response.data.filter((item) => item.stade == "4").length
                                }])
                                const purcents = [{stade: 1, nb: response.data.filter((item) => item.stade == "1").length}, {
                                    stade: 2,
                                    nb: response.data.filter((item) => item.stade == "2").length
                                }, {stade: 3, nb: response.data.filter((item) => item.stade == "3").length}, {
                                    stade: 4,
                                    nb: response.data.filter((item) => item.stade == "4").length
                                }]
                                Axios.get("/api/getBadgesByUserAndSet/"+props.user+"/"+e)
                                    .then(function(response) {
                                        setBadges(response.data);
                                        const badges = response.data;
                                        Axios.get("/api/getBoosterByName/"+e)
                                            .then(function(response) {
                                                setBoosterName(response.data[0].fullName);
                                                if(parseFloat(myCard.length / response.data[0].totalcards * 100).toFixed(2) == 100){
                                                    if(typeof badges.find((item) => item.stade === 0) === "undefined" || badges.length == 0){
                                                        openModalZero(0);
                                                        Axios.post('/api/addBadge',
                                                            {
                                                                pseudo:props.user,
                                                                image:e+"_0",
                                                                stade:0,
                                                                description:"100% du set "+response.data[0].fullName+" - Lvl.0",
                                                                booster:e,
                                                                idUser: props.idUser
                                                            })
                                                            .then(function(response) {
                                                                Axios.get("/api/getBadgesByUserAndSet/" + props.user + "/" + e)
                                                                    .then(function (response) {
                                                                        setBadges(response.data);
                                                                    })
                                                            })
                                                    }else if(purcents.length > 0){
                                                        if(parseFloat(purcents.find((item) => item.stade == 1).nb / response.data[0].totalcards * 100).toFixed(2) == 100 && typeof badges.find((item) => item.stade === 1) === "undefined"){
                                                            openModalZero(1);
                                                            Axios.post('/api/addBadge',
                                                                {
                                                                    pseudo:props.user,
                                                                    image:e+"_1",
                                                                    stade:1,
                                                                    description:"100% du set "+response.data[0].fullName+" - Lvl.1",
                                                                    booster:e,
                                                                    idUser: props.idUser
                                                                })
                                                                .then(function(response) {
                                                                    Axios.get("/api/getBadgesByUserAndSet/" + props.user + "/" + e)
                                                                        .then(function (response) {
                                                                            setBadges(response.data);
                                                                        })
                                                                })
                                                        }else if(parseFloat(purcents.find((item) => item.stade == 2).nb / response.data[0].totalcards * 100).toFixed(2) == 100 && typeof badges.find((item) => item.stade === 2) === "undefined"){
                                                            openModalZero(2);
                                                            Axios.post('/api/addBadge',
                                                                {
                                                                    pseudo:props.user,
                                                                    image:e+"_2",
                                                                    stade:2,
                                                                    description:"100% du set "+response.data[0].fullName+" - Lvl.2",
                                                                    booster:e,
                                                                    idUser: props.idUser
                                                                })
                                                                .then(function(response) {
                                                                    Axios.get("/api/getBadgesByUserAndSet/" + props.user + "/" + e)
                                                                        .then(function (response) {
                                                                            setBadges(response.data);
                                                                        })
                                                                })
                                                        }else if(parseFloat(purcents.find((item) => item.stade == 3).nb / response.data[0].totalcards * 100).toFixed(2) == 100 && typeof badges.find((item) => item.stade === 3) === "undefined"){
                                                            openModalZero(3);
                                                            Axios.post('/api/addBadge',
                                                                {
                                                                    pseudo:props.user,
                                                                    image:e+"_3",
                                                                    stade:3,
                                                                    description:"100% du set "+response.data[0].fullName+" - Lvl.3",
                                                                    booster:e,
                                                                    idUser: props.idUser
                                                                })
                                                                .then(function(response) {
                                                                    Axios.get("/api/getBadgesByUserAndSet/" + props.user + "/" + e)
                                                                        .then(function (response) {
                                                                            setBadges(response.data);
                                                                        })
                                                                })
                                                        }else if(parseFloat(purcents.find((item) => item.stade == 4).nb / response.data[0].totalcards * 100).toFixed(2) == 100 && typeof badges.find((item) => item.stade === 4) === "undefined"){
                                                            openModalZero(4);
                                                            Axios.post('/api/addBadge',
                                                                {
                                                                    pseudo:props.user,
                                                                    image:e+"_4",
                                                                    stade:4,
                                                                    description:"100% du set "+response.data[0].fullName+" - Lvl.4",
                                                                    booster:e,
                                                                    idUser: props.idUser
                                                                })
                                                                .then(function(response) {
                                                                    Axios.get("/api/getBadgesByUserAndSet/" + props.user + "/" + e)
                                                                        .then(function (response) {
                                                                            setBadges(response.data);
                                                                        })
                                                                })
                                                        }
                                                    }
                                                }
                                            })
                                    })
                            })
                    })
            })
    }
    function changeCarousel(e) {
        setSelectedBoosterId(e)
    }
    function closeModalBadge(e) {
        setIsOpenBadge(false);
        Axios.get("/api/getBadgesByUserAndSet/"+props.user+"/"+e)
            .then(function(response) {
                if(typeof badges.find((item) => item.stade === 1) !== "undefined" && typeof badges.find((item) => item.stade === 2) !== "undefined" && typeof badges.find((item) => item.stade === 3) !== "undefined" && typeof badges.find((item) => item.stade === 4) !== "undefined"){
                    var berryToWin = 500;
                    var tokenCardToWin = 5;
                    var tokenPkmToWin = 5;
                    var powderToWin = 1500;
                    openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                }
            })
    }
    function closeModalBerry() {
        setIsOpenSkin(false);
    }

    function openModalBerry(e,f,g,h) {
        Axios.post('/api/addBerry',
            {
                user:props.user,
                berry:e
            })
            .then(function(response) {
                Axios.post('/api/addPkmPointRoulette',
                    {
                        user:props.user,
                        nbToken:g,
                        idUser: props.idUser
                    })
                    .then(function(response) {
                        Axios.post('/api/addCardsPointRoulette',
                            {
                                user:props.user,
                                nbToken:f,
                                idUser: props.idUser
                            })
                            .then(function(response) {
                                Axios.post('/api/addPowder',
                                    {
                                        user:props.user,
                                        win:h,
                                        wins:h,
                                        idUser: props.idUser
                                    })
                            })
                            .then(function(response) {
                                Axios
                                    .get("/api/getCardsPoint/"+props.user)
                                    .then(function(response) {
                                        setPoints(response.data[0].cardToken);
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
    return (
        <>
            <Modal overlayClassName={"overlayModalToken"} className={"modalTokenProfil"} isOpen={modalIsOpenSkin}
                   onRequestClose={closeModalBerry} contentLabel="Example Modal">
                <p style={{textAlign: "center", fontSize: "40px", marginTop: "-100px"}}>Félicitations tu as fini le set à
                    500 % !</p>
                <div style={{flexFlow: "column",width:"100%"}} className="pokemonContentToken">
                    <div style={{display: "flex", justifyContent: "center", marginTop: "150px", gap:"10px"}}>
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
                    <button style={{display: "block", margin: "auto"}} className={"filterButton filterButtonDelayed"}
                            onClick={closeModalBerry}>Cool !
                    </button>
                </div>
            </Modal>
            <Modal overlayClassName={"overlayModalToken"} className={"modalTokenProfil"} isOpen={modalIsOpenBadge} onRequestClose={closeModal} style={customStyles.modal} contentLabel="Example Modal">
                <p style={{textAlign:"center", fontSize:"40px", marginTop:"-100px"}}>Félicitations !!! </p>
                <img style={{marginBottom:"30px"}} className={"badgeToWin"} src={"/Ribbon/"+boosterToDisplay+"_"+badgeToWinStade+".png"}/>
                <p style={{textAlign:"center", fontStyle:"20px"}}>Set rempli à 100% {badgeToWinStade != 0 && "avec les cartes de rareté "+ badgeToWinStade} !!</p>
                <button style={{display:"block",margin:"auto"}} className={"filterButton"}  onClick={() => closeModalBadge(boosterToDisplay)}>Cool !</button>
            </Modal>
            {onOpen === true ?
                <OpeningBooster change={(e,f) => handleState(e,f)} idBooster={boosterId} user={props.user} boosterGuru={nameGuru} block={block} idUser={props.idUser}/>
                :
                canOpenLive !== null &&
                <>
                    <div>
                        {points &&
                        points == -1 ?
                            <div className="myPointsDisplay">
                            </div>
                            :
                            <div style={{marginBottom: "-25px", marginTop: "10px"}} className="myPointsDisplay">
                                <img style={{display: "block", margin: "auto", width: "50px"}} src={token}/>
                                <p style={{color: "white", textAlign: "center"}}>Token TCG : {points}</p>
                            </div>
                        }
                        {canOpenLive == 1 ?
                            <div id="icomp-neon">
                                <p><span href="http://tuts.icomp.ir">
                                Booster Gratuit Disponible
                            </span></p>
                            </div>
                            :
                            <div style={{marginTop: "15px"}} className="myPointsDisplay">
                                <p style={{marginBottom: "10px", textAlign: "center"}}>
                                    <span>Prochain booster Gratuit dans : </span>
                                    <Countdown
                                        date={nextFree}
                                        intervalDelay={0}
                                        precision={3}
                                        onComplete={checkEndCountdown}
                                    />
                                </p>
                            </div>
                        }
                        <p style={{color: "red", textAlign: "center"}}>Obtiens plus de boosters sur le stream de Chroma quand il est en live <a style={{fontSize:"15px"}} href={"https://twitch.tv/chromatyk"} target={"_blank"}>ici</a></p>
                    </div>
                    <select className={"selectGen"} onChange={selectGen} name="pets" id="pet-select">
                    <option value="Wizards">Wizards</option>
                        <option value="Ex">Ex</option>
                        <option value="Diamant et Perle">Diamant et Perle</option>
                        <option value="Platine">Platine</option>
                        <option value="HeartGold SoulSilver">HeartGold SoulSilver</option>
                        <option value="Appel des légendes">Appel des légendes</option>
                        <option value="Noir et Blanc">Noir et Blanc</option>
                        <option value="XY">XY</option>
                        <option value="Soleil let Lune">Soleil et Lune</option>
                        <option value="Épée et Bouclier">Épée et Bouclier</option>
                        <option value="Écarlate et Violet">Écarlate et Violet</option>
                        <option value="Mega Evolution">Méga-Évolution</option>
                        <option value="TCGP">TCGP</option>
                    </select>
                    <div id={"cardsContainer"}>
                        {randomBooster &&
                            <div className="uniqueTradeContainerRandom">
                                <div style={{height: "70px"}} className={"containerImgBooster"}>
                                    <img style={{width: "70px"}} className="fit-picture" src={"/images/random.png"}
                                         alt="Grapefruit slice atop a pile of other slices"/>
                                </div>
                                <div>
                                    {points > 0 ?
                                        loading === false ?
                                            <button style={{
                                                fontSize: "13px",
                                                margin: " 0px",
                                                fontsize: "13px",
                                                height: "25px",
                                                lineHeight: "8px",
                                                width: "180px"
                                            }}
                                                    value={items[randomBooster].name}
                                                    nameGuru={items[randomBooster].nameGuru}
                                                    block={items[randomBooster].block}
                                                    onClick={openModal}
                                                    className="guessTradeButton">Ouvrir
                                            </button>
                                            :
                                            <button style={{
                                                fontSize: "13px",
                                                margin: " 0px",
                                                fontsize: "13px",
                                                height: "25px",
                                                lineHeight: "8px",
                                                width: "180px"
                                            }} className="guessTradeButton">Chargement</button>
                                        :
                                        <button style={{
                                            fontSize: "13px",
                                            margin: " 0px",
                                            fontsize: "13px",
                                            height: "25px",
                                            lineHeight: "8px",
                                            width: "180px"
                                        }} className="guessTradeButton">Aucun Token</button>
                                    }
                                    {canOpenLive == 1 &&
                                        <button style={{
                                            fontSize: "13px",
                                            margin: " 0px",
                                            fontsize: "13px",
                                            height: "25px",
                                            lineHeight: "8px",
                                            width: "180px",
                                            marginTop: "10px"
                                        }}
                                                value={items[randomBooster].name}
                                                nameGuru={items[randomBooster].nameGuru}
                                                block={items[randomBooster].block}
                                                onClick={freeBooster}
                                                className="guessTradeButton">Booster Gratuit
                                        </button>
                                    }
                                </div>
                            </div>
                        }
                        {array.length > 0 &&
                            array.map((val, key) => {
                                return (
                                    <div style={{background:
                                            !allBadges.find((uc) => uc.booster == val.name) ?
                                                "rgba(255, 255, 255, 0.1)"
                                                :
                                            allBadges.filter((uc) => uc.booster == val.name).sort((a, b) => b.stade - a.stade)[0].stade == 4 ?
                                            "linear-gradient(111deg,rgba(255, 0, 0, 1) 0%,rgba(255, 154, 0, 1) 10%,rgba(208, 222, 33, 1) 20%,rgba(79, 220, 74, 1) 30%,rgba(63, 218, 216, 1) 40%,rgba(47, 201, 226, 1) 50%,rgba(28, 127, 238, 1) 60%,rgba(95, 21, 242, 1) 70%,rgba(186, 12, 248, 1) 80%,rgba(251, 7, 217, 1) 90%,rgba(255, 0, 0, 1) 100%)"
                                            : allBadges.filter((uc) => uc.booster == val.name).sort((a, b) => b.stade - a.stade)[0].stade == 3 ? "rgb(229, 211, 48)"
                                                : allBadges.filter((uc) => uc.booster == val.name).sort((a, b) => b.stade - a.stade)[0].stade == 2 ? "rgb(129, 173, 239)"
                                                    : allBadges.filter((uc) => uc.booster == val.name).sort((a, b) => b.stade - a.stade)[0].stade == 1 ? "rgb(64, 178, 75)"
                                                        : "rgba(211, 211, 211, 1)", padding: "15px", borderRadius: "10px", position:"relative"}}>
                                        {allBadges.find((uc) => uc.booster == val.name) &&
                                            <img style={{filter: "drop-shadow(black 0px 0px 5px)",position: "absolute",zIndex: 1,right: "-25px",top: "-25px",width: "120px"}} src={"/Ribbon/" + allBadges.filter((uc) => uc.booster == val.name).sort((a, b) => b.stade - a.stade)[0].booster + "_"+allBadges.filter((uc) => uc.booster == val.name).sort((a, b) => b.stade - a.stade)[0].stade+".png"}/>
                                        }
                                        <div style={{
                                            alignItems: "center",
                                            display: "flex",
                                            height: "300px",
                                            justifyContent: "center",
                                            backgroundImage: "url(/Boosters/" + val.name + ".png)",
                                            width: "220px",
                                            backgroundSize: "contain",
                                            backgroundPosition: "top",
                                            borderRadius: "10px",
                                            position: "relative",
                                            gap: '5px',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPositionY: "-15px",
                                            filter: "drop-shadow(0px 0px 6px black)"
                                        }}>
                                            <div className={"buttonsBooster"}>
                                                <p style={{
                                                    fontFamily: 'Russo One',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    margin: 0,
                                                    fontSize: "13px",
                                                    fontWeight: "bold",
                                                    letterSpacing: "1px"
                                                }}>{val.fullName}</p>
                                                {canOpenLive == 0 &&
                                                    points > 0 &&
                                                    <button style={{
                                                        fontSize: "13px",
                                                        width: "180px",
                                                        margin: "0",
                                                        height: "22px",
                                                        lineHeight: "3px"
                                                    }}
                                                            value={val.name}
                                                            nameGuru={val.nameGuru}
                                                            block={val.block}
                                                            onClick={openModal}
                                                            className="guessTradeButton">Ouvrir
                                                    </button>
                                                }
                                                {canOpenLive == 1 &&
                                                    <button style={{
                                                        fontSize: "13px",
                                                        width: "180px",
                                                        margin: "0",
                                                        height: "22px",
                                                        lineHeight: "3px"
                                                    }}
                                                            value={val.name}
                                                            nameGuru={val.nameGuru}
                                                            block={val.block}
                                                            onClick={freeBooster}
                                                            className="guessTradeButton">Booster Gratuit
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <div style={{background: "#40b24b"}}>
                                            <p style={{filter: "drop-shadow(0px 2px 1px black)",color: "white", textAlign: "center", margin:0,
                                                fontWeight: "bold",
                                                letterSpacing: "1px"}}>Stade 1
                                                : {purcentsCards.filter((item) => item.booster == val.name && item.stade == "1").length + " / " + val.totalcards} </p>
                                        </div>
                                        <div style={{background: "#81adef"}}>
                                            <p style={{filter: "drop-shadow(0px 2px 1px black)",color: "white", textAlign: "center", margin:0,
                                                fontWeight: "bold",
                                                letterSpacing: "1px"}}>Stade 2
                                                : {purcentsCards.filter((item) => item.booster == val.name && item.stade == "2").length + " / " + val.totalcards} </p>
                                        </div>
                                        <div style={{background: "#e5d330"}}>
                                            <p style={{filter: "drop-shadow(0px 2px 1px black)",color: "white", textAlign: "center", margin:0,
                                                fontWeight: "bold",
                                                letterSpacing: "1px"}}>Stade 3
                                                : {purcentsCards.filter((item) => item.booster == val.name && item.stade == "3").length + " / " + val.totalcards} </p>
                                        </div>
                                        <div style={{borderRadius:"0 0 10px 10px", background: "linear-gradient(90deg,rgba(255, 0, 0, 1) 0%,rgba(255, 154, 0, 1) 10%,rgba(208, 222, 33, 1) 20%,rgba(79, 220, 74, 1) 30%,rgba(63, 218, 216, 1) 40%,rgba(47, 201, 226, 1) 50%,rgba(28, 127, 238, 1) 60%,rgba(95, 21, 242, 1) 70%,rgba(186, 12, 248, 1) 80%,rgba(251, 7, 217, 1) 90%,rgba(255, 0, 0, 1) 100%)"}}>
                                            <p style={{filter: "drop-shadow(0px 2px 1px black)",color: "white", textAlign: "center", margin:0,
                                                fontWeight: "bold",
                                                letterSpacing: "1px"}}>Stade 4
                                                : {purcentsCards.filter((item) => item.booster == val.name && item.stade == "4").length + " / " + val.totalcards} </p>
                                        </div>
                                    </div>

                                )
                            })
                            // <div style={{width: "100%"}}>
                            //     <Carousel onChange={(item) => changeCarousel(item)}
                            //               transformDuration={100}
                            //               transformTimingFn={"linear"}
                            //               items={array}
                            //               startIndex={0}
                            //               interval={10000}
                            //               pauseOnHover={false}
                            //     >
                            //         <div className={"buttonsBooster"}>
                            //             {points > 0 ?
                            //                 loading === false ?
                            //                     <button
                            //                                 style={{fontSize: "13px", width: "180px", margin:"0"}}
                            //                                 value={items[selectedBoosterId].name}
                            //                                 nameGuru={items[selectedBoosterId].nameGuru}
                            //                                 block={items[selectedBoosterId].block}
                            //                                 onClick={openModal}
                            //                                 className="guessTradeButton">Ouvrir
                            //                         </button>
                            //                     :
                            //                         <button style={{fontSize: "13px", width: "180px", margin:"0"}} className="guessTradeButton">Chargement</button>
                            //                 :
                            //                     <button style={{fontSize: "13px", width: "180px", margin:"0"}} className="guessTradeButton">Aucun Token</button>
                            //             }
                            //             {canOpenLive == 1 &&
                            //                 <button style={{fontSize: "13px", width: "180px", margin:"0"}}
                            //                             value={items[selectedBoosterId].name}
                            //                             nameGuru={items[selectedBoosterId].nameGuru}
                            //                             block={items[selectedBoosterId].block}
                            //                             onClick={freeBooster}
                            //                             className="guessTradeButton">Booster Gratuit
                            //                 </button>
                            //             }
                            //         </div>
                            //     </Carousel>
                            // </div>
                        }
                    </div>
                </>
            }

        </>
    )
}

export default CardsShop