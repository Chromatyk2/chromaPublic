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
import OtherProgressBarCard from "./progressBarCardOther";

function OtherMyCardsSet(props) {
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
    const [lang, setLang] = React.useState(null);
    const [pickStade, setPickStade] = React.useState(null);
    const [pickCard, setPickCard] = React.useState(null);
    const [pickCardId, setPickCardId] = React.useState(null);
    const [myCardWithStade, setMyCardWithStade] = React.useState(null);
    const [refresh, setRefresh] = React.useState(0);

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
        Axios
            .get("/api/getRaritiesByBooster/"+props.idBooster)
            .then(function(response){
                setRarities(response.data);
                if(response.data[0].block == "gym" ||response.data[0].block == "col"){
                    setLang("en")
                }else{
                    setLang("fr")
                }
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
                                                if(props.idBooster === "sm11.5"){
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
                                                }
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
        setIsOpen(false);
        setRefresh(refresh+1)
    }
    function handleState() {
        setIsOpen(false);
    }
    function errorImages(e, booster, number){
        e.target.onerror = null;
        if(booster == "sm3.5"){
            e.target.src = "https://images.pokemontcg.io/sm35/"+number+"_hires.png";
        }else if(booster == "sm7.5"){
            e.target.src = "https://images.pokemontcg.io/sm75/"+number+"_hires.png";
        }else if(booster == "sm11.5"){
            e.target.src = "https://images.pokemontcg.io/sm115/"+number+"_hires.png";
        }else if(booster == "swsh3.5"){
            e.target.src = "https://images.pokemontcg.io/swsh35/"+number+"_hires.png";
        }else if(booster == "swsh4.5"){
            e.target.src = "https://images.pokemontcg.io/swsh4.5/"+number+"_hires.png";
        }else if(booster == "swsh12.5"){
            e.target.src = "https://images.pokemontcg.io/swsh12pt5/"+number+"_hires.png";
        }else if(booster == "sv03.5"){
            e.target.src = "https://images.pokemontcg.io/sv3pt5/"+number+"_hires.png";
        }else if(booster == "sv04.5"){
            e.target.src = "https://images.pokemontcg.io/sv4pt5/"+number+"_hires.png";
        }else if(booster == "sv06.5"){
            e.target.src = "https://images.pokemontcg.io/sv6pt5/"+number+"_hires.png";
        }else if(booster == "sma"){
            e.target.src = "https://images.pokemontcg.io/sma/"+number+"_hires.png";
        }else{
            e.target.src = "https://images.pokemontcg.io/"+booster+"/"+number+"_hires.png";
        }
    }
    function handleState() {
        setIsOpen(false);
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
    return (
        <>
            {isLoaded === false ?
                <>
                    <OtherProgressBarCard refresh={refresh} global={false} user={props.user} booster={props.idBooster} getNb={myCards.length}
                                     item={items.length}/>
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
                    <div id={"cardsContainer"}>
                        {items.sort((a, b) => a.localId - b.localId).map((val, key) => {
                            if (myCardsId.includes(val.id)) {
                                var stadeC = myCards.find((uc) => uc.card == val.id).stade;
                                let cardNb = myCards.find((myCard) => myCard.card === val.id);
                                if (stadeC == 4) {
                                    return (
                                        <div
                                            style={{
                                                width: "350px",
                                                position: "relative"
                                            }}
                                            {myCards.find((uc) => uc.card == val.id).nbCard > 1 &&
                                                <div className="infoNbCard" style={{
                                                    zIndex: "1",
                                                    width: "30px",
                                                    height: "30px",
                                                    lineHeight: "30px",
                                                    left: "8px",
                                                    top: "2px"
                                                }}>X{myCards.find((uc) => uc.card == val.id).nbCard}</div>}
                                            {myCardWithStade &&
                                                <div style={{
                                                    zIndex: "1",
                                                    left: "8px",
                                                    bottom: "2px",
                                                    display:"flex",
                                                    flexFlow:"row",
                                                    position:"absolute"
                                                }}>

                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 1) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_1.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 2) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_2.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 3) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_3.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 4) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_4.png"}/>
                                                    }
                                                </div>
                                            }
                                            <div cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                                 image={val.image} stade={stadeC}>
                                                <LazyLoadImage
                                                    number={val.number}
                                                    booster={val.booster}
                                                    block={val.block}
                                                    onError={(e) => errorImages(e, val.localId.startsWith("SV") ? "sma" : props.idBooster, val.localId)}
                                                    alt="Grapefruit slice atop a pile of other slices"
                                                    placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                                    width={"350"}
                                                    style={{width: "350px", filter: "brightness(1)"}}
                                                    effect="blur"
                                                    threshold={200}
                                                    delayTime={5}
                                                    wrapperProps={{
                                                        // If you need to, you can tweak the effect transition using the wrapper style.
                                                        style: {transitionDelay: "0.1s"},
                                                    }}
                                                    src={"https://assets.tcgdex.net/" + lang + "/" + rarities[0].block + "/" + props.idBooster + "/" + val.localId + "/high.png"}/> {/*<img className={"shadowBangerCard"} style={{width:"250px",filter:"brightness(1)"}} src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"}/>*/}
                                            </div>
                                        </div>
                                    )
                                } else if (stadeC == 3) {
                                    return (
                                        <div
                                            cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                             image={val.image} stade={stadeC}
                                             style={{
                                                 width: "350px",
                                                 position: "relative",
                                                 filter: "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"
                                             }}>
                                            {myCards.find((uc) => uc.card == val.id).nbCard > 1 && <div
                                                className="infoNbCard" style={{
                                                zIndex: "1",
                                                width: "30px",
                                                height: "30px",
                                                lineHeight: "30px",
                                                left: "8px",
                                                top: "2px"
                                            }}>X{myCards.find((uc) => uc.card == val.id).nbCard}</div>}

                                            {myCardWithStade &&
                                                <div style={{
                                                    zIndex: "1",
                                                    left: "8px",
                                                    bottom: "2px",
                                                    display:"flex",
                                                    flexFlow:"row",
                                                    position:"absolute"
                                                }}>

                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 1) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_1.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 2) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_2.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 3) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_3.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 4) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_4.png"}/>
                                                    }
                                                </div>
                                            }
                                            <div cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                                 image={val.image} stade={stadeC}>
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
                                                    style={{width: "350px", filter: "brightness(1.2)"}}
                                                    effect="blur"
                                                    wrapperProps={{
                                                        // If you need to, you can tweak the effect transition using the wrapper style.
                                                        style: {transitionDelay: "0.1s"},
                                                    }}
                                                    src={"https://assets.tcgdex.net/" + lang + "/" + rarities[0].block + "/" + props.idBooster + "/" + val.localId + "/high.png"}/>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <button
                                            stade={stadeC} style={customStyles.buttonMyCard}
                                                className={"cardBox"}>
                                            {myCards.find((uc) => uc.card == val.id).nbCard > 1 &&
                                                <div className="infoNbCard" style={{
                                                    zIndex: "1",
                                                    width: "30px",
                                                    height: "30px",
                                                    lineHeight: "30px",
                                                    left: "8px",
                                                    top: "2px"
                                                }}>X{myCards.find((uc) => uc.card == val.id).nbCard}</div>}

                                            {myCardWithStade &&
                                                <div style={{
                                                    zIndex: "1",
                                                    left: "8px",
                                                    bottom: "2px",
                                                    display:"flex",
                                                    flexFlow:"row",
                                                    position:"absolute"
                                                }}>

                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 1) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_1.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 2) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_2.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 3) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_3.png"}/>
                                                    }
                                                    {myCardWithStade.find((uc) => uc.card == val.id && uc.stade == 4) &&
                                                        <img style={{width:"50px"}} src={"/images/stade_4.png"}/>
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
                                                    width: "350px",
                                                    filter: stadeC == 1 ? "drop-shadow(rgb(17, 208, 154) 0px 0px 5px) drop-shadow(rgb(17, 210, 154) 0px 0px 5px) drop-shadow(rgb(17, 208, 154) 0px 0px 5px)" : stadeC == 2 ? "drop-shadow(rgb(14, 208, 214) 0px 0px 3px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px)" : stadeC == 3 && "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"
                                                }}
                                                cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                                image={val.image}
                                                wrapperClassName={stadeC == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}
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
                                }
                            } else if (!onlyMine) {
                                return (<div style={{position:"relative"}}>
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
export default OtherMyCardsSet
