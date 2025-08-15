import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import MyCaptures from './myCaptures.js';
import OtherCaptures from './otherCaptures.js';
import '../App.css'
import moment from "moment";
import Modal from "react-modal";
import SpawnPokemonToken from "./spawnPokemonToken";

function PokemonPage(props) {
const pseudo = props.cookies.user.data[0].login;
const [pokemon, setPokemon] = useState([]);
const [name, setName] = useState([]);
const [captures, setCaptures] = useState([]);
const [idPkm, setIdPkm] = useState(null);
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [isShiny, setIsShiny] = useState(false);
const [isLoadConvert, setIsLoadedConvert] = useState(false);
const [modalIsOpenBadge, setOpenBadgeHandle] = React.useState(false);
    const [badgeToWinStade, setBadgeToWinStade] = React.useState(null);
    const [messageToBadge, setMessageToBadge] = React.useState(null);
const { id } = useParams()
    const [badgesList, setBadgesList] = useState(null);
useEffect(() => {
    Axios
        .get("/api/getBadgesByUser/" + pseudo)
        .then(function (response) {
            setBadgesList(response.data)

            fetch("https://pokeapi.co/api/v2/pokemon-form/"+id)
                .then(res => res.json())
                .then(
                    (result) => {
                        fetch(result.pokemon.url)
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    setIsLoaded(true);
                                    setPokemon(result);
                                    fetch(result.species.url)
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                setIsLoaded(true);
                                                setName(result.names);
                                                setIdPkm(result.id)
                                                Axios
                                                    .get("/api/getByUserAndPokemon/"+pseudo+"/"+id)
                                                    .then(function(response){
                                                        setCaptures(response.data);
                                                    })
                                            },
                                            (error) => {
                                                setIsLoaded(true);
                                                setError(error);
                                            }
                                        )
                                },
                                (error) => {
                                    setIsLoaded(true);
                                    setError(error);
                                }
                            )
                    })
        })
}, [])
function changeSprite() {
    if(isShiny === true){
        setIsShiny(false)
    }else{
        setIsShiny(true)
    }
}
    function convertShiny() {
        Axios
            .get("/api/getByUserAndPokemon/"+pseudo+"/"+id)
            .then(function(response){
                if(response.data.filter(item => item.shiny == 0).length - 5 > -1){
                    setIsLoadedConvert(true);
                    Axios.delete('/api/deleteShiny/'+id+"/"+pseudo)
                        .then(
                            (result) => {
                                Axios.post('/api/capture', {pseudo: pseudo, pkmName: captures[0].pkmName, pkmImage:pokemon.sprites.front_shiny,pkmId:id, shiny:1, dateCapture:moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')})
                                    .then(
                                        (result) => {
                                            Axios
                                                .get("/api/getByUserAndPokemon/"+pseudo+"/"+id)
                                                .then(function(response){
                                                    setCaptures(response.data);
                                                    setIsLoadedConvert(false);
                                                })
                                        })
                            })
                }
            })
    }
    function convertBadge() {
        Axios
            .get("/api/getBadgesByUser/" + pseudo)
            .then(function (response) {
                if(!response.data.find((item) => item.image == 'pokemon'+idPkm)){
                    openModalZero("pokemon"+idPkm, "Badge obtenu en capturant " + captures[0].pkmName + " !");
                    setIsLoadedConvert(true);
                    Axios.delete('/api/deleteShiny/'+id+"/"+pseudo)
                        .then((result) => {
                            Axios.post('/api/addBadge',
                                {
                                    pseudo: pseudo,
                                    image: "pokemon"+idPkm,
                                    stade: 0,
                                    description: "Badge obtenu en capturant "+captures[0].pkmName+" !"
                                })
                                .then(
                                    (result) => {
                                        Axios
                                            .get("/api/getByUserAndPokemon/"+pseudo+"/"+id)
                                            .then(function(response){
                                                setCaptures(response.data);
                                                Axios
                                                    .get("/api/getBadgesByUser/" + pseudo)
                                                    .then(function (response) {
                                                        setBadgesList(response.data)
                                                        setIsLoadedConvert(false);
                                                    })
                                            })
                                    })
                        })
                }
            })
    }
    function convertBadgeShiny() {
        Axios
            .get("/api/getBadgesByUser/" + pseudo)
            .then(function (response) {
                if(!response.data.find((item) => item.image == 'pokemonshiny'+idPkm)){
                    openModalZero("pokemonshiny"+idPkm, "Badge obtenu en obtenant 3 " + captures[0].pkmName + " shiny !");
                    Axios.post('/api/addBadge',
                        {
                            pseudo: pseudo,
                            image: "pokemonshiny"+idPkm,
                            stade: 0,
                            description: "Badge obtenu en obtenant 3 " + captures[0].pkmName + " shiny !"
                        })
                        .then((result) => {
                            Axios
                                .get("/api/getBadgesByUser/" + pseudo)
                                .then(function (response) {
                                    setBadgesList(response.data)
                                })
                        })
                }
            })
    }
    function openModalZero(e, f) {
        setBadgeToWinStade(e)
        setMessageToBadge(f)
        setOpenBadgeHandle(true);
    }
    function closeModalBadge() {
        setOpenBadgeHandle(false);
    }
 if (error) {
   return <div>Error: {error.message}</div>;
 } else if (!isLoaded) {
   return <div></div>;
 } else {
     if(name[4] !== undefined && pokemon.sprites !== undefined){
   return (
     <>
         {captures.length > 0 &&
             <div className={"pagePokemonContainer"}>
                 <div className="pokemonPageContainer">
                     <div>
                         <img onClick={changeSprite} className="imgPokemonPage"
                              src={isShiny === false ? pokemon.sprites.other.home.front_default :pokemon.sprites.other.home.front_shiny }></img>
                         <p className="numberPokemonPage"># {idPkm}</p>
                         <p className="namePokemonPage">{captures[0].pkmName}</p>
                     </div>
                     <div>
                         <MyCaptures captures={captures}/>
                         {captures.filter(item => item.shiny == 0).length > 4 &&
                             isLoadConvert === false &&
                                 <button style={{width: "fit-content"}} className={"filterButton"}
                                         onClick={convertShiny}> Sacrifier 5 pour avoir ce pokemon en shiny
                                 </button>
                         }
                         {captures.filter(item => item.shiny == 0).length > 5 &&
                             isLoadConvert === false &&
                              !badgesList.find((item) => item.image == 'pokemon'+idPkm) &&
                             <button style={{width: "fit-content"}} className={"filterButton"}
                                     onClick={convertBadge}> Sacrifier 5 pour obtenir le badge
                             </button>
                         }
                         {captures.filter(item => item.shiny == 1).length > 2 &&
                             isLoadConvert === false &&
                                !badgesList.find((item) => item.image == 'pokemonshiny'+idPkm) &&
                             <button style={{width: "fit-content"}} className={"filterButton"}
                                     onClick={convertBadgeShiny}> Sacrifier 3 pour obtenir le badge shiny
                             </button>
                         }
                     </div>
                 </div>
             </div>
         }
         <Modal overlayClassName={"overlayModalToken"} className={"modalTokenProfil"} isOpen={modalIsOpenBadge}
                onRequestClose={closeModalBadge} contentLabel="Example Modal">

             <div style={{flexFlow:"column"}} className="pokemonContentToken">
                 <p style={{textAlign: "center", fontSize: "40px", marginTop: "-100px"}}>Félicitations !!! </p>
                 <img style={{marginBottom: "30px"}} className={"badgeToWin"}
                      src={"/Ribbon/" + badgeToWinStade + ".png"}/>
                 <p style={{textAlign: "center", fontStyle: "20px"}}>{messageToBadge}</p>
                 <button style={{display: "block", margin: "auto"}} className={"filterButton filterButtonDelayed"}
                         onClick={closeModalBadge}>Cool !
                 </button>
             </div>
         </Modal>
     </>
   );
     }
 }
}

export default PokemonPage
