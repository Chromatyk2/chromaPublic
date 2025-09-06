import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import ProgressBarCard from "./progressBarCard";
import UniqueCard from "./UniqueCard.js";
import Modal from "react-modal";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {parseWithOptions} from "date-fns/fp";
import progressBarCard from "./progressBarCard";

function MyCardsSet(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [items, setItems] = useState(  []);
    const [sets, setSets] = useState(  []);
    const [setsBis, setSetBis] = useState(  []);
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [myCardNb, setMyCardNb] = React.useState(null);
    const [myCardImage, setMyCardImage] = React.useState(null);
    const [pokemonName, setPokemonName] = React.useState(null);
    const [cardId, setCardId] = React.useState(null);
    const [errorCard, setErrorCard] = React.useState("");
    const [rarities, setRarities] = useState(null);
    const [stadeCard, setStadeCard] = useState(0);
    const [filterRarity, setFilterRarity] = React.useState("");
    const [onlyMine, setOnlyMine] = React.useState(true);
    const [bonusSet, setBonusSet] = React.useState(false);
    const [pickStade, setPickStade] = React.useState(null);
    const [pickCard, setPickCard] = React.useState(null);
    const [pickCardId, setPickCardId] = React.useState(null);
    const [myCardWithStade, setMyCardWithStade] = React.useState(null);
    const [stadeToFilter, setStadeToFilter] = React.useState(null);
    const [lang, setLang] = React.useState("fr");
    const [powder, setPowder] = React.useState(props.powder);
    const [refresh, setRefresh] = React.useState(0);
    const [isFiltered, setIsFiltered] = React.useState(false);
    const [berryToWin, setBerryToWin] = React.useState(null);
    const [tokenCardToWin, setTokenCardToWin] = React.useState(null);
    const [tokenPkmToWin, setTokenPkmToWin] = React.useState(null);
    const [powderToWin, setPowderToWin] = React.useState(null);
    const [modalIsOpenSkin, setIsOpenSkin] = React.useState(false);

    const customStyles = {
        buttonMyCard: {
            border:'none',
            background:'none',
            padding:0,
            width:"350px",
            height:"480px",
            position:"relative"
        }, buttonMyCardModal: {
            border:'none',
            background:'none',
            padding:0,
            width:"350px",
            height:"480px",
            position:"relative",
            margin: "auto",
            marginBottom: "25px",
        }
    };
    useEffect(() => {
        if(props.idBooster == "sm115"){
            setLang("en")
        }
        Axios.get("/api/getProfil/"+props.user)
            .then(function(response) {
                setPowder(response.data[0].powder)
                Axios
                    .get("/api/getRaritiesByBooster/"+props.idBooster)
                    .then(function(response){
                        setRarities(response.data);
                        if(response.data[0].block == "gym" || response.data[0].block == "col"){
                            setLang("en")
                        }
                    })
            })
    }, [])
    useEffect(() => {
        Axios
            .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
            .then(function(response){
                setMyCards(response.data);
                response.data.map((val, key) => {
                    setMyCardsId(myCardsId => [...myCardsId,val.card]);
                })
                Axios.get("/api/getMyCardsBySetAndStade/"+props.user+"/"+props.idBooster)
                    .then(function(response) {
                        setMyCardWithStade(response.data)
                        fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                if(result.status == 404){
                                    fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster.replace(".",""))
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                setItems(result.cards)
                                                setIsLoaded(false);
                                            },
                                            (error) => {
                                                setIsLoaded(true);
                                                setError(error);
                                            }
                                        )
                                }else if(props.idBooster === "sm115"){
                                    setItems(result.cards)
                                    fetch("https://api.tcgdex.net/v2/en/sets/sma")
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                result.cards.map((val, key) => {
                                                    setItems(items => [...items,val]);
                                                })
                                                setIsLoaded(false);
                                            },
                                            (error) => {
                                                setIsLoaded(true);
                                                setError(error);
                                            }
                                        )
                                }else{
                                    setItems(result.cards)
                                    setIsLoaded(false);
                                }
                            },
                            (error) => {
                                setIsLoaded(true);
                                setError(error);
                            }
                        )

                    })
            })
    }, []);
    function openModal(e) {
        setMyCardImage(e.target.getAttribute("image"));
        setMyCardNb(e.target.getAttribute("myCardNb"));
        setPokemonName(e.target.getAttribute("pokemonId"));
        setCardId(e.target.getAttribute("cardId"));
        setStadeCard(e.target.getAttribute("stade"));
        setIsOpen(true);
    }

    function closeModal() {
        if(isFiltered === true){
            setTimeout(function (){
                window.scrollTo(0, 0)
            },10);
        }
        setIsOpen(false);
        setRefresh(refresh+1)
        Axios.get("/api/getBadgesByUserAndSet/"+props.user+"/"+props.idBooster)
            .then(function(response) {
                if(typeof response.data.find((item) => item.stade === 1) !== "undefined" && typeof response.data.find((item) => item.stade === 2) !== "undefined" && typeof response.data.find((item) => item.stade === 3) !== "undefined" && typeof response.data.find((item) => item.stade === 4) !== "undefined"){
                    var berryToWin = 500;
                    var tokenCardToWin = 5;
                    var tokenPkmToWin = 5;
                    var powderToWin = 1500;
                    openModalBerry(berryToWin, tokenCardToWin, tokenPkmToWin, powderToWin);
                }
            })
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
                                Axios.get("/api/getProfil/"+props.user)
                                    .then(function(response) {
                                        setPowder(response.data[0].powder)
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
    function handleState() {
        setIsOpen(false);
    }
    function errorImages(e, booster, number){
        e.target.onerror = null;
        if(props.idBooster == "sm115"){
            e.target.src = "https://assets.tcgdex.net/en/"+rarities[0].block+"/sma/"+number+"/high.png";
        }else if(props.idBooster == "sm7.5"){
            e.target.src = "https://assets.tcgdex.net/en/"+rarities[0].block+"/sm75/"+number+"/high.png";
        }else{
            e.target.src = "https://assets.tcgdex.net/en/"+rarities[0].block+"/"+props.idBooster+"/"+number+"/high.png";
        }
    }
    function handleState() {
        setIsOpen(false);
    }

    function tradePowder(e) {
        setPickCard(e.target.getAttribute("number"));
        setPickCardId(e.target.getAttribute("card"));
        var randomStade = Math.floor(Math.random() * 100);
        if (randomStade < 20) {
            var pickStade = 1;
            setPickStade(1);
        } else if (randomStade > 19 && randomStade < 70) {
            var pickStade = 2;
            setPickStade(2);
        } else if (randomStade > 69 && randomStade < 90) {
            var pickStade = 3;
            setPickStade(3);
        } else if (randomStade > 89) {
            var pickStade = 4;
            setPickStade(4);
        }
        while (myCardWithStade.filter((uc) => uc.card == e.target.getAttribute("card") && uc.stade == pickStade).length != 0) {
            randomStade = Math.floor(Math.random() * 100);
            if (randomStade < 20) {
                pickStade = 1;
                setPickStade(1);
            } else if (randomStade > 19 && randomStade < 70) {
                pickStade = 2;
                setPickStade(2);
            } else if (randomStade > 69 && randomStade < 90) {
                pickStade = 3;
                setPickStade(3);
            } else if (randomStade > 89) {
                pickStade = 4;
                setPickStade(4);
            }
        }

        Axios.get("/api/getProfil/"+props.user)
            .then(function(response) {
                if(response.data[0].powder - 300 > -1){
                    Axios.post('/api/removePowder',
                        {
                            user:props.user
                        }
                    )
                        .then(function(response){
                            Axios.post('/api/addCard',
                                {
                                    pseudo: props.user,
                                    idCard: e.target.getAttribute("card"),
                                    booster: e.target.getAttribute("booster"),
                                    rarity: "Rare",
                                    grade: pickStade,
                                    nb: e.target.getAttribute("number"),
                                    block: e.target.getAttribute("block"),
                                    idUser: props.idUser
                                })
                                .then(function(){
                                    Axios.get("/api/getProfil/"+props.user)
                                        .then(function(response) {
                                            setPowder(response.data[0].powder)
                                            Axios
                                                .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
                                                .then(function(response){
                                                    setMyCards(response.data);
                                                    response.data.map((val, key) => {
                                                        setMyCardsId(myCardsId => [...myCardsId,val.card]);
                                                    })
                                                    Axios.get("/api/getMyCardsBySetAndStade/"+props.user+"/"+props.idBooster)
                                                        .then(function(response) {
                                                            setMyCardWithStade(response.data);
                                                            var myCardWithStade = response.data;
                                                            fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster)
                                                                .then(res => res.json())
                                                                .then(
                                                                    (result) => {
                                                                        if(result.status == 404){
                                                                            fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster.replace(".",""))
                                                                                .then(res => res.json())
                                                                                .then(
                                                                                    (result) => {
                                                                                        if(stadeToFilter){
                                                                                            setItems([])
                                                                                            result.cards.sort((a, b) => a.localId - b.localId).map((val, key) => {
                                                                                                if(!myCardWithStade.find((uc) => uc.card == val.id && uc.stade == stadeToFilter)){
                                                                                                    setItems(myCardsId => [...myCardsId,val]);
                                                                                                }
                                                                                            })
                                                                                        }else{
                                                                                            setItems(result.cards)
                                                                                        }
                                                                                        setIsOpen(true)
                                                                                        if(props.idBooster === "sm11.5"){
                                                                                            fetch("https://api.tcgdex.net/v2/en/sets/sma")
                                                                                                .then(res => res.json())
                                                                                                .then(
                                                                                                    (result) => {
                                                                                                        setIsOpen(true)
                                                                                                        if(stadeToFilter){
                                                                                                            setItems([])
                                                                                                            result.cards.sort((a, b) => a.localId - b.localId).map((val, key) => {
                                                                                                                if(!myCardWithStade.find((uc) => uc.card == val.id && uc.stade == stadeToFilter)){
                                                                                                                    setItems(myCardsId => [...myCardsId,val]);
                                                                                                                }
                                                                                                            })
                                                                                                        }else{
                                                                                                            setItems(result.cards)
                                                                                                        }
                                                                                                    },
                                                                                                    (error) => {
                                                                                                        setError(error);
                                                                                                    }
                                                                                                )
                                                                                        }
                                                                                    },
                                                                                    (error) => {
                                                                                        setIsLoaded(true);
                                                                                        setError(error);
                                                                                    }
                                                                                )
                                                                        }else{
                                                                            setIsOpen(true)
                                                                            if(stadeToFilter){
                                                                                setItems([])
                                                                                result.cards.sort((a, b) => a.localId - b.localId).map((val, key) => {
                                                                                    console.log(val.id)
                                                                                    console.log(stadeToFilter)
                                                                                    console.log(myCardWithStade)
                                                                                    if(!myCardWithStade.find((uc) => uc.card == val.id && uc.stade == stadeToFilter)){
                                                                                        setItems(myCardsId => [...myCardsId,val]);
                                                                                    }
                                                                                })
                                                                            }else{
                                                                                setItems(result.cards)
                                                                            }
                                                                            setIsLoaded(false);

                                                                        }
                                                                    },
                                                                    (error) => {
                                                                        setIsLoaded(true);
                                                                        setError(error);
                                                                    }
                                                                )
                                                        })
                                                })
                                        })
                                })
                        })
                }
            })
    }
    const handleChangeOnlyMine = event => {
        if (event.target.checked) {
            setOnlyMine(false);
        } else {
            setOnlyMine(true);
        }
    };
    const handleRarity = event => {
        setFilterRarity(event.target.value);
    };
    function filterEmptyCard(e) {
        setIsFiltered(true)
        setStadeToFilter(e.target.value);
        setMyCardsId([]);
        items.sort((a, b) => a.localId - b.localId).map((val, key) => {
            if(!myCardWithStade.find((uc) => uc.card == val.id && uc.stade == e.target.value)){
                setMyCardsId(myCardsId => [...myCardsId,val.id]);
            }
        })
    }
    function closeModalBerry() {
        setIsOpenSkin(false);
    }
    return (
        <>
            <Modal overlayClassName={"overlayModalToken"} className={"modalTokenProfil"} isOpen={modalIsOpenSkin}
                   onRequestClose={closeModalBerry} contentLabel="Example Modal">
                <p style={{textAlign: "center", fontSize: "40px", marginTop: "-100px"}}>Félicitation tu as fini le set à
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
            {isLoaded === false ?
                <>
                    <Modal overlayClassName={"overlayModalToken"} className={"modalTokenProfil"} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                        <p style={{textAlign:"center", fontSize:"40px", marginTop:"-100px"}}>Félicitations !!! </p>
                        {pickStade == 4 ?
                            <div style={{ margin: "auto",marginBottom: "25px",width: "350px",position: "relative",animation: "glowGetRainbow 10s infinite alternate"}} id={"lastBangerContainer"} className={"lastBangerContainer"}>
                                <div stade={pickStade} className="cardBangerAlertSet">
                                    <img style={{
                                        zIndex: "1",
                                        left: "8px",
                                        bottom: "2px",
                                        display: "flex",
                                        flexFlow: "row",
                                        position: "absolute"
                                    }} src={"/images/stade_"+pickStade+".png"}/>
                                    <LazyLoadImage
                                        alt="Grapefruit slice atop a pile of other slices"
                                        placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                        width={"350"}
                                        style={{width: "350px", filter: "brightness(1)"}}
                                        wrapperClassName={"shadowBangerCard"}
                                        effect="blur"
                                        threshold={200}
                                        delayTime={5}
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: {transitionDelay: "0.1s"},
                                        }}
                                        src={"https://assets.tcgdex.net/" + lang + "/" + rarities[0].block + "/" + props.idBooster + "/" + pickCard + "/high.png"}/> {/*<img className={"shadowBangerCard"} style={{width:"250px",filter:"brightness(1)"}} src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"}/>*/}
                                </div>
                            </div>
                            : pickStade == 3 ?
                                                    <div stade={pickStade}
                                                                         style={{
                                                                             margin: "auto",marginBottom: "25px",
                                                    width: "350px",
                                                    position: "relative",
                                                    filter: "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"
                                                }}
                                                id={"lastBangerContainer"} className={"lastBangerContainer"}>
                                                    <div stade={pickStade}
                                                         className="cardBangerAlertSetThree">
                                                            <img style={{
                                                                zIndex: "1",
                                                                left: "8px",
                                                                bottom: "2px",
                                                                display: "flex",
                                                                flexFlow: "row",
                                                                position: "absolute"
                                                            }} src={"/images/stade_" + pickStade + ".png"}/>
                                                            <LazyLoadImage
                                                                alt="Grapefruit slice atop a pile of other slices"
                                                                delayTime={0}
                                                                threshold={200}
                                                                placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                                                width={"350"}
                                                                style={{width: "350px", filter: "brightness(1.2)"}}
                                                                wrapperClassName={"shadowBangerCard"}
                                                                effect="blur"
                                                                wrapperProps={{
                                                                    // If you need to, you can tweak the effect transition using the wrapper style.
                                                                    style: {transitionDelay: "0.1s"},
                                                                }}
                                                                src={"https://assets.tcgdex.net/" + lang + "/" + rarities[0].block + "/" + props.idBooster + "/" + pickCard + "/high.png"}/>
                                                        </div>
                                                    </div>
                                :

                                <button
                                    stade={pickStade} style={customStyles.buttonMyCardModal}
                                    className={"cardBox"}>
                                    <img style={{
                                        zIndex: "1",
                                        left: "8px",
                                        bottom: "2px",
                                        display: "flex",
                                        flexFlow: "row",
                                        position: "absolute"
                                    }} src={"/images/stade_" + pickStade + ".png"}/>
                                    <LazyLoadImage

                                        alt="Grapefruit slice atop a pile of other slices"
                                        delayTime={0}
                                        threshold={200}
                                        placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                        width={"350"}
                                        stade={pickStade}
                                        style={{
                                            width: "350px",
                                            filter: pickStade == 1 ? "drop-shadow(rgb(17, 208, 154) 0px 0px 5px) drop-shadow(rgb(17, 210, 154) 0px 0px 5px) drop-shadow(rgb(17, 208, 154) 0px 0px 5px)" : pickStade == 2 ? "drop-shadow(rgb(14, 208, 214) 0px 0px 3px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px)" : pickStade == 3 && "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"
                                        }}
                                        wrapperClassName={pickStade == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}
                                        effect="blur"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: {transitionDelay: "0.1s"},
                                        }}
                                        src={"https://assets.tcgdex.net/" + lang + "/" + rarities[0].block + "/" + props.idBooster + "/" + pickCard + "/high.png"}/> {/*     image={val.image} className={stadeC == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}*/}
                                    {/*     src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"}*/}
                                    {/*     onError={(e) => errorImages(e, props.idBooster, val.localId )}/>*/}
                                </button>
                        }
                        <button style={{display: "block", margin: "auto"}} className={"filterButton"}
                                onClick={() => closeModal(props.idBooster)}>Cool !
                        </button>
                    </Modal>
                    <ProgressBarCard idUser={props.idUser} badges={props.badges} refresh={refresh} global={false} user={props.user} booster={props.idBooster} getNb={myCards.length}
                                     item={items.length} myCards={myCards} myCardWithStade={myCardWithStade}/>
                    {myCards.length == items.length &&
                        <div style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                            marginTop: "-50px"
                        }}>
                            <button style={{
                                width: "70px",
                                height: "70px",
                                backgroundColor: "transparent",
                                border: "none",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundImage: 'url("/images/stade_1.png")'
                            }} value={1} onClick={filterEmptyCard}></button>
                            <button style={{
                                width: "70px",
                                height: "70px",
                                backgroundColor: "transparent",
                                border: "none",
                                backgroundSize: "contain",
                                backgroundPosition: "center", backgroundImage: 'url("/images/stade_2.png")'
                            }} value={2} onClick={filterEmptyCard}></button>
                            <button style={{
                                width: "70px",
                                height: "70px",
                                backgroundColor: "transparent",
                                border: "none",
                                backgroundSize: "contain",
                                backgroundPosition: "center", backgroundImage: 'url("/images/stade_3.png")'
                            }} value={3} onClick={filterEmptyCard}></button>
                            <button style={{
                                width: "70px",
                                height: "70px",
                                backgroundColor: "transparent",
                                border: "none",
                                backgroundSize: "contain",
                                backgroundPosition: "center", backgroundImage: 'url("/images/stade_4.png")'
                            }} value={4} onClick={filterEmptyCard}></button>
                        </div>
                    }
                    <div style={{
                        color: "white",
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>
                        {myCards.length != items.length &&
                            <label htmlFor="subscribe">
                                <input
                                    style={{marginRight: "10px"}}
                                    type="checkbox"
                                    onChange={handleChangeOnlyMine}
                                    id="subscribe"
                                    name="subscribe"
                                />
                                Voir les cartes manquantes
                            </label>
                        }
                    </div>
                    <div style={{display: "block", margin: "auto", color: "white"}}>
                        <img style={{width: "45px", marginBottom: "10px"}} src={"/images/powder.png"}/>
                        <p>Poussières TCG : {powder}</p>
                    </div>
                    <div id={"cardsContainer"}>
                        {items.sort((a, b) => a.localId - b.localId).map((val, key) => {
                            if (myCardsId.includes(val.id) && onlyMine == true) {
                                var stadeC = myCards.find((uc) => uc.card == val.id).stade;
                                let cardNb = myCards.find((myCard) => myCard.card === val.id);
                                return (
                                    <button
                                        stade={stadeC} style={customStyles.buttonMyCard}
                                        className={"cardBox"}>
                                        {powder >= 300 &&
                                            myCardWithStade.filter((uc) => uc.card == val.id).length < 4 &&
                                            <button booster={props.idBooster} block={rarities[0].block}
                                                    number={val.localId} card={val.id} className={"buttonToTrade"}
                                                    onClick={tradePowder}
                                                    style={{position: "absolute", zIndex: 1}}>Utiliser</button>
                                        }
                                        {myCardWithStade &&
                                            <div className={"starGradeContainer"}>

                                                {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 1) &&
                                                    <img style={{width: "50px"}} src={"/images/stade_1.png"}/>
                                                }
                                                {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 2) &&
                                                    <img style={{width: "50px"}} src={"/images/stade_2.png"}/>
                                                }
                                                {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 3) &&
                                                    <img style={{width: "50px"}} src={"/images/stade_3.png"}/>
                                                }
                                                {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 4) &&
                                                    <img style={{width: "50px"}} src={"/images/stade_4.png"}/>
                                                }
                                            </div>
                                        }
                                        <LazyLoadImage
                                            number={val.number}
                                            booster={val.booster}
                                            block={val.block}
                                            onError={(e) => errorImages(e, val.localId.startsWith("SV") ? "sma" : props.idBooster, val.localId)}
                                            alt="Grapefruit slice atop a pile of other slices"
                                            delayTime={0}
                                            threshold={200}
                                            placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                            width={"350"}
                                            stade={stadeC}
                                            style={{
                                                width: "350px"
                                            }}
                                            cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                            image={val.image}
                                            wrapperClassName={stadeC == 4 ? "fit-picture-card" : "fit-picture-card"}
                                            effect="blur"
                                            wrapperProps={{
                                                // If you need to, you can tweak the effect transition using the wrapper style.
                                                style: {transitionDelay: "0.1s"},
                                            }}
                                            src={"https://assets.tcgdex.net/" + lang + "/" + rarities[0].block + "/" + props.idBooster + "/" + val.localId + "/high.png"}/> {/*     image={val.image} className={stadeC == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}*/}
                                        {/*     src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"}*/}
                                        {/*     onError={(e) => errorImages(e, props.idBooster, val.localId )}/>*/}
                                    </button>
                                )
                            } else if (!myCardsId.includes(val.id) && !onlyMine) {
                                return (<div style={{position: "relative"}}>
                                    {powder >= 300 &&
                                        myCardWithStade.filter((uc) => uc.card == val.id).length < 4 &&
                                        <button booster={props.idBooster} block={rarities[0].block} number={val.localId}
                                                card={val.id} className={"buttonToTrade"}
                                                onClick={tradePowder}>Utiliser </button>
                                    }
                                    <LazyLoadImage
                                        number={val.number}
                                        booster={val.booster}
                                        block={val.block}
                                        onError={(e) => errorImages(e, val.localId.startsWith("SV") ? "sma" : props.idBooster, val.localId)}
                                        alt="Grapefruit slice atop a pile of other slices"
                                        placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                        delayTime={0}
                                        threshold={200}
                                        width={"350"}
                                        style={{width: "350px", filter: "grayscale(1)"}}
                                        stade={stadeC}
                                        image={val.image}
                                        wrapperClassName={"fit-picture-card"}
                                        effect="blur"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: {width: "350px", transitionDelay: "0.1s"},
                                        }}
                                        src={"https://assets.tcgdex.net/" + lang + "/" + rarities[0].block + "/" + props.idBooster + "/" + val.localId + "/high.png"}/>
                                </div>)
                            }
                        })
                        }
                    </div>
                </>
                :
                <>
                    <div className={"loaderPokemon"}>
                        <h2 className="u-text-center">Chargement ...</h2>
                        <div className="pokemon"></div>
                    </div>
                </>
            }
        </>
    )
}

export default MyCardsSet
