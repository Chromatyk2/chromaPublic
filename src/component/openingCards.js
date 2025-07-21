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

    useEffect(() => {
        var tokenBonus = Math.floor(Math.random() * 5);
        if(tokenBonus === 2){
            setGetToken(true);
            Axios.post('/api/addPkmToken',
                {
                    user:props.user
                }
            )
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
                fetch('https://api.tcgdex.net/v2/en/cards?set.id=eq:' + props.idBooster)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            const pkmNumber = result[Math.floor(Math.random() * result.length)].localId;
                            fetch('https://api.tcgdex.net/v2/en/sets/' + boosterDex + '/' + pkmNumber)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        if (result.status == 404) {
                                            fetch('https://api.tcgdex.net/v2/en/sets/' + boosterDex.replace(".", "") + '/' + pkmNumber)
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {
                                                        var randomStade = Math.floor(Math.random() * 100);
                                                        if (tenCards.length == 0) {
                                                            var stade = 0;
                                                        } else {
                                                            if (randomStade < 20) {
                                                                var stade = 0;
                                                            } else if (randomStade > 19 && randomStade < 71) {
                                                                var stade = 1;
                                                            } else if (randomStade > 70 && randomStade < 86) {
                                                                var stade = 2;
                                                            } else if (randomStade > 85 && randomStade < 97) {
                                                                var stade = 3;
                                                            } else if (randomStade > 96) {
                                                                var stade = 4;
                                                            }
                                                        }
                                                        console.log("stade avant ajout : "+stade)
                                                        if(gettedCards.filter((uc) => uc.number == pkmNumber && uc.stade == stade).length == 0){
                                                            setTenCards(tenCards => [...tenCards, {
                                                                grade: stade,
                                                                card: result,
                                                                rarity: result.rarity,
                                                                nbCard: pkmNumber,
                                                                booster: boosterName,
                                                                isNew :1
                                                            }]);
                                                        }else{
                                                            setTenCards(tenCards => [...tenCards, {
                                                                grade: stade,
                                                                card: result,
                                                                rarity: result.rarity,
                                                                nbCard: pkmNumber,
                                                                booster: boosterName,
                                                                isNew :0
                                                            }]);
                                                            console.log("stade après ajout : "+stade)
                                                            console.log("numéro de carte : "+pkmNumber)
                                                            if(stade > 0){
                                                                console.log("points ajoutés" + stade * 10)
                                                                Axios.post('/api/addPowder',
                                                                    {
                                                                        user: props.user,
                                                                        win: stade * 10,
                                                                        wins: stade * 10
                                                                    }
                                                                )
                                                            }
                                                        }
                                                        Axios.post('/api/addCard',
                                                            {
                                                                pseudo: props.user,
                                                                idCard: result.id,
                                                                booster: props.idBooster,
                                                                rarity: result.rarity,
                                                                grade: stade,
                                                                nb: pkmNumber,
                                                                block: props.block
                                                            })
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
                                            var randomStade = Math.floor(Math.random() * 100);
                                            if (tenCards.length == 0) {
                                                var stade = 0;
                                            } else {
                                                if (randomStade < 20) {
                                                    var stade = 0;
                                                } else if (randomStade > 19 && randomStade < 71) {
                                                    var stade = 1;
                                                } else if (randomStade > 70 && randomStade < 86) {
                                                    var stade = 2;
                                                } else if (randomStade > 85 && randomStade < 97) {
                                                    var stade = 3;
                                                } else if (randomStade > 96) {
                                                    var stade = 4;
                                                }
                                            }
                                            console.log("numéro de la carte avant ajout : " + pkmNumber)
                                            console.log("stade avant ajout : "+stade)
                                            console.log(gettedCards.filter((uc) => uc.number == pkmNumber && uc.stade == stade))
                                            if(gettedCards.filter((uc) => uc.number == pkmNumber && uc.stade == stade).length == 0){
                                                setTenCards(tenCards => [...tenCards, {
                                                    card: result,
                                                    rarity: result.rarity,
                                                    nbCard: pkmNumber,
                                                    booster: boosterName,
                                                    grade: stade,
                                                    isNew:1
                                                }]);
                                            }else{
                                                setTenCards(tenCards => [...tenCards, {
                                                    card: result,
                                                    rarity: result.rarity,
                                                    nbCard: pkmNumber,
                                                    booster: boosterName,
                                                    grade: stade,
                                                    isNew:0
                                                }]);
                                                console.log("numéro de carte après ajout : "+pkmNumber)
                                                console.log("stade après ajout : "+stade)
                                                if(stade > 0){
                                                    console.log("points ajoutés" + stade * 10)
                                                    Axios.post('/api/addPowder',
                                                        {
                                                            user: props.user,
                                                            win: stade *10,
                                                            wins: stade *10
                                                        }
                                                    )
                                                }
                                            }
                                            Axios.post('/api/addCard',
                                                {
                                                    pseudo: props.user,
                                                    idCard: result.id,
                                                    booster: props.idBooster,
                                                    rarity: result.rarity,
                                                    grade: stade,
                                                    nb: pkmNumber,
                                                    block: props.block
                                                })
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
                    )
            }
        })
    }, [nbCards])
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
        if(stadeCurrent == 1){
            next.classList.toggle('glowGetGreen');
        }else if(stadeCurrent == 2){
            next.classList.toggle('glowGetBlue');
        }else if(stadeCurrent == 3){
            next.classList.toggle('glowGetGold');
        }else if(stadeCurrent == 4){
            next.classList.toggle('glowGetRainbow');
        }
        if(!myCardsId.includes(nextCardId)){
            setIsNew(true);
        }else{
            setIsNew(false);
        }
        next.style.display = "block";

        if(e.target.getAttribute("stade") == 1){
            e.target.classList.toggle('glowGetGreen');
        }else if(e.target.getAttribute("stade") == 2){
            e.target.classList.toggle('glowGetBlue');
        }else if(e.target.getAttribute("stade") == 3){
            e.target.classList.toggle('glowGetGold');
        }else if(e.target.getAttribute("stade") == 4){
            e.target.classList.toggle('glowGetRainbow');
        }
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
        if(stadeCurrent == 1){
            next.classList.toggle('glowGetGreen');
        }else if(stadeCurrent == 2){
            next.classList.toggle('glowGetBlue');
        }else if(stadeCurrent == 3){
            next.classList.toggle('glowGetGold');
        }else if(stadeCurrent == 4){
            next.classList.toggle('glowGetRainbow');
        }
        if(!myCardsId.includes(nextCardId)){
            setIsNew(true);
        }else{
            setIsNew(false);
        }
        next.style.display = "block";
        e.target.classList.toggle('glowGet');
        e.target.classList.toggle('gettedCard');
        if(e.target.getAttribute("stade") == 1){
            e.target.classList.toggle('glowGetGreen');
        }else if(e.target.getAttribute("stade") == 2){
            e.target.classList.toggle('glowGetBlue');
        }else if(e.target.getAttribute("stade") == 3){
            e.target.classList.toggle('glowGetGold');
        }else if(e.target.getAttribute("stade") == 4){
            e.target.classList.toggle('glowGetRainbow');
        }
        setIndex(index + 1);
    }
    function getLastCard(e) {
        setIsNew(false);
        setEndPull(true);
        props.change();
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
        if(e.target.getAttribute("booster") == "sm3.5"){
            e.target.src = "https://images.pokemontcg.io/sm35/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sm7.5"){
            e.target.src = "https://images.pokemontcg.io/sm75/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sma"){
            e.target.src = "https://images.pokemontcg.io/sma/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sm11.5"){
            e.target.src = "https://images.pokemontcg.io/sm115/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh3.5"){
            e.target.src = "https://images.pokemontcg.io/swsh35/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh4.5"){
            e.target.src = "https://images.pokemontcg.io/swsh4.5/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh12.5"){
            e.target.src = "https://images.pokemontcg.io/swsh12pt5/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv03.5"){
            e.target.src = "https://images.pokemontcg.io/sv3pt5/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv04.5"){
            e.target.src = "https://images.pokemontcg.io/sv4pt5/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv06.5"){
            e.target.src = "https://images.pokemontcg.io/sv6pt5/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv06.5"){
            e.target.src = "https://images.pokemontcg.io/sv6pt5/"+e.target.getAttribute("cardLocalId")+"_hires.png";
        }else{
            e.target.src = "https://images.pokemontcg.io/"+props.boosterGuru+"/"+e.target.getAttribute("cardLocalId")+"_hires.png";
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
                                {key === 4 ?
                                    <div
                                        stade={stadeC}
                                        rarity={val.rarity.rarity}
                                        style={{display: key < 4 && "none", overflow: "unset"}}
                                        keyCard={key}
                                        cardId={val.card.id}
                                        cardLocalId={val.card.localId}
                                        onClick={key == 0 ? getLastCard : getCard}
                                        className={isHidden === true ? "fit-picture dropCards hiddenCards" : stadeC > 2 ? "fit-picture dropCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlertNoShiny"}
                                        id={"cardNb" + key}>

                                        {val.isNew === 1 &&
                                            <div style={{position: "absolute"}} id={"shadowBox"}>
                                                <div className={"newContainer"}>
                                                    <p className={"rainbow rainbow_text_animated"}>NEW !</p>
                                                </div>
                                            </div>
                                        }
                                        <img
                                            cardLocalId={val.card.localId}
                                            onClick={key == 0 ? getLastCard : getCard}
                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : stadeC > 2 ? "fit-picture dropCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlertNoShiny"}
                                            id={"cardNb" + key}
                                            block={block}
                                            booster={val.booster == "sma" ? "sma" : props.idBooster.replace(".", "")}
                                            local={val.nbCard}
                                            src={"https://assets.tcgdex.net/fr/" + block + "/" + boosterImg + "/" + val.card.localId + "/high.png"}
                                            onError={errorImage}
                                            alt="Grapefruit slice atop a pile of other slices"/>
                                        {val.isNew == 0 &&
                                            val.grade > 0 &&
                                            <>
                                                <img
                                                    rarity={4}
                                                    id={"tokenContainer"}
                                                    style={{
                                                        display: "block",
                                                        position: "absolute",
                                                        zIndex: "100",
                                                        bottom: "25px",
                                                        width: "100px",
                                                        right: "-13px",
                                                        margin: 0,
                                                        filter: "drop-shadow(0px 4px 4px black)"
                                                    }}
                                                    className={"fit-picture dropCards glowGet"}
                                                    src={"/images/powder.png"}
                                                    onError={errorImage}
                                                    alt="Grapefruit slice atop a pile of other slices"/>
                                                <p style={{
                                                    color: "white",
                                                    fontSize: "30px",
                                                    right: "-20px",
                                                    bottom: "15px",
                                                    display: "block",
                                                    position: "absolute",
                                                    zIndex: "100",
                                                    width: "100px",
                                                    margin: 0,
                                                    filter: "drop-shadow(0px 4px 4px black)",
                                                    textShadow: "4px 0 #000, -2px 0 #000, 0 4px #000, 0 -4px #000, 4px 3px #000, -1px -1px #000, 4px -3px #000, -8px 1px #000"
                                                }}
                                                   className={"fit-picture dropCards glowGet"}>+{val.grade * 10}
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
                                    :
                                    <div
                                        stade={stadeC}
                                        rarity={val.rarity.rarity}
                                        style={{display: key < 4 && "none", overflow: "unset"}}
                                        keyCard={key}
                                        cardId={val.card.id}
                                        cardLocalId={val.card.localId}
                                        onClick={key == 0 ? getLastCard : getCard}
                                        className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : stadeC > 2 ? "fit-picture dropCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlertNoShiny"}
                                        id={"cardNb" + key}>

                                        {val.isNew === 1 &&
                                            <div style={{position: "absolute"}} id={"shadowBox"}>
                                                <div className={"newContainer"}>
                                                <p className={"rainbow rainbow_text_animated"}>NEW !</p>
                                                </div>
                                            </div>
                                        }
                                        <img
                                            cardLocalId={val.card.localId}
                                            onClick={key == 0 ? getLastCard : getCard}
                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards gettedCard endPull cardBangerAlert" : stadeC > 2 ? "fit-picture dropCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlertNoShiny"}
                                            id={"cardNb" + key}
                                            block={block}
                                            booster={val.booster == "sma" ? "sma" : props.idBooster.replace(".", "")}
                                            local={val.nbCard}
                                            src={"https://assets.tcgdex.net/fr/" + block + "/" + boosterImg + "/" + val.card.localId + "/high.png"}
                                            onError={errorImage}
                                            alt="Grapefruit slice atop a pile of other slices"/>

                                        {getToken === true &&
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
                                                   className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull" : key == 9 ? "fit-picture dropCards showCards glowGet" : "fit-picture dropCards glowGet"}>+1
                                                </p>
                                            </>
                                        }
                                        {val.isNew == 0 &&
                                            val.grade > 0 &&
                                            <>
                                                <img
                                                    rarity={4}
                                                    onClick={getLastCard}
                                                    id={"tokenContainer"}
                                                    style={{
                                                        display: "block",
                                                        position: "absolute",
                                                        zIndex: "100",
                                                        bottom: "25px",
                                                        width: "100px",
                                                        right: "-13px",
                                                        margin: 0,
                                                        filter: "drop-shadow(0px 4px 4px black)"
                                                    }}
                                                    src={"/images/powder.png"}
                                                    onError={errorImage}
                                                    alt="Grapefruit slice atop a pile of other slices"/>
                                                <p style={{
                                                    color: "white",
                                                    fontSize: "30px",
                                                    right: "-20px",
                                                    bottom: "15px",
                                                    display: "block",
                                                    position: "absolute",
                                                    zIndex: "100",
                                                    width: "100px",
                                                    margin: 0,
                                                    filter: "drop-shadow(0px 4px 4px black)",
                                                    textShadow: "4px 0 #000, -2px 0 #000, 0 4px #000, 0 -4px #000, 4px 3px #000, -1px -1px #000, 4px -3px #000, -8px 1px #000"
                                                }}
                                                   className={"fit-picture dropCards glowGet"}>+{val.grade * 10}
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
                                }
                            </>
                        )
                    })}
                </>

            }
        </>
    )
}

export default OpeningCards
