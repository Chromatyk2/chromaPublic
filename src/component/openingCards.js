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
        var tokenBonus = Math.floor(Math.random() * 10);
        if(tokenBonus == 0){
            setGetToken(true);
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
        if(tenCards.length == 0){
            const boosterGuru = props.rarities.filter(item => item.stade ==  1)[Math.floor(Math.random() * props.rarities.filter(item => item.stade == 1 ).length)].nameGuru
            const commonRarities = [{rarity : 'Common', stade:0},{rarity : 'Uncommon', stade:0}]
            var rarity = commonRarities[Math.floor(Math.random() * commonRarities.length)]
            fetch('https://api.pokemontcg.io/v2/cards?q=set.id:'+boosterGuru+' !rarity:"'+rarity.rarity+'"')
                .then(res => res.json())
                .then(
                    (result) => {
                            const pkmNumber = result.data[Math.floor(Math.random() * result.data.length)].number;
                            fetch('https://api.tcgdex.net/v2/en/sets/'+props.idBooster+'/'+pkmNumber)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        if(result.status == 404){
                                            fetch('https://api.tcgdex.net/v2/en/sets/'+props.idBooster.replace(".","")+'/'+pkmNumber)
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {
                                                        var stade = rarity.stade;
                                                        Axios.post('/api/addCard',
                                                            {
                                                                pseudo:props.user,
                                                                idCard:result.id,
                                                                booster:props.idBooster,
                                                                rarity:rarity.rarity,
                                                                stade:stade,
                                                                nb:result.localId,
                                                                block:props.block
                                                            })
                                                        setIsLoaded(true);
                                                        setTenCards(tenCards => [...tenCards,{card :result, rarity:rarity.rarity, booster:boosterName}]);
                                                        setNbCards (nbCards + 1);
                                                    }
                                                )
                                        }else{
                                            var stade = rarity.stade;
                                            Axios.post('/api/addCard',
                                                {
                                                    pseudo:props.user,
                                                    idCard:result.id,
                                                    booster:props.idBooster,
                                                    rarity:rarity.rarity,
                                                    stade:stade,
                                                    nb:result.localId,
                                                    block:props.block
                                                })
                                            setIsLoaded(true);
                                            setTenCards(tenCards => [...tenCards,{card :result, rarity:rarity.rarity, booster:boosterName}]);
                                            setNbCards (nbCards + 1);

                                        }
                                    }
                                )
                }
            )
        }else if(tenCards.length < 5 && tenCards.length > 0){
            const commonRarities = [{rarity : 'Common', stade:0},{rarity : 'Uncommon', stade:0}]
            var randomStade = Math.floor(Math.random() * 101);
            if(randomStade > 70 ){
                if(randomStade > 95){
                    var rarity = props.rarities.filter(item => item.stade ===  4)[Math.floor(Math.random() * props.rarities.filter(item => item.stade ===  4).length)]
                    var boosterName = rarity.nameGuru;
                }else{
                    var rarity = props.rarities.filter(item => item.stade <  4)[Math.floor(Math.random() * props.rarities.filter(item => item.stade <  4).length)]
                    var boosterName = rarity.nameGuru;
                }
            }else{
                var rarity = commonRarities[Math.floor(Math.random() * commonRarities.length)]
                var boosterName = props.rarities.filter(item => item.stade ===  1)[Math.floor(Math.random() * props.rarities.filter(item => item.stade ===  1).length)].nameGuru
            }
            if(boosterName == "sma"){
                var boosterDex = "sma"
            }else if(boosterName.startsWith("sv")){
                var boosterName = rarity.booster
            }else{
                var boosterDex = props.idBooster
            }
            fetch('https://api.pokemontcg.io/v2/cards?q=set.id:'+boosterName+' !rarity:"'+rarity.rarity+'"')
                .then(res => res.json())
                .then(
                    (result) => {
                            const pkmNumber = result.data[Math.floor(Math.random() * result.data.length)].number;
                            fetch('https://api.tcgdex.net/v2/en/sets/'+boosterDex+'/'+pkmNumber)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        if(result.status == 404){
                                            fetch('https://api.tcgdex.net/v2/en/sets/'+boosterDex.replace(".","")+'/'+pkmNumber)
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {
                                                        var stade = rarity.stade;
                                                        Axios.post('/api/addCard',
                                                            {
                                                                pseudo:props.user,
                                                                idCard:result.id,
                                                                booster:props.idBooster,
                                                                rarity:rarity.rarity,
                                                                stade:stade,
                                                                nb:pkmNumber,
                                                                block:props.block
                                                            })
                                                        setIsLoaded(true);
                                                        setTenCards(tenCards => [...tenCards,{card :result, rarity:rarity.rarity, nbCard:pkmNumber, booster:boosterName}]);
                                                        setNbCards (nbCards + 1);
                                                    }
                                                )
                                                .then(
                                                    (result) => {
                                                        setIsLoaded(false);
                                                        if(tenCards.length === 4){
                                                            setIsLoaded(false);
                                                            setThings(false)
                                                            const timeoutBooster = setTimeout(() => {
                                                                setThingsBooster(false)
                                                            }, 1001)
                                                            return () => clearTimeout(timeoutBooster)
                                                        }

                                                    })
                                        }else{
                                            var stade = rarity.stade;
                                            Axios.post('/api/addCard',
                                                {
                                                    pseudo:props.user,
                                                    idCard:result.id,
                                                    booster:props.idBooster,
                                                    rarity:rarity.rarity,
                                                    stade:stade,
                                                    nb:pkmNumber,
                                                    block:props.block
                                                })
                                            setIsLoaded(true);
                                            setTenCards(tenCards => [...tenCards,{card :result, rarity:rarity.rarity, nbCard:pkmNumber, booster:boosterName}]);
                                            setNbCards (nbCards + 1);

                                        }
                                    }
                                )
                                .then(
                                    (result) => {
                                        if(tenCards.length === 4){
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
            {isNew === true &&
                <div style={{position: "absolute"}} id={"shadowBox"}>
                    <div className={"newContainer"}>
                        <p className={"rainbow rainbow_text_animated"}>NEW !</p>
                    </div>
                </div>
            }
            {isLoaded === false &&
                <>
                    {tenCards.slice(0).reverse().map((val, key) => {
                        if (val.rarity != "Common" && val.rarity != "Uncommon" && typeof val.rarity !== "undefined") {
                            var stadeC = props.rarities.find((uc) => uc.rarity.toUpperCase() === val.rarity.toUpperCase()).stade;
                        } else {
                            var stadeC = 0;
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
                                        <img
                                            cardLocalId={val.card.localId}
                                            onClick={key == 0 ? getLastCard : getCard}
                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : stadeC > 2 ? "fit-picture dropCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlertNoShiny"}
                                            id={"cardNb" + key}
                                            block={block}
                                            booster={val.booster == "sma" ? "sma" : props.idBooster.startsWith("sv") ? val.booster : props.idBooster.replace(".", "")}
                                            local={val.nbCard}
                                            src={"https://assets.tcgdex.net/fr/" + block + "/" + props.idBooster.replace(".", "") + "/" + val.card.localId + "/high.png"}
                                            onError={errorImage}
                                            alt="Grapefruit slice atop a pile of other slices"/>
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
                                        <img
                                            cardLocalId={val.card.localId}
                                            onClick={key == 0 ? getLastCard : getCard}
                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards gettedCard endPull cardBangerAlert" : stadeC > 2 ? "fit-picture dropCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlertNoShiny"}
                                            id={"cardNb" + key}
                                            block={block}
                                            booster={val.booster == "sma" ? "sma" : props.idBooster.startsWith("sv") ? val.booster : props.idBooster.replace(".", "")}
                                            local={val.nbCard}
                                            src={"https://assets.tcgdex.net/fr/" + block + "/" + props.idBooster.replace(".", "") + "/" + val.card.localId + "/high.png"}
                                            onError={errorImage}
                                            alt="Grapefruit slice atop a pile of other slices"/>
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
