import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import token from '../token.png'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import {returnFocus} from "react-modal/lib/helpers/focusManager";

function OpeningCards(props) {

    const [tenCards, setTenCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [nbCards, setNbCards] = useState(0);
    const [isHidden, setIsHidden] = useState(true);
    const [index, setIndex] = React.useState(0)
    const [endPull, setEndPull] = React.useState(false)
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    const [isNew, setIsNew] = useState(false);
    const [getToken, setGetToken] = useState(false);
    const [isToken, setIsToken] = useState(false);
    const [block, setBlock] = useState(null);
    const [things, setThings] = useState(true);
    const [thingsBooster, setThingsBooster] = useState(true);
    const [getRareBadgeId, setGetRareBadgeId] = useState(-1);
    const [berryToWins, setBerryToWins] = useState(null);
    const [lang, setLang] = useState("fr");
    const [pkmNumber, setPkmNumber] = useState(null);

    useEffect(() => {
        if(props.idBooster == "sm115"){
            setLang("en")
        }
        window.scrollTo(0, 0)
        var berryToWin = Math.floor(Math.random() * (50 - 10 + 1) + 10);
        setBerryToWins(berryToWin);
        Axios.post('/api/addBerry',
            {
                user:props.user,
                berry:berryToWin
            })
        var tokenBonus = Math.floor(Math.random() * 5);
        const getRareBadge = Math.floor((Math.random() * 4096) + 1)
        if(tokenBonus === 2){
            setGetToken(true);
            Axios.post('/api/addPkmToken',
                {
                    user:props.user,
                    idUser: props.idUser
                }
            )
        }else if(getRareBadge === 16){
            Axios.get("/api/getBadgesByUser/" + props.user)
                .then(function (response) {
                    const badgeList = response.data;
                    var rareBadgeValue = Math.floor((Math.random() * 10) + 1);
                    setGetRareBadgeId(rareBadgeValue);
                    while (badgeList.filter(item => item.image == "rare" + rareBadgeValue).length != 0) {
                        rareBadgeValue = Math.floor((Math.random() * 10) + 1);
                    }
                    Axios.post('/api/addBadge',
                        {
                            pseudo: props.user,
                            image: "rare" + rareBadgeValue,
                            stade: 0,
                            description: "Badge Ultra Rare N°" + rareBadgeValue + " !",
                            idUser: props.idUser
                        })
                })
        }

        Axios
            .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster.replace(".", ""))
            .then(function(response){
                setMyCards(response.data);
                fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster.replace(".", ""))
                    .then(res => res.json())
                    .then(
                        (result) => {
                            if(result.status == 404){
                                fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                                setBlock(result.serie.id)
                                        }
                                    )
                            }else{
                                setBlock(result.serie.id)
                            }
                        }
                    )
            })
    }, [])
    useEffect(() => {
        myCards.map((val, key) => {
            setMyCardsId(myCardsId => [...myCardsId,val.card]);
        })
    }, [myCards]);
    useEffect(() => {
        var boosterName = props.rarities.filter(item => item.stade === 1)[Math.floor(Math.random() * props.rarities.filter(item => item.stade === 1).length)].nameGuru
        if (boosterName == "sma") {
            var boosterDex = "sma"
        } else {
            var boosterDex = props.idBooster
        }
        fetch('https://api.tcgdex.net/v2/en/cards?set.id=eq:' + boosterDex)
            .then(res => res.json())
            .then(
                (result) => {
                    setPkmNumber(result[Math.floor(Math.random() * result.length)].localId);
                }
            )
    }, [])
    useEffect(() => {
        if(pkmNumber !== null){
            Axios.get("/api/getAllMyCardsBySet/"+props.user+"/"+props.idBooster.replace(".", ""))
                .then(function(response) {
                    const gettedCards = response.data;
                    if (tenCards.length < 5) {
                        var boosterName = props.rarities.filter(item => item.stade === 1)[Math.floor(Math.random() * props.rarities.filter(item => item.stade === 1).length)].nameGuru
                        if (boosterName == "sma") {
                            var boosterDex = "sma"
                        } else {
                            var boosterDex = props.idBooster
                        }
                        fetch('https://api.tcgdex.net/v2/en/sets/' + boosterDex + '/' + pkmNumber)
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    if (result.status == 404) {
                                        fetch('https://api.tcgdex.net/v2/en/sets/' + boosterDex.replace(".", "") + '/' + pkmNumber)
                                            .then(res => res.json())
                                            .then(
                                                (result) => {
                                                    if (tenCards.length == 4) {
                                                        var randomStade = Math.floor(Math.random() * 100);
                                                        if (randomStade < 50 ) {
                                                            var stade = 3;
                                                        } else{
                                                            var stade = 4;
                                                        }
                                                    }else{
                                                        var randomStade = Math.floor(Math.random() * 100);
                                                        if (randomStade < 50 ) {
                                                            var stade = 1;
                                                        } else if (randomStade > 49 && randomStade < 84) {
                                                            var stade = 2;
                                                        } else if (randomStade > 83 && randomStade < 95) {
                                                            var stade = 3;
                                                        } else if (randomStade > 94) {
                                                            var stade = 4;
                                                        }
                                                    }
                                                    if(gettedCards.filter((uc) => uc.number == pkmNumber && uc.stade == stade).length == 0){
                                                        setTenCards(tenCards => [...tenCards, {
                                                            grade: stade,
                                                            card: result,
                                                            rarity: result.rarity,
                                                            nbCard: pkmNumber,
                                                            booster: boosterName,
                                                            isNew :1
                                                        }]);
                                                        Axios.post('/api/addCard',
                                                            {
                                                                pseudo: props.user,
                                                                idCard: result.id,
                                                                booster: props.idBooster,
                                                                rarity: result.rarity,
                                                                grade: stade,
                                                                nb: pkmNumber,
                                                                block: props.block,
                                                                idUser: props.idUser
                                                            })
                                                        Axios.post('/api/addXp',
                                                            {
                                                                user: props.user,
                                                                win: stade*10,
                                                                wins: stade*10,
                                                                idUser:props.idUser
                                                            }
                                                        )
                                                            .then(function(response){
                                                                Axios.get("/api/getProfil/"+props.user)
                                                                    .then(function(response){
                                                                        if(response.data[0].xp >= response.data[0].level * 35){
                                                                            Axios.post('/api/levelUp',
                                                                                {
                                                                                    pseudo: props.user
                                                                                }
                                                                            )
                                                                        }
                                                                    })
                                                            })
                                                    }else{
                                                        setTenCards(tenCards => [...tenCards, {
                                                            grade: stade,
                                                            card: result,
                                                            rarity: result.rarity,
                                                            nbCard: pkmNumber,
                                                            booster: boosterName,
                                                            isNew :0
                                                        }]);
                                                        if(stade > 0){
                                                            Axios.post('/api/addPowder',
                                                                {
                                                                    user: props.user,
                                                                    win: stade * 30,
                                                                    wins: stade * 30,
                                                                    idUser:props.idUser
                                                                }
                                                            )
                                                        }

                                                        Axios.post('/api/addXp',
                                                            {
                                                                user: props.user,
                                                                win: stade*10,
                                                                wins: stade*10,
                                                                idUser:props.idUser
                                                            }
                                                        )
                                                            .then(function(response){
                                                                Axios.get("/api/getProfil/"+props.user)
                                                                    .then(function(response){
                                                                        if(response.data[0].xp >= response.data[0].level * 35){
                                                                            Axios.post('/api/levelUp',
                                                                                {
                                                                                    pseudo: props.user
                                                                                }
                                                                            )
                                                                        }
                                                                    })
                                                            })
                                                    }
                                                    setIsLoaded(true);
                                                    setNbCards(nbCards + 1);
                                                }
                                            )
                                            .then(
                                                (result) => {
                                                    setIsLoaded(false);
                                                    if (tenCards.length === 4) {
                                                        setIsLoaded(false);
                                                        setThings(false)
                                                        const timeoutBooster = setTimeout(() => {
                                                            setThingsBooster(false)
                                                        }, 1001)
                                                        return () => clearTimeout(timeoutBooster)
                                                    }

                                                })
                                    } else {
                                        if (tenCards.length == 4) {
                                            var randomStade = Math.floor(Math.random() * 100);
                                            if (randomStade < 50 ) {
                                                var stade = 3;
                                            } else{
                                                var stade = 4;
                                            }
                                        }else{
                                            var randomStade = Math.floor(Math.random() * 100);
                                            if (randomStade < 50 ) {
                                                var stade = 1;
                                            } else if (randomStade > 49 && randomStade < 80) {
                                                var stade = 2;
                                            } else if (randomStade > 79 && randomStade < 95) {
                                                var stade = 3;
                                            } else if (randomStade > 94) {
                                                var stade = 4;
                                            }
                                        }
                                        if(!gettedCards.find((uc) => uc.number == pkmNumber && uc.stade == stade)){
                                            setTenCards(tenCards => [...tenCards, {
                                                card: result,
                                                rarity: result.rarity,
                                                nbCard: pkmNumber,
                                                booster: boosterName,
                                                grade: stade,
                                                isNew:1
                                            }]);

                                            Axios.post('/api/addCard',
                                                {
                                                    pseudo: props.user,
                                                    idCard: result.id,
                                                    booster: props.idBooster,
                                                    rarity: result.rarity,
                                                    grade: stade,
                                                    nb: pkmNumber,
                                                    block: props.block,
                                                    idUser: props.idUser
                                                })

                                            Axios.post('/api/addXp',
                                                {
                                                    user: props.user,
                                                    win: stade*10,
                                                    wins: stade*10,
                                                    idUser:props.idUser
                                                }
                                            )
                                                .then(function(response){
                                                    Axios.get("/api/getProfil/"+props.user)
                                                        .then(function(response){
                                                            if(response.data[0].xp >= response.data[0].level * 35){
                                                                Axios.post('/api/levelUp',
                                                                    {
                                                                        pseudo: props.user
                                                                    }
                                                                )
                                                            }
                                                        })
                                                })
                                        }else{
                                            setTenCards(tenCards => [...tenCards, {
                                                card: result,
                                                rarity: result.rarity,
                                                nbCard: pkmNumber,
                                                booster: boosterName,
                                                grade: stade,
                                                isNew:0
                                            }]);
                                            if(stade > 0){
                                                Axios.post('/api/addPowder',
                                                    {
                                                        user: props.user,
                                                        win: stade *30,
                                                        wins: stade *30,
                                                        idUser:props.idUser
                                                    }
                                                )
                                            }


                                            Axios.post('/api/addXp',
                                                {
                                                    user: props.user,
                                                    win: stade*10,
                                                    wins: stade*10,
                                                    idUser:props.idUser
                                                }
                                            )
                                                .then(function(response){
                                                    Axios.get("/api/getProfil/"+props.user)
                                                        .then(function(response){
                                                            if(response.data[0].xp >= response.data[0].level * 35){
                                                                Axios.post('/api/levelUp',
                                                                    {
                                                                        pseudo: props.user
                                                                    }
                                                                )
                                                            }
                                                        })
                                                })
                                        }
                                        setIsLoaded(true);
                                        setNbCards(nbCards + 1);

                                    }
                                }
                            )
                            .then(
                                (result) => {
                                    if (tenCards.length === 4) {
                                        setIsLoaded(false);
                                        setThings(false)
                                        const timeoutBooster = setTimeout(() => {
                                            setThingsBooster(false)
                                        }, 1001)
                                        return () => clearTimeout(timeoutBooster)
                                    }

                                })
                    }
                })

        }else{
            setNbCards(nbCards + 1);
        }
    }, [nbCards]);
    function showCards() {
        setIsHidden(false);
        if(!myCardsId.includes(tenCards.slice(0).reverse()[4].id)){
            setIsNew(true);
        }
    }
    function getCard(e) {
        var id = (e.target.getAttribute("keyCard"));
        var nextId = parseInt(id,5) - 1;
        var next = document.getElementById("cardNb"+nextId);
        var nextCardId = next.getAttribute("cardId");
        var stadeCurrent = next.getAttribute("stade");
        if(!myCardsId.includes(nextCardId)){
            setIsNew(true);
        }else{
            setIsNew(false);
        }
        next.style.display = "block";


        e.target.classList.toggle('glowGet');
        e.target.classList.toggle('gettedCard');
        setIndex(index + 1);
    }
    function getNextToken(e) {
        setIsToken(true);
        var id = (e.target.getAttribute("keyCard"));
        var nextId = parseInt(id,5) - 1;
        var next = document.getElementById("cardNb"+nextId);
        var nextCardId = next.getAttribute("cardId");
        var stadeCurrent = next.getAttribute("stade");
        if(!myCardsId.includes(nextCardId)){
            setIsNew(true);
        }else{
            setIsNew(false);
        }
        next.style.display = "block";
        e.target.classList.toggle('glowGet');
        e.target.classList.toggle('gettedCard');
        setIndex(index + 1);
    }
    function getLastCard(e) {
        setIsNew(false);
        setEndPull(true);
        props.change(props.idBooster);
        e.target.classList.toggle('endPull');
    }

    const customStyles = {
        textModal: {
            fontSize:'30px',
            textAlign:'center',
            color:"white"
        },
        imgModal: {
            width:'200px',
            marginBottom:'30px',
            borderRadius: "25px",
            filter: "drop-shadow(2px 4px 6px black)"
        },imgModal2: {
            width:'200px',
            marginBottom:'30px',
            borderRadius: "25px",
            filter: "grayscale(1)"
        },
    };
    function errorImage(e){
        e.target.onerror = null;
        if(props.idBooster == "sm115"){
            e.target.src = "https://assets.tcgdex.net/en/"+props.block+"/sma/"+e.target.getAttribute("cardLocalId")+"/high.png";
        }else if(props.idBooster == "sm7.5"){
            e.target.src = "https://assets.tcgdex.net/en/"+props.block+"/sm75/"+e.target.getAttribute("cardLocalId")+"/high.png";
        }else{
            e.target.src = "https://assets.tcgdex.net/en/"+props.block+"/"+props.idBooster+"/"+e.target.getAttribute("cardLocalId")+"/high.png";
        }
    }
    useEffect(() => {
            const timeout = setTimeout(() => {
                setIsHidden(false)
            }, 500)

            return () => clearTimeout(timeout)
    }, []);
    return (
        <>
            <div style={{
                display: thingsBooster === true ? "flex" : "none",
                justifyContent: "center",
                height: "280px",
                width: "300px"
            }}>
                <div
                    className={things === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                    <img style={customStyles.imgModal2} src={"/Boosters/" + props.idBooster + ".png"}
                         alt="Grapefruit slice atop a pile of other slices"/>
                </div>
                <div style={{overflow: "hidden"}}
                     className={things === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                    <img style={customStyles.imgModal} src={"/Boosters/" + props.idBooster + ".png"}
                         alt="Grapefruit slice atop a pile of other slices"/>
                </div>
            </div>
            {isLoaded === false &&
                <>
                    {tenCards.slice(0).reverse().map((val, key) => {
                        var stadeC = val.grade;
                        if (props.idBooster.startsWith("sv") || props.idBooster.startsWith("swsh")){
                            var boosterImg = props.idBooster
                        }else{
                            var boosterImg = props.idBooster.replace(".", "")
                        }
                        return (
                            <>
                                    <div
                                        stade={stadeC}
                                        rarity={val.rarity.rarity}
                                        style={{display: key < 4 && "none", overflow: "unset"}}
                                        keyCard={key}
                                        cardId={val.card.id}
                                        cardLocalId={val.card.localId}
                                        onClick={key == 0 ? getLastCard : getCard}
                                        className={isHidden === true ? "fit-picture dropCards hiddenCards" : stadeC > 3 ? "fit-picture dropCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlertNoShiny"}
                                        id={"cardNb" + key}>

                                        {val.isNew === 1 &&
                                            <img
                                                onClick={getLastCard}
                                                id={"tokenContainer"}
                                                style={{
                                                    display: "block",
                                                    position: "absolute",
                                                    zIndex: "100",
                                                    top: "-37px",
                                                    width: "150px",
                                                    right: "10px",
                                                    margin: 0,
                                                    filter: "drop-shadow(5px 5px 2px black)",
                                                    transform:"rotate(356deg)"
                                                }}
                                                src={"/images/new.png"}
                                                onError={errorImage}
                                                alt="Grapefruit slice atop a pile of other slices"/>
                                        }
                                        <img
                                            cardLocalId={val.card.localId}
                                            onClick={key == 0 ? getLastCard : getCard}
                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : stadeC > 3 ? "fit-picture dropCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlertNoShiny"}
                                            id={"cardNb" + key}
                                            block={block}
                                            booster={val.booster == "sma" ? "sma" : props.idBooster.replace(".", "")}
                                            local={val.nbCard}
                                            src={"https://assets.tcgdex.net/" + lang + "/" + block + "/" + boosterImg + "/" + val.card.localId + "/high.png"}
                                            onError={errorImage}
                                            alt="Grapefruit slice atop a pile of other slices"/>
                                        {getToken === true &&
                                            key === 0 &&
                                            <>
                                                <img
                                                    rarity={4}
                                                    id={"tokenContainer"}
                                                    style={{
                                                        display: "block",
                                                        position: "absolute",
                                                        zIndex: "100",
                                                        top: "-13px",
                                                        width: "100px",
                                                        left: "-13px",
                                                        margin: 0,
                                                        filter: "drop-shadow(0px 4px 4px black)"
                                                    }}
                                                    className={isHidden === true ? "fit-picture dropCards hiddenCards" : "fit-picture dropCards glowGet"}
                                                    src={token}
                                                    onError={errorImage}
                                                    alt="Grapefruit slice atop a pile of other slices"/>
                                                <p style={{
                                                    color: "white",
                                                    fontSize: "30px",
                                                    left: "45px",
                                                    top: "30px",
                                                    display: key == 0 ? "block" : "none",
                                                    position: "absolute",
                                                    zIndex: "100",
                                                    width: "100px",
                                                    margin: 0,
                                                    filter: "drop-shadow(0px 4px 4px black)",
                                                    textShadow: "4px 0 #000, -2px 0 #000, 0 4px #000, 0 -4px #000, 4px 3px #000, -1px -1px #000, 4px -3px #000, -8px 1px #000"
                                                }}
                                                   className={isHidden === true ? "fit-picture  hiddenCards" : endPull === true ? "fit-picture showCards gettedCard endPull" : key == 9 ? "fit-picture showCards glowGet" : "fit-picture  glowGet"}>+1
                                                </p>
                                            </>
                                        }
                                        {getRareBadgeId > -1 &&
                                            key === 0 &&
                                            <>
                                                <img
                                                    rarity={4}
                                                    onClick={getLastCard}
                                                    id={"tokenContainer"}
                                                    style={{
                                                        display: "block",
                                                        position: "absolute",
                                                        zIndex: "100",
                                                        top: "-13px",
                                                        width: "100px",
                                                        left: "-13px",
                                                        margin: 0,
                                                        filter: "drop-shadow(0px 4px 4px black)"
                                                    }}
                                                    className={isHidden === true ? "fit-picture dropCards hiddenCards" : "fit-picture dropCards glowGet"}
                                                    src={"/Ribbon/rare"+getRareBadgeId+".png"}
                                                    onError={errorImage}
                                                    alt="Grapefruit slice atop a pile of other slices"/>
                                                <p style={{
                                                    color: "white",
                                                    fontSize: "30px",
                                                    left: "45px",
                                                    top: "30px",
                                                    display: key == 0 ? "block" : "none",
                                                    position: "absolute",
                                                    zIndex: "100",
                                                    width: "100px",
                                                    margin: 0,
                                                    filter: "drop-shadow(0px 4px 4px black)",
                                                    textShadow: "4px 0 #000, -2px 0 #000, 0 4px #000, 0 -4px #000, 4px 3px #000, -1px -1px #000, 4px -3px #000, -8px 1px #000"
                                                }}
                                                   className={isHidden === true ? "fit-picture  hiddenCards" : endPull === true ? "fit-picture showCards gettedCard endPull" : key == 9 ? "fit-picture showCards glowGet" : "fit-picture  glowGet"}>+1
                                                </p>
                                            </>}
                                        {val.isNew == 0 &&
                                            <>
                                                <img
                                                    rarity={4}
                                                    id={"tokenContainer"}
                                                    style={{
                                                        display: "block",
                                                        position: "absolute",
                                                        zIndex: "100",
                                                        bottom: "0",
                                                        width: "100px",
                                                        right: "-33px",
                                                        margin: 0,
                                                        filter: "drop-shadow(0px 4px 4px black)"
                                                    }}
                                                    className={"fit-picture glowGet"}
                                                    src={"/images/powder.png"}
                                                    onError={errorImage}
                                                    alt="Grapefruit slice atop a pile of other slices"/>
                                                <p style={{
                                                    color: "white",
                                                    fontSize: "30px",
                                                    right: "-20px",
                                                    bottom: "-10px",
                                                    display: "block",
                                                    position: "absolute",
                                                    zIndex: "100",
                                                    width: "100px",
                                                    margin: 0,
                                                    filter: "drop-shadow(0px 4px 4px black)",
                                                    textShadow: "4px 0 #000, -2px 0 #000, 0 4px #000, 0 -4px #000, 4px 3px #000, -1px -1px #000, 4px -3px #000, -8px 1px #000"
                                                }}
                                                   className={"fit-picture glowGet"}>{val.grade == 0 ? "+5" : "+"+val.grade * 30}
                                                </p>
                                            </>
                                        }
                                        {val.grade > 0 &&
                                        <img
                                            onClick={getLastCard}
                                            id={"tokenContainer"}
                                            style={{
                                                display: "block",
                                                position: "absolute",
                                                zIndex: "100",
                                                bottom: "0",
                                                width: "75px",
                                                left: "0",
                                                margin: 0,
                                                filter: "drop-shadow(0px 4px 4px black)"
                                            }}
                                            src={"/images/stade_"+val.grade+".png"}
                                            onError={errorImage}
                                            alt="Grapefruit slice atop a pile of other slices"/>
                                        }
                                    </div>
                            </>
                        )
                    })}
                </>

            }
        </>
    )
}

export default OpeningCards
